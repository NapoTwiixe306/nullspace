import * as vscode from "vscode";

const THEME_NAME = "Nullspace";
const ICON_THEME_VIVID = "nullspace-icons";
const VARIANT_SETTING_KEY = "nullspace.iconVariant";

async function updateSetting<T>(
  section: string,
  value: T,
  target: vscode.ConfigurationTarget = vscode.ConfigurationTarget.Global,
): Promise<void> {
  await vscode.workspace.getConfiguration().update(section, value, target);
}

async function applyRecommendedSettings(): Promise<void> {
  await updateSetting(VARIANT_SETTING_KEY, "material");
  await updateSetting("workbench.colorTheme", THEME_NAME);
  await updateSetting("workbench.iconTheme", ICON_THEME_VIVID);

  // Keep defaults lightweight and purely visual for a theme extension.
  await updateSetting("editor.guides.indentation", true);
  await updateSetting("editor.minimap.enabled", false);
  await updateSetting("workbench.tree.renderIndentGuides", "always");
  await updateSetting("workbench.editor.highlightModifiedTabs", true);
}

async function toggleIconSaturation(): Promise<void> {
  const currentTheme = vscode.workspace.getConfiguration().get<string>("workbench.iconTheme");
  const nextTheme = currentTheme === ICON_THEME_VIVID ? "vs-seti" : ICON_THEME_VIVID;
  const nextVariant = nextTheme === ICON_THEME_VIVID ? "material" : "seti";

  await updateSetting(VARIANT_SETTING_KEY, nextVariant);
  await updateSetting("workbench.iconTheme", nextTheme);
}

export function activate(context: vscode.ExtensionContext): void {
  const applyRecommendedSettingsCommand = vscode.commands.registerCommand(
    "nullspace.applyRecommendedSettings",
    async () => {
      await applyRecommendedSettings();
      void vscode.window.showInformationMessage(
        "Nullspace recommended settings applied (theme + icons + UI defaults).",
      );
    },
  );

  const toggleIconSaturationCommand = vscode.commands.registerCommand(
    "nullspace.toggleIconSaturation",
    async () => {
      await toggleIconSaturation();
      void vscode.window.showInformationMessage(
        "Nullspace icon theme toggled between Material and Seti.",
      );
    },
  );

  context.subscriptions.push(applyRecommendedSettingsCommand, toggleIconSaturationCommand);
}

export function deactivate(): void {}
