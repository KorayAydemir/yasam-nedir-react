import React from "react"
import S from "@sanity/desk-tool/structure-builder";
import Iframe from "sanity-plugin-iframe-pane";

console.log(S.documentTypeListItems()[0].spec.schemaType.preview);
export const getDefaultDocumentNode = () => {
  return S.document().views([
    S.view.form(),
    S.view
      .component(Iframe)
      .options({
        url: `https://yasamnedir.com/?preview=true`,
        // Optional: Add a reload button, or reload on new document revisions
        reload: {
          button: true, // default `undefined`
          revision: false, // default `undefined`
        },
      })
      .title('Önizleme'),
  ])
}

export default () =>
  S.list()
    .title("İçerik")
    .items([
      ...S.documentTypeListItems(),
      S.divider(),
      S.listItem()
        .title("Tooltips")
        .child(S.document().schemaType("tooltips").documentId("tooltips")),
      S.listItem().title("Genel Ayarlar")
        .child(S.document().schemaType("settings").documentId("settings").views([
          S.view.form(),
          S.view
            .component(Iframe)
            .options({
              url: `https://yasamnedir.com/?preview=true`,
              // Optional: Add a reload button, or reload on new document revisions
              reload: {
                button: true, // default `undefined`
                revision: true, // default `undefined`
              },
            })
            .title('Önizleme'),
        ])),
      S.listItem().
        title("Giriş Modal").
        child(S.document().schemaType("modal").documentId("modal")),
      S.listItem().
        title("Neden ?").
        child(S.document().schemaType("fourth").documentId("fourth"))

    ])

S.view
  .component(Iframe)
  .options({
    url: `https://yasamnedir.web.app`,
    reload: {
      button: true, // default `undefined`
      revision: true, // default `undefined`
    },
  })
  .title("Preview")
