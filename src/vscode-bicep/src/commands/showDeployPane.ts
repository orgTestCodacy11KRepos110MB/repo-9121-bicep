// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import vscode from "vscode";
import { IActionContext } from "@microsoft/vscode-azext-utils";

import { DeployPaneViewManager } from "../panes/deploy";
import { Command } from "./types";
import { findOrCreateActiveBicepFile } from "./findOrCreateActiveBicepFile";

export class ShowDeployPaneCommand implements Command {
  public readonly id = "bicep.showDeployPane";

  public constructor(
    private readonly viewManager: DeployPaneViewManager
  ) {}

  public async execute(
    context: IActionContext,
    documentUri?: vscode.Uri | undefined
  ): Promise<vscode.ViewColumn | undefined> {
    documentUri = await findOrCreateActiveBicepFile(
      context,
      documentUri,
      "Choose which Bicep file to deploy"
    );
  
    const viewColumn = vscode.window.activeTextEditor?.viewColumn ?? vscode.ViewColumn.One;
  
    await this.viewManager.openView(documentUri, viewColumn);
  
    return viewColumn;
  }
}