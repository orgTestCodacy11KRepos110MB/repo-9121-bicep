// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Memento } from "vscode";

export enum GlobalStateKeys { //asdfg
  neverShowSurveys = "neverShowSurveys",
  surveyPostponedUntilTimeMs = "surveyPostponedUntilTimeMs", // asdfg change to lastChecked or something?
}

export const globalStateKeys = {};

export type GlobalState = Memento & {
  setKeysForSync(keys: readonly string[]): void;
};

export function setGlobalStateKeysToSyncBetweenMachines(
  globalState: GlobalState
) {
  globalState.setKeysForSync([
    GlobalStateKeys.neverShowSurveys,
    GlobalStateKeys.surveyPostponedUntilTimeMs,
  ]);
}
