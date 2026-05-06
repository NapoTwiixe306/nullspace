"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const THEME_NAME = "Nullspace";
const ICON_THEME_VIVID = "nullspace-icons";
const VARIANT_SETTING_KEY = "nullspace.iconVariant";
async function updateSetting(section, value, target = vscode.ConfigurationTarget.Global) {
    await vscode.workspace.getConfiguration().update(section, value, target);
}
async function applyRecommendedSettings() {
    await updateSetting(VARIANT_SETTING_KEY, "material");
    await updateSetting("workbench.colorTheme", THEME_NAME);
    await updateSetting("workbench.iconTheme", ICON_THEME_VIVID);
    // Keep defaults lightweight and purely visual for a theme extension.
    await updateSetting("editor.guides.indentation", true);
    await updateSetting("editor.minimap.enabled", false);
    await updateSetting("workbench.tree.renderIndentGuides", "always");
    await updateSetting("workbench.editor.highlightModifiedTabs", true);
}
async function toggleIconSaturation() {
    const currentTheme = vscode.workspace.getConfiguration().get("workbench.iconTheme");
    const nextTheme = currentTheme === ICON_THEME_VIVID ? "vs-seti" : ICON_THEME_VIVID;
    const nextVariant = nextTheme === ICON_THEME_VIVID ? "material" : "seti";
    await updateSetting(VARIANT_SETTING_KEY, nextVariant);
    await updateSetting("workbench.iconTheme", nextTheme);
}
function activate(context) {
    const applyRecommendedSettingsCommand = vscode.commands.registerCommand("nullspace.applyRecommendedSettings", async () => {
        await applyRecommendedSettings();
        void vscode.window.showInformationMessage("Nullspace recommended settings applied (theme + icons + UI defaults).");
    });
    const toggleIconSaturationCommand = vscode.commands.registerCommand("nullspace.toggleIconSaturation", async () => {
        await toggleIconSaturation();
        void vscode.window.showInformationMessage("Nullspace icon theme toggled between Material and Seti.");
    });
    context.subscriptions.push(applyRecommendedSettingsCommand, toggleIconSaturationCommand);
}
function deactivate() { }
