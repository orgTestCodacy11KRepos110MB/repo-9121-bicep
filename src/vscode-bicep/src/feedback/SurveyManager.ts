// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

//asdfg if survey not available for a year, then because available again, don't make everybody do the survey at the same time
// asdfg if survey frequency changed, then don't make everybody do the survey at the same time, but don't make it wait for the previous frequency to expire
// asdfg don't ask too often even due to chance
// asdfg first survey should be staggered through the frequency range, so that it's not all at once

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
import { GlobalState, GlobalStateKeys } from "../globalState";
//import { got } from "got"; asdfg
import * as moment from "moment";

//asdfg too much telemetry?

// Add the following to your settings file to put the survey into debug mode (intentionally not exposed in package.json):   asdfg
//
//    "bicep.debugSurvey": true
//

const linkToSurvey = "https://aka.ms/bicepAnnualSurvey"; //asdfg ensure https
const surveyPrompt =
  "Could you please take 2 minutes to tell us how well Bicep is working for you?";

interface ISurveyConstants {
  // Each user should be requested to survey about once every this many days.
  surveyFrequencyDays: number;
}

const defaultSurveyConstants: ISurveyConstants = {
  surveyFrequencyDays: 365,
};

//asdfg
// const debugSurveyConstants: ISurveyConstants = {
//   //asdfg?
//   percentageOfUsersToSurvey: 0.5,
//   postponeAfterYesResponseMs: minutesToMs(2),
//   postponeAfterLaterResponseMs: minutesToMs(1),
//   postponeAfterNotAccessibleMs: minutesToMs(0.25),
// };

const postponeForLaterResponseInDays = 2 * 7;

export class SurveyManager {
  private surveyConstants: ISurveyConstants;

  //asdfg private isDebugMode: boolean | undefined = undefined;
  //private readonly provideBicepConfiguration: () => WorkspaceConfiguration;

  public constructor(
    private globalState: GlobalState,
    injectableContext?: {
      //asdfg provideBicepConfiguration: () => WorkspaceConfiguration;
      surveyConstants: ISurveyConstants; //asdfg?
    }
  ) {
    //asdfg
    // this.provideBicepConfiguration =
    //   injectableContext?.provideBicepConfiguration ?? getBicepConfiguration;
    this.surveyConstants =
      injectableContext?.surveyConstants ?? defaultSurveyConstants;
  }

  public considerShowingSurvey(): void {
    // Don't wait
    callWithTelemetryAndErrorHandling(
      "considerShowingSurvey",
      async (context: IActionContext) => {
        context.errorHandling.suppressDisplay = true;

        const shouldShowSurvey = await this.shouldRequestSurvey(context);
        context.telemetry.properties.shouldShowSurvey = String(shouldShowSurvey);

        if (shouldShowSurvey) {
          await this.requestTakeSurvey(context);
        }
      }
    );
  }

  private shouldRequestSurvey(context: IActionContext): boolean {
    {
      const neverShowSurveys = this.getShouldNeverShowSurvey();
      context.telemetry.properties.neverShowSurvey =
        String(neverShowSurveys);
      if (neverShowSurveys) {
        return false;
      }

      const lastSurveyDate = this.getLastSurveyDate(context);
      context.telemetry.properties.lastSurveyDate = lastSurveyDate?.toUTCString(); //asdfg?
      const effectiveLastSurveyDateMs: number = lastSurveyDate?.getTime() ?? Date.now(); //asdfg   // asdfg is getTime same as valueOf()?
      //asdfg? context.telemetry.properties.effectiveLastSurveyDate = moment.

      const msSinceLastSurvey = Date.now() - effectiveLastSurveyDateMs;
      //asdfg return Math.random() < this.surveyConstants.percentageOfUsersToSurvey;
      return msSinceLastSurvey > this.surveyConstants.surveyFrequencyDays * 24 * 60 * 60 * 1000;


      //asdfg?
      // if (this.getIsSurveyPostponed()) {
      //   return;
      // }

      //asdfg?
      // const isAccessible = await this.getIsSurveyAccessible();
      // context.telemetry.properties.canAccessSurvey = String(isAccessible);
      // if (!isAccessible) {
      //   // Try again next time   asdfg?
      //   return false;
      // }

      //asdfg
      // const isSelected = this.getIsUserSelectedForSurvey();
      // context.telemetry.properties.isSelected = String(isSelected);
      // if (isSelected) {
      //   await this.requestTakeSurvey(context);
      // } else {
      //   await this.postponeSurvey(
      //     context,
      //     this.surveyConstants.msToPostponeAfterNotSelectedForSurvey
      //   );
      // }
    }
  }

  private getLastSurveyDate(context: IActionContext): Date | undefined {
    try {
      const lastSurveyDate: string | undefined = this.globalState.get<string>(
        GlobalStateKeys.lastSurveyDate
      );

      if (lastSurveyDate) {
        return moment.utc(lastSurveyDate, true /*strict*/).toDate();
      }
    } catch (err) {
      context.telemetry.properties.lastSurveyDateError =
        parseError(err).message;
    }

    return undefined;
  }

  private async requestTakeSurvey(context: IActionContext): Promise<void> {
    const neverAskAgain: MessageItem = { title: "Never ask again" };
    const later: MessageItem = { title: "Later" };
    const yes: MessageItem = { title: "Yes" };
    const dismissed: MessageItem = { title: "(dismissed)" };

    const response =
      (await window.showInformationMessage( //asdfg?
        surveyPrompt,
        neverAskAgain,
        later,
        yes
      )) ?? dismissed;
    context.telemetry.properties.response = String(response.title);

    if (response === neverAskAgain) {
      await this.setShouldNeverShowSurvey(context, true); //asdfg how test?
    } else if (response === later) {
      await this.postponeSurvey(
        context,
        postponeForLaterResponseInDays //asdfg 
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

  private async postponeSurvey(
    context: IActionContext,
    milliseconds: number //asdfg days
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
      GlobalStateKeys.neverShowSurvey,
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
      GlobalStateKeys.neverShowSurvey,
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
}
