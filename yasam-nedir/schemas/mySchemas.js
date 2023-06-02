import React from "react";
import AlignBlock from "./components/AlignBlock";

const fonts = [
    { title: "Literata", value: "Literata" },
    {
        title: "Times New Roman",
        value: "Times New Roman",
    },
    {
        title: "Verdana",
        value: "Verdana",
    },
    {
        title: "Helvetica",
        value: "Tahoma",
    },
    {
        title: "Trebuchet",
        value: "Trebuchet",
    },
    {
        title: "Georgia",
        value: "Georgia",
    },
    {
        title: "Garamond",
        value: "Garamond",
    },
    {
        title: "Courier New",
        value: "Courier New",
    },
    {
        title: "Brush Script MT",
        value: "Brush Script MT",
    },
];

const fontSizeIcon = () => (
    <span>
        <span style={{ fontWeight: "bold", fontSize: "1rem" }}>A</span>
        <span style={{ fontWeight: "bold", fontSize: "0.75rem" }}>A</span>
    </span>
);

const fontSizeRender = (props) => (
    <span
        style={{
            fontSize: `${props.pixels}px`,
            fontFamily: props.fontFamily ? `${props.fontFamily}` : "Segoe UI",
        }}
    >
        {props.children}
    </span>
);

const mathInlineIcon = () => (
    <span>
        <span style={{ fontWeight: "bold" }}>∑</span>b
    </span>
);
const mathIcon = () => <span style={{ fontWeight: "bold" }}>∑</span>;
export const mySchemas = [
    {
        type: "document",
        title: "Birim",
        name: "Birim",
        preview: {
            select: {
                title: "title",
                num: "birim_no",
                media: "birim_icon",
            },
            prepare(selection) {
                const { title, num, media } = selection;
                return {
                    title: `${num}- ${title}`,
                    media: media,
                };
            },
        },
        fields: [
            { type: "string", name: "title", title: "Birimin Adı" },

            {
                title: "Birimin Simgesi",
                type: "image",
                name: "birim_icon",
                description: "gets scaled to 152x135",
                of: [{ type: "block" }],
            },
            {
                title: "Birim Numarası",
                name: "birim_no",
                type: "number",
                validation: (Rule) => Rule.required().positive().lessThan(100),
            },
        ],
    },

    {
        type: "document",
        title: "Bölüm",
        name: "Bolum",
        preview: {
            select: {
                title: "title",
                subtitle: "related_birim.birim_no",
                num: "bolum_no",
                media: "birim_icon",
            },
            prepare(selection) {
                const { title, subtitle, num, media } = selection;
                return {
                    title: `${num}- ${title}`,
                    subtitle: `Birim: ${subtitle}`,
                    media: media,
                };
            },
        },
        fields: [
            { type: "string", name: "title", title: "Bölümün Adı" },
            {
                title: "Bölümün Simgesi",
                type: "image",
                name: "birim_icon",
                description: "gets scaled to 152x135",
                of: [{ type: "block" }],
                options: {
                    hotspot: true,
                },
            },
            {
                title: "Bölüm Numarası",
                name: "bolum_no",
                type: "number",
                validation: (Rule) => Rule.required().positive().lessThan(100),
            },
            {
                title: "Ait Olduğu Birim",
                description:
                    "Her bölüm bir birim ile ilişkilendirilmek zorundadır.",
                name: "related_birim",
                type: "reference",
                to: [{ type: "Birim" }],
            },
            {
                type: "array",
                name: "alt_bolumler",
                title: "Alt Bölümleri",
                of: [{ type: "alt_bolumler" }],
            },
        ],
    },

    {
        type: "object",
        title: "Alt Bölüm",
        name: "alt_bolumler",
        preview: {
            select: {
                title: "title",
                num: "alt_bolum_no",
                media: "media",
            },
            prepare(selection) {
                const { title, num } = selection;
                return {
                    title: `${title}`,
                    media: <span>{num}</span>,
                };
            },
        },
        fields: [
            { type: "string", name: "title", title: "Alt Bölümün Başlığı" },

            {
                title: "Alt Bölüm Numarası",
                name: "alt_bolum_no",
                type: "number",
                validation: (Rule) => Rule.required().positive().lessThan(100),
            },
            {
                title: "İçerik",
                name: "content",
                type: "array",
                of: [
                    {
                        type: "textAlignment",
                        name: "textAlignment",
                        title: "Sunum",
                    },
                    {
                        type: "latex",
                        icon: mathInlineIcon,
                        title: "Inline math",
                    },
                    {
                        type: "block",
                        styles: [
                            { title: "Normal", value: "normal" },
                            { title: "H1", value: "h1" },
                            { title: "H2", value: "h2" },
                            { title: "H3", value: "h3" },
                            { title: "Quote", value: "blockquote" },
                        ],
                        marks: {
                            annotations: [
                                {
                                    name: "link",
                                    type: "object",
                                    title: "URL",
                                    fields: [
                                        {
                                            name: "href",
                                            type: "url",
                                            title: "URL",
                                        },
                                    ],
                                },
                                {
                                    name: "fontStyles",
                                    type: "object",
                                    title: "Yazı Stilleri",
                                    blockEditor: {
                                        icon: fontSizeIcon,
                                        render: fontSizeRender,
                                    },
                                    options: {
                                        collapsible: true, // Makes the whole fieldset collapsible
                                        collapsed: true, // Defines if the fieldset should be collapsed by default or not
                                        columns: 1, // Defines a grid for the fields and how many columns it should have
                                        editModal: "popover",
                                    },
                                    fields: [
                                        {
                                            name: "pixels",
                                            type: "number",
                                            title: "Pixels",
                                        },
                                        {
                                            name: "fontFamily",
                                            type: "string",
                                            title: "Yazı Tipi",
                                            options: {
                                                list: fonts,
                                            },
                                        },
                                    ],
                                },
                            ],
                            decorators: [
                                { title: "Strong", value: "strong" },
                                { title: "Emphasis", value: "em" },
                                { title: "Underline", value: "underline" },
                                { title: "Code", value: "code" },
                                { title: "Strike", value: "strike-through" },
                                {
                                    title: "Indented",
                                    value: "indented",
                                    blockEditor: {
                                        render: ({ children }) => (
                                            <p style={{ marginLeft: "2em" }}>
                                                {children}
                                            </p>
                                        ),
                                        icon: () => "|->",
                                    },
                                },
                            ],
                        },
                    },
                    {
                        type: "image",
                        fields: [
                            {
                                name: "width",
                                type: "number",
                                title: "Genişlik",
                                options: { isHighlighted: true },
                            },
                            {
                                name: "height",
                                type: "number",
                                title: "Yükseklik",
                                options: { isHighlighted: true },
                            },
                            {
                                name: "imgPos",
                                type: "string",
                                title: "Resim Pozisyonu",
                                initialValue: "left",
                                options: {
                                    list: [
                                        { title: "Sol", value: "left" },
                                        { title: "Orta", value: "mid" },
                                        { title: "Sağ", value: "right" },
                                    ],
                                    isHighlighted: true,
                                },
                            },
                            {
                                name: "fit",
                                type: "string",
                                options: {
                                    list: [
                                        {
                                            title: "En-Boy oranını koruma",
                                            value: "scale",
                                        },
                                        {
                                            title: "En-Boy oranını koru",
                                            value: "clip",
                                        },
                                    ],
                                    isHighlighted: true,
                                    layout: "radio",
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },

    {
        type: "object",
        title: "Tooltips",
        name: "tooltips",
        fields: [{ type: "text", title: "kelimeler", name: "kelimeler" }],
    },
    {
        type: "object",
        title: "Genel Ayarlar",
        name: "settings",
        fields: [
            {
                name: "lineHeight",
                type: "object",
                title: "Satır Aralığı",
                options: {
                    collapsible: true, // Makes the whole fieldset collapsible
                    collapsed: true, // Defines if the fieldset should be collapsed by default or not
                    columns: 1, // Defines a grid for the fields and how many columns it should have
                    editModal: "popover",
                },
                fields: [
                    {
                        name: "value",
                        type: "string",
                        title: "Değer",
                        options: {
                            list: [
                                { title: "1 (aralık yok)", value: "1" },
                                { title: "1.1", value: "1.1" },
                                { title: "1.2 (varsayılan)", value: "1.2" },
                                { title: "1.3", value: "1.3" },
                                { title: "1.4", value: "1.4" },
                                { title: "1.5", value: "1.5" },
                                { title: "1.6", value: "1.6" },
                                { title: "1.7", value: "1.7" },
                                { title: "1.8", value: "1.8" },
                                { title: "1.9", value: "1.9" },
                                { title: "2", value: "2" },
                            ],
                        },
                    },
                ],
            },
            {
                title: "Anasayfa Paragraf",
                name: "homeContent",
                type: "array",
                of: [
                    {
                        type: "block",
                        styles: [
                            { title: "Normal", value: "normal" },
                            { title: "H1", value: "h1" },
                            { title: "H2", value: "h2" },
                            { title: "H3", value: "h3" },
                            { title: "Quote", value: "blockquote" },
                        ],
                        marks: {
                            annotations: [
                                {
                                    name: "fontStyles",
                                    type: "object",
                                    title: "Yazı Stilleri",
                                    blockEditor: {
                                        icon: fontSizeIcon,
                                        render: fontSizeRender,
                                    },
                                    options: {
                                        collapsible: true, // Makes the whole fieldset collapsible
                                        collapsed: true, // Defines if the fieldset should be collapsed by default or not
                                        columns: 1, // Defines a grid for the fields and how many columns it should have
                                        editModal: "popover",
                                    },
                                    fields: [
                                        {
                                            name: "pixels",
                                            type: "number",
                                            title: "Pixels",
                                        },
                                        {
                                            name: "fontFamily",
                                            type: "string",
                                            title: "Yazı Tipi",
                                            options: {
                                                list: fonts,
                                            },
                                        },
                                    ],
                                },
                            ],
                            decorators: [
                                { title: "Strong", value: "strong" },
                                { title: "Emphasis", value: "em" },
                                { title: "Underline", value: "underline" },
                                { title: "Code", value: "code" },
                                { title: "Strike", value: "strike-through" },
                            ],
                        },
                    },
                ],
            },
        ],
    },
    {
        name: "textAlignment",
        type: "object",
        title: "Pozisyon",
        preview: {
            select: {
                title: "text[0].children[0].text",
                subtitle: "alignment",
            },
            prepare(selection) {
                let { title, subtitle } = selection;
                if (subtitle === "center") {
                    subtitle = "Ortalanmış";
                }
                if (subtitle === "left") {
                    subtitle = "Sola dayalı";
                }
                if (subtitle === "right") {
                    subtitle = "Sağa dayalı";
                }
                return {
                    title: title,
                    subtitle: subtitle,
                };
            },
        },
        fields: [
            {
                title: "Content",
                name: "text",
                type: "array",
                of: [
                    {
                        type: "block",
                        styles: [
                            { title: "Normal", value: "normal" },
                            { title: "H1", value: "h1" },
                            { title: "H2", value: "h2" },
                            { title: "H3", value: "h3" },
                            { title: "Quote", value: "blockquote" },
                        ],
                        marks: {
                            annotations: [
                                {
                                    name: "link",
                                    type: "object",
                                    title: "URL",
                                    fields: [
                                        {
                                            name: "href",
                                            type: "url",
                                            title: "URL",
                                        },
                                    ],
                                },
                                {
                                    name: "fontStyles",
                                    type: "object",
                                    title: "Yazı Stilleri",
                                    blockEditor: {
                                        icon: fontSizeIcon,
                                        render: fontSizeRender,
                                    },
                                    options: {
                                        collapsible: true, // Makes the whole fieldset collapsible
                                        collapsed: true, // Defines if the fieldset should be collapsed by default or not
                                        columns: 1, // Defines a grid for the fields and how many columns it should have
                                        editModal: "popover",
                                    },
                                    fields: [
                                        {
                                            name: "pixels",
                                            type: "number",
                                            title: "Pixels",
                                        },
                                        {
                                            name: "fontFamily",
                                            type: "string",
                                            title: "Yazı Tipi",
                                            options: {
                                                list: fonts,
                                            },
                                        },
                                    ],
                                },
                            ],
                            decorators: [
                                { title: "Strong", value: "strong" },
                                { title: "Emphasis", value: "em" },
                                { title: "Underline", value: "underline" },
                                { title: "Code", value: "code" },
                                { title: "Strike", value: "strike-through" },
                                {
                                    title: "Indented",
                                    value: "indented",
                                    blockEditor: {
                                        render: ({ children }) => (
                                            <p style={{ marginLeft: "2em" }}>
                                                {children}
                                            </p>
                                        ),
                                        icon: () => "|->",
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
            {
                title: "Yazı Pozisyonu",
                name: "alignment",
                type: "string",
                initialValue: "center",
                preview: { select: { title: "title", subtitle: "yo" } },
                options: {
                    list: [
                        { title: "Sağ", value: "right" },
                        { title: "Sol", value: "left" },
                        { title: "Orta", value: "center" },
                    ],
                },
            },
        ],
    },
    {
        name: "portableTextWithLatex",
        type: "array",
        title: "Body",
        of: [
            {
                type: "block",
                title: "Block",
                of: [
                    {
                        type: "latex",
                        icon: mathInlineIcon,
                        title: "Inline math",
                        of: [
                            {
                                title: "Yazı Pozisyonu",
                                name: "alignment",
                                type: "string",
                                initialValue: "center",
                                preview: {
                                    select: { title: "title", subtitle: "yo" },
                                },
                                options: {
                                    list: [
                                        { title: "Sağ", value: "right" },
                                        { title: "Sol", value: "left" },
                                        { title: "Orta", value: "center" },
                                    ],
                                },
                            },
                        ],
                    },
                ],
            },
            { type: "latex", icon: mathIcon, title: "Math block" },
        ],
    },

    {
        type: "document",
        title: "Denemeler",
        name: "denemeler",
        fields: [
            { type: "string", name: "title", title: "Denemenin Başlığı" },
            { type: "number", name: "index", title: "Sıra" },
            {
                title: "Denemenin Simgesi",
                type: "image",
                name: "deneme_icon",
                description: "gets scaled to 152x135",
                of: [{ type: "block" }],
                options: {
                    hotspot: true,
                },
            },
            {
                title: "İçerik",
                name: "content",
                type: "array",
                of: [
                    {
                        type: "textAlignment",
                        name: "textAlignment",
                        title: "Sunum",
                    },
                    {
                        type: "latex",
                        icon: mathInlineIcon,
                        title: "Inline math",
                    },
                    {
                        type: "block",
                        styles: [
                            { title: "Normal", value: "normal" },
                            { title: "H1", value: "h1" },
                            { title: "H2", value: "h2" },
                            { title: "H3", value: "h3" },
                            { title: "Quote", value: "blockquote" },
                        ],
                        marks: {
                            annotations: [
                                {
                                    name: "link",
                                    type: "object",
                                    title: "URL",
                                    fields: [
                                        {
                                            name: "href",
                                            type: "url",
                                            title: "URL",
                                        },
                                    ],
                                },
                                {
                                    name: "fontStyles",
                                    type: "object",
                                    title: "Yazı Stilleri",
                                    blockEditor: {
                                        icon: fontSizeIcon,
                                        render: fontSizeRender,
                                    },
                                    options: {
                                        collapsible: true, // Makes the whole fieldset collapsible
                                        collapsed: true, // Defines if the fieldset should be collapsed by default or not
                                        columns: 1, // Defines a grid for the fields and how many columns it should have
                                        editModal: "popover",
                                    },
                                    fields: [
                                        {
                                            name: "pixels",
                                            type: "number",
                                            title: "Pixels",
                                        },
                                        {
                                            name: "fontFamily",
                                            type: "string",
                                            title: "Yazı Tipi",
                                            options: {
                                                list: fonts,
                                            },
                                        },
                                    ],
                                },
                            ],
                            decorators: [
                                { title: "Strong", value: "strong" },
                                { title: "Emphasis", value: "em" },
                                { title: "Underline", value: "underline" },
                                { title: "Code", value: "code" },
                                { title: "Strike", value: "strike-through" },
                                {
                                    title: "Indented",
                                    value: "indented",
                                    blockEditor: {
                                        render: ({ children }) => (
                                            <p style={{ marginLeft: "2em" }}>
                                                {children}
                                            </p>
                                        ),
                                        icon: () => "|->",
                                    },
                                },
                            ],
                        },
                    },
                    {
                        type: "image",
                        fields: [
                            {
                                name: "width",
                                type: "number",
                                title: "Genişlik",
                                options: { isHighlighted: true },
                            },
                            {
                                name: "height",
                                type: "number",
                                title: "Yükseklik",
                                options: { isHighlighted: true },
                            },
                            {
                                name: "imgPos",
                                type: "string",
                                title: "Resim Pozisyonu",
                                initialValue: "left",
                                options: {
                                    list: [
                                        { title: "Sol", value: "left" },
                                        { title: "Orta", value: "mid" },
                                        { title: "Sağ", value: "right" },
                                    ],
                                    isHighlighted: true,
                                },
                            },
                            {
                                name: "fit",
                                type: "string",
                                options: {
                                    list: [
                                        {
                                            title: "En-Boy oranını koruma",
                                            value: "scale",
                                        },
                                        {
                                            title: "En-Boy oranını koru",
                                            value: "clip",
                                        },
                                    ],
                                    isHighlighted: true,
                                    layout: "radio",
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },

    {
        type: "document",
        title: "Evrim Kuramı",
        name: "evrim",
        fields: [
            { type: "string", name: "title", title: "Başlık" },
            { type: "number", name: "index", title: "Sıra" },
            {
                title: "Simge",
                type: "image",
                name: "evrim_icon",
                description: "gets scaled to 152x135",
                of: [{ type: "block" }],
                options: {
                    hotspot: true,
                },
            },
            {
                title: "İçerik",
                name: "content",
                type: "array",
                of: [
                    {
                        type: "textAlignment",
                        name: "textAlignment",
                        title: "Sunum",
                    },
                    {
                        type: "latex",
                        icon: mathInlineIcon,
                        title: "Inline math",
                    },
                    {
                        type: "block",
                        styles: [
                            { title: "Normal", value: "normal" },
                            { title: "H1", value: "h1" },
                            { title: "H2", value: "h2" },
                            { title: "H3", value: "h3" },
                            { title: "Quote", value: "blockquote" },
                        ],
                        marks: {
                            annotations: [
                                {
                                    name: "link",
                                    type: "object",
                                    title: "URL",
                                    fields: [
                                        {
                                            name: "href",
                                            type: "url",
                                            title: "URL",
                                        },
                                    ],
                                },
                                {
                                    name: "fontStyles",
                                    type: "object",
                                    title: "Yazı Stilleri",
                                    blockEditor: {
                                        icon: fontSizeIcon,
                                        render: fontSizeRender,
                                    },
                                    options: {
                                        collapsible: true, // Makes the whole fieldset collapsible
                                        collapsed: true, // Defines if the fieldset should be collapsed by default or not
                                        columns: 1, // Defines a grid for the fields and how many columns it should have
                                        editModal: "popover",
                                    },
                                    fields: [
                                        {
                                            name: "pixels",
                                            type: "number",
                                            title: "Pixels",
                                        },
                                        {
                                            name: "fontFamily",
                                            type: "string",
                                            title: "Yazı Tipi",
                                            options: {
                                                list: fonts,
                                            },
                                        },
                                    ],
                                },
                            ],
                            decorators: [
                                { title: "Strong", value: "strong" },
                                { title: "Emphasis", value: "em" },
                                { title: "Underline", value: "underline" },
                                { title: "Code", value: "code" },
                                { title: "Strike", value: "strike-through" },
                                {
                                    title: "Indented",
                                    value: "indented",
                                    blockEditor: {
                                        render: ({ children }) => (
                                            <p style={{ marginLeft: "2em" }}>
                                                {children}
                                            </p>
                                        ),
                                        icon: () => "|->",
                                    },
                                },
                            ],
                        },
                    },
                    {
                        type: "image",
                        fields: [
                            {
                                name: "width",
                                type: "number",
                                title: "Genişlik",
                                options: { isHighlighted: true },
                            },
                            {
                                name: "height",
                                type: "number",
                                title: "Yükseklik",
                                options: { isHighlighted: true },
                            },
                            {
                                name: "imgPos",
                                type: "string",
                                title: "Resim Pozisyonu",
                                initialValue: "left",
                                options: {
                                    list: [
                                        { title: "Sol", value: "left" },
                                        { title: "Orta", value: "mid" },
                                        { title: "Sağ", value: "right" },
                                    ],
                                    isHighlighted: true,
                                },
                            },
                            {
                                name: "fit",
                                type: "string",
                                options: {
                                    list: [
                                        {
                                            title: "En-Boy oranını koruma",
                                            value: "scale",
                                        },
                                        {
                                            title: "En-Boy oranını koru",
                                            value: "clip",
                                        },
                                    ],
                                    isHighlighted: true,
                                    layout: "radio",
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        type: "object",
        title: "Dördüncü",
        name: "fourth",
        fields: [
            {
                name: "title",
                type: "string",
                title: "Başlık",
            },
            {
                name: "lineHeight",
                type: "object",
                title: "Satır Aralığı",
                options: {
                    collapsible: true, // Makes the whole fieldset collapsible
                    collapsed: true, // Defines if the fieldset should be collapsed by default or not
                    columns: 1, // Defines a grid for the fields and how many columns it should have
                    editModal: "popover",
                },
                fields: [
                    {
                        name: "value",
                        type: "string",
                        title: "Değer",
                        options: {
                            list: [
                                { title: "1 (aralık yok)", value: "1" },
                                { title: "1.1", value: "1.1" },
                                { title: "1.2 (varsayılan)", value: "1.2" },
                                { title: "1.3", value: "1.3" },
                                { title: "1.4", value: "1.4" },
                                { title: "1.5", value: "1.5" },
                                { title: "1.6", value: "1.6" },
                                { title: "1.7", value: "1.7" },
                                { title: "1.8", value: "1.8" },
                                { title: "1.9", value: "1.9" },
                                { title: "2", value: "2" },
                            ],
                        },
                    },
                ],
            },
            {
                title: "Paragraf",
                name: "content",
                type: "array",
                of: [
                    {
                        type: "textAlignment",
                        name: "textAlignment",
                        title: "Sunum",
                    },
                    {
                        type: "latex",
                        icon: mathInlineIcon,
                        title: "Inline math",
                    },
                    {
                        type: "block",
                        styles: [
                            { title: "Normal", value: "normal" },
                            { title: "H1", value: "h1" },
                            { title: "H2", value: "h2" },
                            { title: "H3", value: "h3" },
                            { title: "Quote", value: "blockquote" },
                        ],
                        marks: {
                            annotations: [
                                {
                                    name: "link",
                                    type: "object",
                                    title: "URL",
                                    fields: [
                                        {
                                            name: "href",
                                            type: "url",
                                            title: "URL",
                                        },
                                    ],
                                },
                                {
                                    name: "fontStyles",
                                    type: "object",
                                    title: "Yazı Stilleri",
                                    blockEditor: {
                                        icon: fontSizeIcon,
                                        render: fontSizeRender,
                                    },
                                    options: {
                                        collapsible: true, // Makes the whole fieldset collapsible
                                        collapsed: true, // Defines if the fieldset should be collapsed by default or not
                                        columns: 1, // Defines a grid for the fields and how many columns it should have
                                        editModal: "popover",
                                    },
                                    fields: [
                                        {
                                            name: "pixels",
                                            type: "number",
                                            title: "Pixels",
                                        },
                                        {
                                            name: "fontFamily",
                                            type: "string",
                                            title: "Yazı Tipi",
                                            options: {
                                                list: fonts,
                                            },
                                        },
                                    ],
                                },
                            ],
                            decorators: [
                                { title: "Strong", value: "strong" },
                                { title: "Emphasis", value: "em" },
                                { title: "Underline", value: "underline" },
                                { title: "Code", value: "code" },
                                { title: "Strike", value: "strike-through" },
                                {
                                    title: "Indented",
                                    value: "indented",
                                    blockEditor: {
                                        render: ({ children }) => (
                                            <p style={{ marginLeft: "2em" }}>
                                                {children}
                                            </p>
                                        ),
                                        icon: () => "|->",
                                    },
                                },
                            ],
                        },
                    },
                    {
                        type: "image",
                        fields: [
                            {
                                name: "width",
                                type: "number",
                                title: "Genişlik",
                                options: { isHighlighted: true },
                            },
                            {
                                name: "height",
                                type: "number",
                                title: "Yükseklik",
                                options: { isHighlighted: true },
                            },
                            {
                                name: "imgPos",
                                type: "string",
                                title: "Resim Pozisyonu",
                                initialValue: "left",
                                options: {
                                    list: [
                                        { title: "Sol", value: "left" },
                                        { title: "Orta", value: "mid" },
                                        { title: "Sağ", value: "right" },
                                    ],
                                    isHighlighted: true,
                                },
                            },
                            {
                                name: "fit",
                                type: "string",
                                options: {
                                    list: [
                                        {
                                            title: "En-Boy oranını koruma",
                                            value: "scale",
                                        },
                                        {
                                            title: "En-Boy oranını koru",
                                            value: "clip",
                                        },
                                    ],
                                    isHighlighted: true,
                                    layout: "radio",
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },

    {
        type: "object",
        title: "GirişModal",
        name: "modal",
        fields: [
            {
                name: "modalTitle",
                type: "string",
                title: "Başlık",
            },
            {
                name: "lineHeight",
                type: "object",
                title: "Satır Aralığı",
                options: {
                    collapsible: true, // Makes the whole fieldset collapsible
                    collapsed: true, // Defines if the fieldset should be collapsed by default or not
                    columns: 1, // Defines a grid for the fields and how many columns it should have
                    editModal: "popover",
                },
                fields: [
                    {
                        name: "value",
                        type: "string",
                        title: "Değer",
                        options: {
                            list: [
                                { title: "1 (aralık yok)", value: "1" },
                                { title: "1.1", value: "1.1" },
                                { title: "1.2 (varsayılan)", value: "1.2" },
                                { title: "1.3", value: "1.3" },
                                { title: "1.4", value: "1.4" },
                                { title: "1.5", value: "1.5" },
                                { title: "1.6", value: "1.6" },
                                { title: "1.7", value: "1.7" },
                                { title: "1.8", value: "1.8" },
                                { title: "1.9", value: "1.9" },
                                { title: "2", value: "2" },
                            ],
                        },
                    },
                ],
            },
            {
                title: "Paragraf",
                name: "modalContent",
                type: "array",
                of: [
                    {
                        type: "textAlignment",
                        name: "textAlignment",
                        title: "Sunum",
                    },
                    {
                        type: "latex",
                        icon: mathInlineIcon,
                        title: "Inline math",
                    },
                    {
                        type: "block",
                        styles: [
                            { title: "Normal", value: "normal" },
                            { title: "H1", value: "h1" },
                            { title: "H2", value: "h2" },
                            { title: "H3", value: "h3" },
                            { title: "Quote", value: "blockquote" },
                        ],
                        marks: {
                            annotations: [
                                {
                                    name: "link",
                                    type: "object",
                                    title: "URL",
                                    fields: [
                                        {
                                            name: "href",
                                            type: "url",
                                            title: "URL",
                                        },
                                    ],
                                },
                                {
                                    name: "fontStyles",
                                    type: "object",
                                    title: "Yazı Stilleri",
                                    blockEditor: {
                                        icon: fontSizeIcon,
                                        render: fontSizeRender,
                                    },
                                    options: {
                                        collapsible: true, // Makes the whole fieldset collapsible
                                        collapsed: true, // Defines if the fieldset should be collapsed by default or not
                                        columns: 1, // Defines a grid for the fields and how many columns it should have
                                        editModal: "popover",
                                    },
                                    fields: [
                                        {
                                            name: "pixels",
                                            type: "number",
                                            title: "Pixels",
                                        },
                                        {
                                            name: "fontFamily",
                                            type: "string",
                                            title: "Yazı Tipi",
                                            options: {
                                                list: fonts,
                                            },
                                        },
                                    ],
                                },
                            ],
                            decorators: [
                                { title: "Strong", value: "strong" },
                                { title: "Emphasis", value: "em" },
                                { title: "Underline", value: "underline" },
                                { title: "Code", value: "code" },
                                { title: "Strike", value: "strike-through" },
                                {
                                    title: "Indented",
                                    value: "indented",
                                    blockEditor: {
                                        render: ({ children }) => (
                                            <p style={{ marginLeft: "2em" }}>
                                                {children}
                                            </p>
                                        ),
                                        icon: () => "|->",
                                    },
                                },
                            ],
                        },
                    },
                    {
                        type: "image",
                        fields: [
                            {
                                name: "width",
                                type: "number",
                                title: "Genişlik",
                                options: { isHighlighted: true },
                            },
                            {
                                name: "height",
                                type: "number",
                                title: "Yükseklik",
                                options: { isHighlighted: true },
                            },
                            {
                                name: "imgPos",
                                type: "string",
                                title: "Resim Pozisyonu",
                                initialValue: "left",
                                options: {
                                    list: [
                                        { title: "Sol", value: "left" },
                                        { title: "Orta", value: "mid" },
                                        { title: "Sağ", value: "right" },
                                    ],
                                    isHighlighted: true,
                                },
                            },
                            {
                                name: "fit",
                                type: "string",
                                options: {
                                    list: [
                                        {
                                            title: "En-Boy oranını koruma",
                                            value: "scale",
                                        },
                                        {
                                            title: "En-Boy oranını koru",
                                            value: "clip",
                                        },
                                    ],
                                    isHighlighted: true,
                                    layout: "radio",
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },

    {
        name: "comment",
        type: "document",
        title: "Yorumlar",
        fields: [
            {
                name: "name",
                type: "string",
                title: "İsim",
                validation: (Rule) =>
                    Rule.required()
                        .max(60)
                        .error("Name can't be longer than 60 characters."),
            },
            {
                title: "Onay Durumu",
                name: "approved",
                type: "boolean",
                description: "Onaylanmayan yorumlar sitede gösterilmez.",
            },
            {
                name: "email",
                type: "string",
                title: "E-Posta",
                validation: (Rule) =>
                    Rule.required()
                        .max(254)
                        .error("Email can't be longer than 60 characters.")
                        .min(5)
                        .error("Email can't be shorter than 5 characters."),
            },
            {
                name: "comment",
                type: "text",
                title: "Yorum",
                validation: (Rule) =>
                    Rule.required()
                        .max(1024)
                        .error("Comment can't be longer than 1024 characters."),
            },
            {
                name: "post",
                type: "string",
                readonly: true,
            },
            {
                name: "replies",
                type: "array",
                title: "Yanıtlar",
                of: [
                    {
                        type: "reference",
                        to: [{ type: "comment" }],
                        weak: true,
                    },
                ],
                readOnly: true,
            },
            {
                name: "parent",
                title: "Ait Olduğu Yorum",
                type: "reference",
                to: [{ type: "comment" }],
                readOnly: true,
            },
        ],
        preview: {
            select: {
                name: "name",
                comment: "comment",
                post: "post",
                email: "email",
            },
            prepare({ name, comment, email }) {
                return {
                    title: `${name} - ${email}`,
                    subtitle: comment,
                };
            },
        },
    },
];
