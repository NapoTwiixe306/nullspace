import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { tokenColors } from "./tokens";
import { themeColors } from "./theme";

type ThemeDocument = {
  name: string;
  type: "dark";
  semanticHighlighting: true;
  colors: typeof themeColors;
  tokenColors: typeof tokenColors;
};

const outputPath = resolve(__dirname, "../themes/Nullspace-color-theme.json");

const themeDocument: ThemeDocument = {
  name: "Nullspace",
  type: "dark",
  semanticHighlighting: true,
  colors: themeColors,
  tokenColors,
};

async function buildTheme(): Promise<void> {
  await mkdir(resolve(__dirname, "../themes"), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(themeDocument, null, 2)}\n`, "utf8");
}

async function buildAll(): Promise<void> {
  await buildTheme();
  console.log("Nullspace theme built successfully.");
}

void buildAll();
