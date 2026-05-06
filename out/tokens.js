"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenColors = void 0;
const palette_1 = require("./palette");
exports.tokenColors = [
    {
        name: "Comment",
        scope: ["comment", "punctuation.definition.comment"],
        settings: {
            foreground: palette_1.palette.fg.subtle,
            fontStyle: "italic",
        },
    },
    {
        name: "String",
        scope: ["string", "string.quoted", "string.template"],
        settings: {
            foreground: palette_1.palette.accent.green,
        },
    },
    {
        name: "String escape",
        scope: ["constant.character.escape", "string.regexp"],
        settings: {
            foreground: palette_1.palette.accent.yellow,
        },
    },
    {
        name: "Number",
        scope: ["constant.numeric", "number"],
        settings: {
            foreground: palette_1.palette.accent.yellow,
        },
    },
    {
        name: "Keyword",
        scope: [
            "keyword",
            "keyword.control",
            "keyword.operator.word",
            "storage.modifier",
        ],
        settings: {
            foreground: palette_1.palette.accent.purple,
        },
    },
    {
        name: "Storage and declarations",
        scope: ["storage", "storage.type"],
        settings: {
            foreground: palette_1.palette.accent.purple,
        },
    },
    {
        name: "Operator",
        scope: ["keyword.operator", "punctuation.separator.key-value"],
        settings: {
            foreground: palette_1.palette.fg.primary,
        },
    },
    {
        name: "Variable and parameter",
        scope: [
            "variable",
            "variable.other.readwrite",
            "variable.parameter",
            "meta.definition.variable",
        ],
        settings: {
            foreground: palette_1.palette.fg.primary,
        },
    },
    {
        name: "Function",
        scope: [
            "entity.name.function",
            "support.function",
            "meta.function-call",
            "variable.function",
        ],
        settings: {
            foreground: palette_1.palette.accent.blue,
        },
    },
    {
        name: "Type and class",
        scope: [
            "entity.name.type",
            "entity.name.class",
            "storage.type.class",
            "support.type",
            "support.class",
        ],
        settings: {
            foreground: palette_1.palette.accent.cyan,
        },
    },
    {
        name: "Property and member",
        scope: [
            "variable.other.property",
            "meta.object-literal.key",
            "entity.name.tag.yaml",
            "support.variable.property",
        ],
        settings: {
            foreground: palette_1.palette.accent.sky,
        },
    },
    {
        name: "Constant and enum",
        scope: [
            "constant",
            "constant.other",
            "variable.other.constant",
            "entity.name.constant",
        ],
        settings: {
            foreground: palette_1.palette.accent.orange,
        },
    },
    {
        name: "HTML and JSX tag",
        scope: [
            "entity.name.tag",
            "entity.name.tag.custom",
            "support.class.component",
        ],
        settings: {
            foreground: palette_1.palette.accent.red,
        },
    },
    {
        name: "HTML attribute",
        scope: ["entity.other.attribute-name", "meta.attribute"],
        settings: {
            foreground: palette_1.palette.accent.yellow,
        },
    },
    {
        name: "CSS selectors and property",
        scope: [
            "entity.name.tag.css",
            "entity.other.attribute-name.class.css",
            "support.type.property-name.css",
        ],
        settings: {
            foreground: palette_1.palette.accent.cyan,
        },
    },
    {
        name: "CSS values",
        scope: [
            "support.constant.property-value.css",
            "constant.numeric.css",
            "keyword.other.unit",
        ],
        settings: {
            foreground: palette_1.palette.accent.green,
        },
    },
    {
        name: "Markdown headings",
        scope: ["markup.heading", "markup.heading.markdown"],
        settings: {
            foreground: palette_1.palette.accent.blue,
            fontStyle: "bold",
        },
    },
    {
        name: "Markdown emphasis",
        scope: ["markup.italic.markdown", "markup.bold.markdown"],
        settings: {
            foreground: palette_1.palette.accent.purple,
        },
    },
    {
        name: "Markdown link",
        scope: ["markup.underline.link", "string.other.link.title.markdown"],
        settings: {
            foreground: palette_1.palette.accent.cyan,
            fontStyle: "underline",
        },
    },
    {
        name: "Punctuation",
        scope: [
            "punctuation",
            "meta.brace",
            "meta.delimiter",
            "punctuation.definition.tag",
        ],
        settings: {
            foreground: palette_1.palette.fg.muted,
        },
    },
    {
        name: "Invalid",
        scope: ["invalid", "invalid.deprecated"],
        settings: {
            foreground: palette_1.palette.semantic.error,
            fontStyle: "underline",
        },
    },
];
