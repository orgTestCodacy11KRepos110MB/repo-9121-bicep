// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  commands,
  MessageItem,
  Uri,
  window,
  WorkspaceConfiguration,
} from "vscode";
import { parseError } from "@microsoft/vscode-azext-utils";
import { IActionContext } from "@microsoft/vscode-azext-utils";
import { callWithTelemetryAndErrorHandling } from "@microsoft/vscode-azext-utils";
import assert from "assert";
import {
  daysToMs,
  hoursToMs,
  minutesToMs,
  secondsToMs,
  weeksToMs,
} from "../utils";
import { GlobalState, GlobalStateKeys } from "../globalState";
//import { got } from "got";
import { getBicepConfiguration } from "../vscodeIntegration/getBicepConfiguration";

//asdfg too much telemetry?

// Add the following to your settings file to put the survey into debug mode (intentionally not exposed in package.json):   asdfg
//
//    "bicep.debugSurvey": true
//

const linkToSurvey = "https://aka.ms/bicepAnnualSurvey"; //asdfg ensure https
const surveyPrompt =
  "Could you please take 2 minutes to tell us how well Bicep is working for you?";

interface ISurveyConstants {
  // Wait for this amount of time since extension first used (this session) before
  // considering asking the survey (only if still interacting with extension)
  activeUsageBeforeFirstDrawing: number;
  // How often to consider showing the survey
  frequencyBetweenDrawings: number;
  percentageOfUsersToSurvey: number;
  postponeAfterYesResponseMs: number;
  postponeAfterLaterResponseMs: number;
  postponeAfterNotAccessibleMs: number;
}

const defaultSurveyConstants: ISurveyConstants = {
  activeUsageMsBeforeShowingSurvey: hoursToMs(1),
  percentageOfUsersToSurvey: 0.25,
  postponeAfterYesResponseMs: weeksToMs(12),
  postponeAfterLaterResponseMs: weeksToMs(1),
  msToPostponeAfterNotSelectedForSurvey: weeksToMs(12),
  postponeAfterNotAccessibleMs: daysToMs(1),
};
const debugSurveyConstants: ISurveyConstants = {
  //asdfg?
  activeUsageMsBeforeShowingSurvey: secondsToMs(30),
  percentageOfUsersToSurvey: 0.5,
  postponeAfterYesResponseMs: minutesToMs(2),
  postponeAfterLaterResponseMs: minutesToMs(1),
  msToPostponeAfterNotSelectedForSurvey: minutesToMs(0.5),
  postponeAfterNotAccessibleMs: minutesToMs(0.25),
};

export class SurveyManager {
  private surveyConstants: ISurveyConstants;

  // Time user started interacting with extension this session of VS Code
  private usageSessionStartMs: number | undefined;

  private isReentrant = false;
  private surveyDisabledThisSession = false;
  private isDebugMode: boolean | undefined = undefined;
  private readonly provideBicepConfiguration: () => WorkspaceConfiguration;

  public constructor(
    private globalState: GlobalState,
    injectableContext?: {
      provideBicepConfiguration: () => WorkspaceConfiguration;
      surveyConstants: ISurveyConstants;
    }
  ) {
    this.provideBicepConfiguration =
      injectableContext?.provideBicepConfiguration ?? getBicepConfiguration;
    this.surveyConstants =
      injectableContext?.surveyConstants ?? defaultSurveyConstants;
  }

  /**
   * Should be called whenever the user is interacting with the extension (thus gets called a lot)  asdfg
   */
  public registerActiveUsageNoThrow(): void {
    if (this.isReentrant) {
      return;
    }

    // Don't await
    callWithTelemetryAndErrorHandling(
      "considerShowingSurvey",
      async (context: IActionContext) => {
        context.errorHandling.suppressDisplay = true;
        // This gets called a lot, we don't want telemetry for most calls
        context.telemetry.suppressIfSuccessful = true;

        if (this.isReentrant) {
          return;
        }
        this.isReentrant = true;
        try {
          await this.checkForDebugMode(context);

          if (this.surveyDisabledThisSession) {
            return;
          }

          const neverShowSurveys = this.getShouldNeverShowSurvey();
          context.telemetry.properties.neverShowSurvey =
            String(neverShowSurveys);
          if (neverShowSurveys) {
            this.surveyDisabledThisSession = true;
            context.telemetry.suppressIfSuccessful = false; // Allow this single telemetry event through for this session, even though no failure
            return;
          }

          const sessionLengthMs = this.getSessionLengthMs();
          context.telemetry.properties.sessionLength = String(sessionLengthMs);
          if (
            sessionLengthMs <
            this.surveyConstants.activeUsageMsBeforeShowingSurvey
          ) {
            return;
          }

          if (this.getIsSurveyPostponed()) {
            return;
          }

          // Enable telemetry from this point on, even if no failure
          context.telemetry.suppressIfSuccessful = false;

          const isAccessible = await this.getIsSurveyAccessible();
          context.telemetry.properties.accessible = String(isAccessible);
          if (!isAccessible) {
            // Try again after a while
            await this.postponeSurvey(
              context,
              this.surveyConstants.postponeAfterNotAccessibleMs
            );
            return;
          }

          const isSelected = this.getIsUserSelectedForSurvey();
          context.telemetry.properties.isSelected = String(isSelected);
          if (isSelected) {
            await this.requestTakeSurvey(context);
          } else {
            await this.postponeSurvey(
              context,
              this.surveyConstants.msToPostponeAfterNotSelectedForSurvey
            );
          }
        } finally {
          this.isReentrant = false;
        }
      }
    ).catch((err: unknown) => {
      assert.fail(
        `callWithTelemetryAndErrorHandling in survey.registerActiveUseNoThrow shouldn't throw, but did: ${parseError(err).message
        }`
      );
    });
  }

