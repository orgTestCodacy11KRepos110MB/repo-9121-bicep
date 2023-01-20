// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfigurationTarget, WorkspaceConfiguration } from "vscode";
import { getBicepConfiguration } from "../vscodeIntegration/getBicepConfiguration";

// asdfg test these are all in package
export enum SuppressedWarningsKeys { //asdfg?
  decompileOnPasteWarning = "decompile on paste",
  survey = "survey",
}

export class SuppressedWarningsManager {
  public static readonly suppressedWarningsConfigurationKey = //asdfg make private
    "suppressedWarnings";

  public constructor(
    private readonly testProvideBicepConfiguration: () => WorkspaceConfiguration = getBicepConfiguration // override for unit testing
  ) {}

  public isWarningSuppressed(key: SuppressedWarningsKeys): boolean {
    const suppressedWarnings: SuppressedWarningsKeys[] =
      this.getSuppressedWarnings();
    return suppressedWarnings.includes(key);
  }

  public async suppressWarning(key: SuppressedWarningsKeys): Promise<void> {
    const suppressedWarnings: SuppressedWarningsKeys[] =
      this.getSuppressedWarnings();
    if (!suppressedWarnings.includes(key)) {
      suppressedWarnings.push(key);
    }

    await this.testProvideBicepConfiguration().update(
      SuppressedWarningsManager.suppressedWarningsConfigurationKey,
      suppressedWarnings,
      ConfigurationTarget.Global
    );
  }

  public async resetWarning(key: SuppressedWarningsKeys): Promise<void> {
    let suppressedWarnings: SuppressedWarningsKeys[] =
      this.getSuppressedWarnings();
    suppressedWarnings = suppressedWarnings.filter((k) => k !== key);

    await this.testProvideBicepConfiguration().update(
      SuppressedWarningsManager.suppressedWarningsConfigurationKey,
      suppressedWarnings,
      ConfigurationTarget.Global
    );
  }

  private getSuppressedWarnings(): SuppressedWarningsKeys[] {
    const currentSuppressedKeys = this.testProvideBicepConfiguration().get(
      SuppressedWarningsManager.suppressedWarningsConfigurationKey
    );

    return Array.isArray(currentSuppressedKeys) ? currentSuppressedKeys : [];
  }
}
