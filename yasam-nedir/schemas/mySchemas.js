import React from "react";

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

const fontFamilyRender = (props) => (
  <span style={{ fontFamily: "" }}>{props.children}</span>
);

/*const TitleStyle = (props) => (
  <span style={{ fontFamily: "Garamond", fontSize: "2em" }}>
    {props.children}
  </span>
);*/

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
        description: "Her bölüm bir birim ile ilişkilendirilmek zorundadır.",
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
        media: "related_bolum.birim_icon",
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
                  blockEditor: { icon: fontSizeIcon, render: fontSizeRender },
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
                        list: [
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
                        ],
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
                      <p style={{ marginLeft: "2em" }}>{children}</p>
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
                name: "fit",
                type: "string",
                options: {
                  list: [
                    { title: "En-Boy oranını koruma", value: "scale" },
                    { title: "En-Boy oranını koru", value: "clip" },
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
];
