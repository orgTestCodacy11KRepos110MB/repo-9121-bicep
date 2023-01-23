// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkspaceConfiguration } from "vscode";
import { SurveyManager } from "../../feedback/SurveyManager";
import { GlobalState, GlobalStateKeys } from "../../globalState";

describe("surveyManager", () => {
  //asdfg
  function createGlobalStateMock(): GlobalState {
    return {
      get: jest.fn(),
      update: jest.fn(),
      keys: jest.fn(),
      setKeysForSync: jest.fn(),
    };
  }

  function createWorkspaceConfigurationMock(
    map: Map<string, unknown>
  ): WorkspaceConfiguration {
    return {
      get: jest.fn().mockImplementation((key: string) => map.get(key)),
      has: jest.fn().mockImplementation((key: string) => map.has(key)),
      inspect: jest.fn(),
      update: jest.fn().mockImplementation((key: string, value: unknown) => {
        map.set(key, value);
      }),
    };
  }

  it("asdfg", async () => {
    const gs = createGlobalStateMock();
    const sm = new SurveyManager(gs, {
      provideBicepConfiguration: () =>
        createWorkspaceConfigurationMock(
          new Map<string, unknown>([["debugSurvey", true]])
        ),
    });

    sm.registerActiveUsageNoThrow();
    expect(gs.update).toHaveBeenCalledWith(
      GlobalStateKeys.surveyPostponedUntilTimeMs,
      expect.any(Number)
    );
  });
});
