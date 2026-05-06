"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const tokens_1 = require("./tokens");
const theme_1 = require("./theme");
const outputPath = (0, node_path_1.resolve)(__dirname, "../themes/Nullspace-color-theme.json");
const themeDocument = {
    name: "Nullspace",
    type: "dark",
    semanticHighlighting: true,
    colors: theme_1.themeColors,
    tokenColors: tokens_1.tokenColors,
};
async function buildTheme() {
    await (0, promises_1.mkdir)((0, node_path_1.resolve)(__dirname, "../themes"), { recursive: true });
    await (0, promises_1.writeFile)(outputPath, `${JSON.stringify(themeDocument, null, 2)}\n`, "utf8");
}
async function buildAll() {
    await buildTheme();
    console.log("Nullspace theme built successfully.");
}
void buildAll();
