// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfigurationScope, workspace, WorkspaceConfiguration } from "vscode";
import { bicepConfigurationPrefix } from "../language/constants";

export const bicepConfigurationKeys = {
  decompileOnPaste: "decompileOnPaste",
};

// NOTE: This returns a current *snapshot* from vscode - you should always query it right before checking settings values,
//   don't cache it
export function getBicepConfiguration(
  scope?: ConfigurationScope
): WorkspaceConfiguration {
  return workspace.getConfiguration(bicepConfigurationPrefix, scope);
}
