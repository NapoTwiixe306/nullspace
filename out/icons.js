"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildIcons = buildIcons;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const palette_1 = require("./palette");
const SIZE = 16;
const STROKE_WIDTH = 1.25;
const STROKE_LINECAP = "round";
const STROKE_LINEJOIN = "round";
const GLYPH_COLOR = palette_1.palette.bg.app;
function withAlpha(hex, alpha) {
    if (hex.length === 7) {
        return `${hex}${alpha}`;
    }
    return hex;
}
function svgTemplate(body) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 16 16">${body}</svg>`;
}
function parseHex(hex) {
    const normalized = hex.replace("#", "");
    if (normalized.length === 6) {
        return {
            r: Number.parseInt(normalized.slice(0, 2), 16),
            g: Number.parseInt(normalized.slice(2, 4), 16),
            b: Number.parseInt(normalized.slice(4, 6), 16),
            a: 255,
        };
    }
    return {
        r: Number.parseInt(normalized.slice(0, 2), 16),
        g: Number.parseInt(normalized.slice(2, 4), 16),
        b: Number.parseInt(normalized.slice(4, 6), 16),
        a: Number.parseInt(normalized.slice(6, 8), 16),
    };
}
function channelToHex(value) {
    return Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, "0");
}
function blendHex(baseHex, mixHex, mixRatio) {
    const base = parseHex(baseHex);
    const mix = parseHex(mixHex);
    const ratio = Math.max(0, Math.min(1, mixRatio));
    const r = base.r * (1 - ratio) + mix.r * ratio;
    const g = base.g * (1 - ratio) + mix.g * ratio;
    const b = base.b * (1 - ratio) + mix.b * ratio;
    const alphaHex = base.a === 255 ? "" : channelToHex(base.a);
    return `#${channelToHex(r)}${channelToHex(g)}${channelToHex(b)}${alphaHex}`;
}
function toMutedSvg(svg) {
    return svg.replace(/#[0-9a-fA-F]{6}(?:[0-9a-fA-F]{2})?/g, (hex) => blendHex(hex, palette_1.palette.fg.subtle, 0.42));
}
function fileBase(mainColor, foldColor = palette_1.palette.bg.overlay) {
    const tint = withAlpha(mainColor, "26");
    const border = withAlpha(mainColor, "aa");
    const fold = withAlpha(mainColor, "58");
    return `<path d="M3.2 1.4h6.1l3.2 3.2v9.9a1.5 1.5 0 0 1-1.5 1.5H3.2a1.5 1.5 0 0 1-1.5-1.5V2.9a1.5 1.5 0 0 1 1.5-1.5z" fill="${tint}"/><path d="M9.3 1.4v3.2h3.2" fill="${foldColor}"/><path d="M3.2 1.4h6.1l3.2 3.2v9.9a1.5 1.5 0 0 1-1.5 1.5H3.2a1.5 1.5 0 0 1-1.5-1.5V2.9a1.5 1.5 0 0 1 1.5-1.5z" stroke="${border}" stroke-width="0.95" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}"/><path d="M3.9 3.15h4.6" stroke="${mainColor}" stroke-width="1.2" stroke-linecap="${STROKE_LINECAP}"/><path d="M9.3 1.4l3.2 3.2h-1.9a1.3 1.3 0 0 1-1.3-1.3z" fill="${fold}"/>`;
}
function folderBase(mainColor, open) {
    const tabColor = withAlpha(mainColor, "e0");
    const bodyColor = withAlpha(mainColor, "b8");
    const border = withAlpha(mainColor, "f0");
    if (open) {
        return `<path d="M1.4 5.8h4.9l1.2-1.3h7v2.2H7.4L6.2 8H1.4z" fill="${tabColor}"/><path d="M1.1 7.2h13.9l-1.1 6.1A1.7 1.7 0 0 1 12.23 15H2.8a1.7 1.7 0 0 1-1.67-1.36z" fill="${bodyColor}"/><path d="M1.4 5.8h4.9l1.2-1.3h7v2.2H7.4L6.2 8H1.4M1.1 7.2h13.9l-1.1 6.1A1.7 1.7 0 0 1 12.23 15H2.8a1.7 1.7 0 0 1-1.67-1.36z" stroke="${border}" stroke-width="0.88" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}"/>`;
    }
    return `<path d="M1.3 5.1a1.5 1.5 0 0 1 1.5-1.5h3.4l1.2 1.3h5.8a1.5 1.5 0 0 1 1.5 1.5v.9H1.3z" fill="${tabColor}"/><path d="M1.3 6.8h13.4v6.7a1.5 1.5 0 0 1-1.5 1.5H2.8a1.5 1.5 0 0 1-1.5-1.5z" fill="${bodyColor}"/><path d="M1.3 5.1a1.5 1.5 0 0 1 1.5-1.5h3.4l1.2 1.3h5.8a1.5 1.5 0 0 1 1.5 1.5v7.1a1.5 1.5 0 0 1-1.5 1.5H2.8a1.5 1.5 0 0 1-1.5-1.5z" stroke="${border}" stroke-width="0.88" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}"/>`;
}
function makeCodeFileIcon(color, glyph) {
    return svgTemplate(`${fileBase(color, withAlpha(color, "33"))}${glyph}`);
}
function makeFileIcon(color, glyph) {
    return svgTemplate(`${fileBase(color)}${glyph}`);
}
function makeFolderIcon(color, open, glyph = "") {
    return svgTemplate(`${folderBase(color, open)}${glyph}`);
}
const iconCatalog = {
    file: {
        svg: () => makeFileIcon(palette_1.palette.fg.muted, `<path d="M5 10h6M5 12.5h4" stroke="${palette_1.palette.fg.subtle}" stroke-width="${STROKE_WIDTH}" stroke-linecap="${STROKE_LINECAP}" />`),
    },
    code: {
        svg: () => makeCodeFileIcon(palette_1.palette.accent.blue, `<path d="M5 9.5l-1.5-1.5L5 6.5M11 9.5l1.5-1.5L11 6.5" stroke="${palette_1.palette.accent.blue}" stroke-width="${STROKE_WIDTH}" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}" />`),
    },
    typescript: {
        fileExtensions: ["ts", "tsx"],
        svg: () => makeCodeFileIcon(palette_1.palette.accent.blue, `<path d="M4.5 6.25h4M6.5 6.25v4.25M9.75 6.5h2.25a1 1 0 0 1 0 2H10.5a1 1 0 0 0 0 2h2.25" stroke="${palette_1.palette.accent.blue}" stroke-width="1.2" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}" />`),
    },
    javascript: {
        fileExtensions: ["js", "jsx"],
        svg: () => makeCodeFileIcon(palette_1.palette.accent.yellow, `<path d="M5 6.25v4a1.25 1.25 0 0 1-1.25 1.25M8.5 6.25h2.25a1 1 0 0 1 0 2H9.5a1 1 0 0 0 0 2h2.25" stroke="${palette_1.palette.accent.yellow}" stroke-width="1.2" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}" />`),
    },
    markdown: {
        fileExtensions: ["md"],
        fileNames: ["readme.md", "README.md"],
        svg: () => makeFileIcon(palette_1.palette.accent.green, `<path d="M4.5 10.5V6.5l1.5 2 1.5-2v4M9.5 10.5h2l-2-2h2" stroke="${palette_1.palette.accent.green}" stroke-width="1.2" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}" />`),
    },
    config: {
        fileExtensions: ["json", "yaml", "yml", "toml", "lock"],
        fileNames: ["package.json", "tsconfig.json"],
        svg: () => makeFileIcon(palette_1.palette.accent.yellow, `<path d="M8 6.25l.55.9 1.05.2-.7.75.1 1.05L8 8.7l-1 .5.1-1.05-.7-.75 1.05-.2.55-.9zM5 11.5h6" stroke="${palette_1.palette.accent.yellow}" stroke-width="1.2" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}" />`),
    },
    env: {
        fileExtensions: ["env"],
        fileNames: [".env"],
        svg: () => makeFileIcon(palette_1.palette.accent.orange, `<path d="M5 6.5h4M5 8h3M5 9.5h4M10.5 11.25l1.5-2.25M12 9v2.25h-2.25" stroke="${palette_1.palette.accent.orange}" stroke-width="1.2" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}" />`),
    },
    styles: {
        fileExtensions: ["css", "scss"],
        svg: () => makeFileIcon(palette_1.palette.accent.cyan, `<path d="M8 5.5l2.5 2.5L8 10.5 5.5 8 8 5.5zM10.5 10.5l1 1" stroke="${palette_1.palette.accent.cyan}" stroke-width="1.2" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}" />`),
    },
    markup: {
        fileExtensions: ["html", "svg", "astro", "vue"],
        svg: () => makeFileIcon(palette_1.palette.accent.red, `<path d="M6.25 6.25L4.5 8l1.75 1.75M9.75 6.25L11.5 8l-1.75 1.75" stroke="${palette_1.palette.accent.red}" stroke-width="${STROKE_WIDTH}" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}" />`),
    },
    image: {
        fileExtensions: ["png", "jpg", "jpeg"],
        svg: () => makeFileIcon(palette_1.palette.accent.purple, `<rect x="4.5" y="6.25" width="7" height="5" rx="1" stroke="${palette_1.palette.accent.purple}" stroke-width="1.2"/><circle cx="6.25" cy="7.75" r=".7" fill="${palette_1.palette.accent.purple}"/><path d="M5.25 10.5l1.75-1.75 1.2 1.2 1.3-1.3 1.25 1.85" stroke="${palette_1.palette.accent.purple}" stroke-width="1.1" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}" />`),
    },
    shell: {
        fileExtensions: ["sh"],
        svg: () => makeCodeFileIcon(palette_1.palette.accent.green, `<path d="M4.75 6.5L6.5 8 4.75 9.5M7.75 10h3.5" stroke="${palette_1.palette.accent.green}" stroke-width="${STROKE_WIDTH}" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}" />`),
    },
    python: {
        fileExtensions: ["py"],
        svg: () => makeCodeFileIcon(palette_1.palette.accent.cyan, `<path d="M5 7.25a1 1 0 0 1 1-1h2.25a1 1 0 0 1 1 1v1H6a1 1 0 0 0-1 1v.5a1 1 0 0 0 1 1h2.25a1 1 0 0 0 1-1V8.5" stroke="${palette_1.palette.accent.cyan}" stroke-width="1.1" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}" /><circle cx="6.25" cy="7.1" r=".45" fill="${palette_1.palette.accent.cyan}"/><circle cx="8.25" cy="10.85" r=".45" fill="${palette_1.palette.accent.cyan}"/>`),
    },
    rust: {
        fileExtensions: ["rs"],
        svg: () => makeCodeFileIcon(palette_1.palette.accent.orange, `<circle cx="6" cy="8.25" r="1.4" stroke="${palette_1.palette.accent.orange}" stroke-width="1.1"/><path d="M7.3 9.25L9.75 11M8.8 6.25h2.2a1 1 0 0 1 0 2H9.5a1 1 0 0 1 0 2H11" stroke="${palette_1.palette.accent.orange}" stroke-width="1.1" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}" />`),
    },
    go: {
        fileExtensions: ["go"],
        svg: () => makeCodeFileIcon(palette_1.palette.accent.cyan, `<path d="M5 8.25a2 2 0 0 0 2 2h1.75a2 2 0 1 0 0-4H7a2 2 0 0 0-2 2zM8.5 8.25h2.75" stroke="${palette_1.palette.accent.cyan}" stroke-width="1.1" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}" />`),
    },
    java: {
        fileExtensions: ["java"],
        svg: () => makeCodeFileIcon(palette_1.palette.accent.red, `<path d="M8 6c1 0 1.5.5 1.5 1.5v2.25A1.75 1.75 0 0 1 7.75 11.5H6.5M8.5 5l1-1M7.25 4.5h2.5" stroke="${palette_1.palette.accent.red}" stroke-width="1.1" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}" />`),
    },
    php: {
        fileExtensions: ["php"],
        svg: () => makeCodeFileIcon(palette_1.palette.accent.purple, `<ellipse cx="8" cy="8" rx="3.25" ry="2.1" stroke="${palette_1.palette.accent.purple}" stroke-width="1.1"/><path d="M6.3 8v1.6M7.2 7.1h-.9a.7.7 0 0 0 0 1.4h.9M8.2 7.1v2.5M9.2 7.1v2.5M10 8.3h1.1a.7.7 0 1 0 0-1.4H10" stroke="${palette_1.palette.accent.purple}" stroke-width=".8" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}" />`),
    },
    prisma: {
        fileExtensions: ["prisma"],
        svg: () => makeFileIcon(palette_1.palette.accent.sky, `<path d="M7.25 5.5l2.75 1.75L8 11.5 5.5 8.25 7.25 5.5z" stroke="${palette_1.palette.accent.sky}" stroke-width="1.2" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}" />`),
    },
    graphql: {
        fileExtensions: ["graphql", "gql"],
        svg: () => makeFileIcon(palette_1.palette.accent.purple, `<polygon points="8,5.25 10.25,6.6 10.25,9.4 8,10.75 5.75,9.4 5.75,6.6" stroke="${palette_1.palette.accent.purple}" stroke-width="1.1"/><path d="M8 5.25v5.5M5.75 6.6l4.5 2.8M10.25 6.6l-4.5 2.8" stroke="${palette_1.palette.accent.purple}" stroke-width=".9" stroke-linecap="${STROKE_LINECAP}" />`),
    },
    sql: {
        fileExtensions: ["sql"],
        svg: () => makeFileIcon(palette_1.palette.accent.orange, `<ellipse cx="8" cy="6.75" rx="2.75" ry="1.25" stroke="${palette_1.palette.accent.orange}" stroke-width="1.1"/><path d="M5.25 6.75V9.8c0 .7 1.2 1.25 2.75 1.25s2.75-.55 2.75-1.25V6.75" stroke="${palette_1.palette.accent.orange}" stroke-width="1.1" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}" />`),
    },
    wasm: {
        fileExtensions: ["wasm"],
        svg: () => makeFileIcon(palette_1.palette.accent.blue, `<path d="M4.5 6.25l1 4.25 1.25-2.75L8 10.5l1.25-2.75 1.25 2.75 1-4.25" stroke="${palette_1.palette.accent.blue}" stroke-width="1.1" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}" />`),
    },
    archive: {
        fileExtensions: ["zip"],
        svg: () => makeFileIcon(palette_1.palette.accent.yellow, `<path d="M7.5 5.75h1M7.5 7h1M7.5 8.25h1M7.5 9.5h1M7.5 10.75h1M6 11.5h4" stroke="${palette_1.palette.accent.yellow}" stroke-width="1.1" stroke-linecap="${STROKE_LINECAP}" />`),
    },
    pdf: {
        fileExtensions: ["pdf"],
        svg: () => makeFileIcon(palette_1.palette.accent.red, `<path d="M5 10.75V6.5h1.3a1 1 0 0 1 0 2H5M8 10.75V6.5h1.2a1.2 1.2 0 0 1 0 2.4H8M10.2 10.75V6.5h2.2" stroke="${palette_1.palette.accent.red}" stroke-width=".95" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}" />`),
    },
    text: {
        fileExtensions: ["txt"],
        svg: () => makeFileIcon(palette_1.palette.fg.subtle, `<path d="M5.25 6.5h5.5M5.25 8.5h5.5M5.25 10.5h3.75" stroke="${palette_1.palette.fg.subtle}" stroke-width="1.1" stroke-linecap="${STROKE_LINECAP}" />`),
    },
    git: {
        fileNames: [".gitignore"],
        svg: () => makeFileIcon(palette_1.palette.accent.orange, `<circle cx="6" cy="6.5" r=".8" fill="${palette_1.palette.accent.orange}"/><circle cx="10" cy="8" r=".8" fill="${palette_1.palette.accent.orange}"/><circle cx="6" cy="10" r=".8" fill="${palette_1.palette.accent.orange}"/><path d="M6.7 6.9L9.3 7.6M9.3 8.4L6.7 9.1" stroke="${palette_1.palette.accent.orange}" stroke-width="1.1" stroke-linecap="${STROKE_LINECAP}" />`),
    },
    docker: {
        fileNames: ["dockerfile", "Dockerfile", "docker-compose.yml", "docker-compose.yaml"],
        svg: () => makeFileIcon(palette_1.palette.accent.cyan, `<rect x="4.75" y="7" width="1.1" height="1.1" rx=".2" fill="${palette_1.palette.accent.cyan}"/><rect x="6.1" y="7" width="1.1" height="1.1" rx=".2" fill="${palette_1.palette.accent.cyan}"/><rect x="7.45" y="7" width="1.1" height="1.1" rx=".2" fill="${palette_1.palette.accent.cyan}"/><rect x="6.1" y="5.65" width="1.1" height="1.1" rx=".2" fill="${palette_1.palette.accent.cyan}"/><path d="M5 9.2h5.5a1.6 1.6 0 0 1-1.5 1.2H7A2.2 2.2 0 0 1 5 9.2z" stroke="${palette_1.palette.accent.cyan}" stroke-width="1" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}" />`),
    },
    license: {
        fileNames: ["license", "LICENSE"],
        svg: () => makeFileIcon(palette_1.palette.accent.green, `<rect x="5.25" y="6.25" width="5.5" height="4.5" rx=".7" stroke="${palette_1.palette.accent.green}" stroke-width="1.1"/><path d="M6.75 8.5l.9.9 1.7-1.7" stroke="${palette_1.palette.accent.green}" stroke-width="1.1" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}" />`),
    },
    folder: {
        svg: () => makeFolderIcon(palette_1.palette.fg.muted, false),
    },
    folderOpen: {
        svg: () => makeFolderIcon(palette_1.palette.fg.muted, true),
    },
    folderSrc: {
        folderNames: ["src"],
        svg: () => makeFolderIcon(palette_1.palette.accent.blue, false, `<path d="M6 8.5L4.8 9.6 6 10.7M10 8.5l1.2 1.1-1.2 1.1" stroke="${palette_1.palette.accent.blue}" stroke-width="1.1" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}" />`),
    },
    folderNode: {
        folderNames: ["node_modules"],
        svg: () => makeFolderIcon(palette_1.palette.accent.green, false, `<polygon points="8,7.1 9.6,8 9.6,9.9 8,10.8 6.4,9.9 6.4,8" stroke="${palette_1.palette.accent.green}" stroke-width="1.1"/><path d="M8 7.1v3.7" stroke="${palette_1.palette.accent.green}" stroke-width="1" />`),
    },
    folderBuild: {
        folderNames: ["dist", "out"],
        svg: () => makeFolderIcon(palette_1.palette.accent.yellow, false, `<path d="M6 7.75h4v4H6zM5 9.75h1M10 9.75h1M8 6.75v1" stroke="${palette_1.palette.accent.yellow}" stroke-width="1.1" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}" />`),
    },
    folderGit: {
        folderNames: [".git", ".github"],
        svg: () => makeFolderIcon(palette_1.palette.accent.orange, false, `<circle cx="6.2" cy="8.1" r=".6" fill="${palette_1.palette.accent.orange}"/><circle cx="9.8" cy="9.2" r=".6" fill="${palette_1.palette.accent.orange}"/><circle cx="6.2" cy="10.3" r=".6" fill="${palette_1.palette.accent.orange}"/><path d="M6.8 8.4l2.4.6M9.2 9.5l-2.4.6" stroke="${palette_1.palette.accent.orange}" stroke-width="1" stroke-linecap="${STROKE_LINECAP}" />`),
    },
    folderAssets: {
        folderNames: ["public", "assets"],
        svg: () => makeFolderIcon(palette_1.palette.accent.purple, false, `<rect x="5.3" y="7.5" width="5.4" height="3.8" rx=".8" stroke="${palette_1.palette.accent.purple}" stroke-width="1"/><circle cx="6.8" cy="8.8" r=".5" fill="${palette_1.palette.accent.purple}"/><path d="M5.9 10.8l1.5-1.3 1 1 1.2-1 1.1 1.3" stroke="${palette_1.palette.accent.purple}" stroke-width=".95" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}" />`),
    },
    folderComponents: {
        folderNames: ["components"],
        svg: () => makeFolderIcon(palette_1.palette.accent.cyan, false, `<rect x="5.2" y="7.4" width="2.1" height="2.1" rx=".35" stroke="${palette_1.palette.accent.cyan}" stroke-width="1"/><rect x="8.7" y="7.4" width="2.1" height="2.1" rx=".35" stroke="${palette_1.palette.accent.cyan}" stroke-width="1"/><rect x="6.95" y="10.05" width="2.1" height="2.1" rx=".35" stroke="${palette_1.palette.accent.cyan}" stroke-width="1"/>`),
    },
    folderPages: {
        folderNames: ["pages"],
        svg: () => makeFolderIcon(palette_1.palette.accent.blue, false, `<rect x="5.4" y="7.2" width="5.2" height="4.4" rx=".8" stroke="${palette_1.palette.accent.blue}" stroke-width="1"/><path d="M7.2 7.2v4.4M5.4 8.9h5.2" stroke="${palette_1.palette.accent.blue}" stroke-width=".9" />`),
    },
    folderApi: {
        folderNames: ["api"],
        svg: () => makeFolderIcon(palette_1.palette.accent.red, false, `<path d="M5.2 10.9l2-3.8h1.6l2 3.8M6 9.6h2.8M10.4 7.2h1.2M11 6.6v1.2" stroke="${palette_1.palette.accent.red}" stroke-width="1.05" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}" />`),
    },
    folderHooks: {
        folderNames: ["hooks"],
        svg: () => makeFolderIcon(palette_1.palette.accent.orange, false, `<path d="M9.8 7.3a1.8 1.8 0 1 0-1.8 1.8h.6v1.3a1.4 1.4 0 1 0 2.8 0" stroke="${palette_1.palette.accent.orange}" stroke-width="1.1" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}" />`),
    },
    folderUtils: {
        folderNames: ["utils", "lib"],
        svg: () => makeFolderIcon(palette_1.palette.accent.yellow, false, `<path d="M6 11.1l1.1-1.1M8.9 8.2L10 7.1M6.7 7.8l2.6 2.6M5.6 8.9l1.1 1.1M9.3 7.4l1.1 1.1" stroke="${palette_1.palette.accent.yellow}" stroke-width="1.05" stroke-linecap="${STROKE_LINECAP}" />`),
    },
    folderStyles: {
        folderNames: ["styles"],
        svg: () => makeFolderIcon(palette_1.palette.accent.cyan, false, `<path d="M6.1 10.9l2.3-3.8 1.5 1-2.3 3.8H6.1zM9.5 7.7l.7-1.1 1.1.7-.7 1.1" stroke="${palette_1.palette.accent.cyan}" stroke-width="1.05" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}" />`),
    },
    folderTests: {
        folderNames: ["tests"],
        svg: () => makeFolderIcon(palette_1.palette.accent.green, false, `<path d="M6 7.3h4M7 7.3v3.3M9 7.3v3.3M6 10.6h4" stroke="${palette_1.palette.accent.green}" stroke-width="1.05" stroke-linecap="${STROKE_LINECAP}" /><path d="M7.2 6.5h1.6" stroke="${palette_1.palette.accent.green}" stroke-width="1.05" stroke-linecap="${STROKE_LINECAP}" />`),
    },
    folderDocs: {
        folderNames: ["docs"],
        svg: () => makeFolderIcon(palette_1.palette.accent.sky, false, `<path d="M5.7 7.4h4.6v4.1H5.7zM6.5 8.4h3M6.5 9.3h2.4M6.5 10.2h2.8" stroke="${palette_1.palette.accent.sky}" stroke-width="1.05" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}" />`),
    },
    folderVscode: {
        folderNames: [".vscode"],
        svg: () => makeFolderIcon(palette_1.palette.accent.blue, false, `<path d="M6 8.1l2.1-1.6 2.2 1.2v3.2l-2.2 1.2L6 10.5l1.4-1.1L6 8.1z" stroke="${palette_1.palette.accent.blue}" stroke-width="1.05" stroke-linecap="${STROKE_LINECAP}" stroke-linejoin="${STROKE_LINEJOIN}" />`),
    },
};
const iconsByExtension = {
    ts: "typescript",
    tsx: "typescript",
    js: "javascript",
    jsx: "javascript",
    json: "config",
    md: "markdown",
    css: "styles",
    scss: "styles",
    html: "markup",
    svg: "markup",
    png: "image",
    jpg: "image",
    jpeg: "image",
    env: "env",
    yaml: "config",
    yml: "config",
    toml: "config",
    lock: "config",
    sh: "shell",
    py: "python",
    rs: "rust",
    go: "go",
    java: "java",
    php: "php",
    vue: "markup",
    astro: "markup",
    prisma: "prisma",
    graphql: "graphql",
    gql: "graphql",
    sql: "sql",
    wasm: "wasm",
    zip: "archive",
    pdf: "pdf",
    txt: "text",
};
const iconsByFileName = {
    "package.json": "config",
    "tsconfig.json": "config",
    ".gitignore": "git",
    ".env": "env",
    dockerfile: "docker",
    Dockerfile: "docker",
    "docker-compose.yml": "docker",
    "docker-compose.yaml": "docker",
    "readme.md": "markdown",
    "README.md": "markdown",
    license: "license",
    LICENSE: "license",
    "next.config.js": "config",
    "next.config.ts": "config",
    "next.config.mjs": "config",
    "next.config.cjs": "config",
    "vite.config.js": "config",
    "vite.config.ts": "config",
    "vite.config.mjs": "config",
    "vite.config.cjs": "config",
    "tailwind.config.js": "styles",
    "tailwind.config.ts": "styles",
    "tailwind.config.mjs": "styles",
    "tailwind.config.cjs": "styles",
    "postcss.config.js": "styles",
    "postcss.config.cjs": "styles",
    "postcss.config.mjs": "styles",
    "eslint.config.js": "config",
    "eslint.config.mjs": "config",
    "eslint.config.cjs": "config",
    ".eslintrc": "config",
    ".eslintrc.json": "config",
    ".eslintrc.js": "config",
    ".prettierrc": "config",
    ".prettierrc.json": "config",
    ".prettierrc.js": "config",
    "pnpm-lock.yaml": "config",
    "yarn.lock": "config",
    "package-lock.json": "config",
};
const iconsByFolderName = {
    src: "folderSrc",
    node_modules: "folderNode",
    dist: "folderBuild",
    out: "folderBuild",
    ".git": "folderGit",
    public: "folderAssets",
    assets: "folderAssets",
    components: "folderComponents",
    pages: "folderPages",
    api: "folderApi",
    hooks: "folderHooks",
    utils: "folderUtils",
    lib: "folderUtils",
    styles: "folderStyles",
    tests: "folderTests",
    docs: "folderDocs",
    ".vscode": "folderVscode",
    ".github": "folderGit",
    app: "folderPages",
    server: "folderApi",
    scripts: "folderBuild",
    config: "folderUtils",
    store: "folderUtils",
};
function writeSvgFiles(svgDirectory, variant) {
    for (const [iconName, icon] of Object.entries(iconCatalog)) {
        const vividSvg = icon.svg();
        const content = variant === "muted" ? toMutedSvg(vividSvg) : vividSvg;
        (0, node_fs_1.writeFileSync)((0, node_path_1.resolve)(svgDirectory, `${iconName}.svg`), `${content}\n`, "utf8");
    }
}
function buildIconThemeDocument(variant) {
    const iconDefinitions = {};
    const svgDirectory = variant === "muted" ? "svg-muted" : "svg";
    for (const iconName of Object.keys(iconCatalog)) {
        iconDefinitions[iconName] = { iconPath: `./${svgDirectory}/${iconName}.svg` };
    }
    return {
        iconDefinitions,
        file: "file",
        folder: "folder",
        folderExpanded: "folderOpen",
        rootFolder: "folder",
        rootFolderExpanded: "folderOpen",
        fileExtensions: iconsByExtension,
        fileNames: iconsByFileName,
        folderNames: iconsByFolderName,
        folderNamesExpanded: iconsByFolderName,
    };
}
function buildIcons() {
    const iconRoot = (0, node_path_1.resolve)(__dirname, "../icons");
    const vividSvgDirectory = (0, node_path_1.resolve)(iconRoot, "svg");
    const mutedSvgDirectory = (0, node_path_1.resolve)(iconRoot, "svg-muted");
    (0, node_fs_1.mkdirSync)(vividSvgDirectory, { recursive: true });
    (0, node_fs_1.mkdirSync)(mutedSvgDirectory, { recursive: true });
    writeSvgFiles(vividSvgDirectory, "vivid");
    writeSvgFiles(mutedSvgDirectory, "muted");
    const vividIconThemeDocument = buildIconThemeDocument("vivid");
    const mutedIconThemeDocument = buildIconThemeDocument("muted");
    const vividIconThemePath = (0, node_path_1.resolve)(iconRoot, "nullspace-icon-theme.json");
    const mutedIconThemePath = (0, node_path_1.resolve)(iconRoot, "nullspace-icon-theme-muted.json");
    (0, node_fs_1.writeFileSync)(vividIconThemePath, `${JSON.stringify(vividIconThemeDocument, null, 2)}\n`, "utf8");
    (0, node_fs_1.writeFileSync)(mutedIconThemePath, `${JSON.stringify(mutedIconThemeDocument, null, 2)}\n`, "utf8");
}