  private async checkForDebugMode(context: IActionContext): Promise<void> {
    if (this.isDebugMode === undefined) {
      this.isDebugMode = false;

      if (this.provideBicepConfiguration().get<boolean>("debugSurvey")) {
        this.isDebugMode = true;
        this.surveyConstants = debugSurveyConstants;
        this.surveyDisabledThisSession = false;
        await this.setShouldNeverShowSurvey(context, false);
      }
    }

    if (this.isDebugMode) {
      context.telemetry.properties.debugMode = "true";
    }
  }

  private async requestTakeSurvey(context: IActionContext): Promise<void> {
    const neverAskAgain: MessageItem = { title: "Never ask again" };
    const later: MessageItem = { title: "Later" };
    const yes: MessageItem = { title: "Yes" };
    const dismissed: MessageItem = { title: "(dismissed)" };

    const response =
      (await window.showInformationMessage(
        surveyPrompt,
        neverAskAgain,
        later,
        yes
      )) ?? dismissed;
    context.telemetry.properties.response = String(response.title);

    if (response === neverAskAgain) {
      await this.setShouldNeverShowSurvey(context, true);
    } else if (response === later) {
      await this.postponeSurvey(
        context,
        this.surveyConstants.postponeAfterLaterResponseMs
      );
    } else if (response === yes) {
      await this.postponeSurvey(
        context,
        this.surveyConstants.postponeAfterYesResponseMs
      );
      await this.launchSurvey(context);
    } else {
      assert(response === dismissed, `Unexpected response: ${response.title}`);
      await this.postponeSurvey(
        context,
        this.surveyConstants.postponeAfterLaterResponseMs
      );
    }
  }

  private async launchSurvey(context: IActionContext): Promise<void> {
    context.telemetry.properties.launchSurvey = "true";

    await commands.executeCommand(
      "vscode.open",
      Uri.parse(linkToSurvey, true /*strict*/)
    );
  }

  private getIsUserSelectedForSurvey(): boolean {
    // tslint:disable-next-line:insecure-random
    return Math.random() < this.surveyConstants.percentageOfUsersToSurvey;
  }

  private async postponeSurvey(
    context: IActionContext,
    milliseconds: number
  ): Promise<void> {
    assert(milliseconds > 0);
    let untilTimeMs = Date.now() + milliseconds;

    const currentPostpone = this.globalState.get<number>(
      GlobalStateKeys.surveyPostponedUntilTimeMs,
      0
    );
    if (Number.isInteger(currentPostpone)) {
      untilTimeMs = Math.max(currentPostpone, untilTimeMs);
    }

    context.telemetry.properties.postponeForMs = String(
      untilTimeMs - Date.now()
    );

    await this.globalState.update(
      GlobalStateKeys.surveyPostponedUntilTimeMs,
      untilTimeMs
    );
  }

  private async getIsSurveyAccessible(): Promise<boolean> {
    try {
      return false; //asdfg
      // const asdfg = await got(linkToSurvey, {
      //   throwHttpErrors: false,
      //   maxRedirects: 0,
      // });
      // return !!asdfg;
    } catch (err) {
      return false;
    }
  }

  public getShouldNeverShowSurvey(): boolean {
    return this.globalState.get<boolean>(
      GlobalStateKeys.neverShowSurveys,
      false
    );
  }

  private async setShouldNeverShowSurvey(
    context: IActionContext,
    neverShowSurveys: boolean
  ): Promise<void> {
    context.telemetry.properties.neverShowSurvey = String(neverShowSurveys);
    context.telemetry.suppressIfSuccessful = false;

    await this.globalState.update(
      GlobalStateKeys.neverShowSurveys,
      neverShowSurveys
    );
  }

  private getIsSurveyPostponed(): boolean {
    const postponedUntilTime = this.globalState.get<number>(
      GlobalStateKeys.surveyPostponedUntilTimeMs,
      0
    );
    return postponedUntilTime > Date.now();
  }

  private getSessionLengthMs(): number {
    if (this.usageSessionStartMs === undefined) {
      // Session just started
      this.usageSessionStartMs = Date.now();
      return 0;
    } else {
      return Date.now() - this.usageSessionStartMs;
    }
  }
}
