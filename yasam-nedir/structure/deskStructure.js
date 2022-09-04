import S from "@sanity/desk-tool/structure-builder";

console.log(S.documentTypeListItems()[0].spec.schemaType.preview);

export default () =>
  S.list()
    .title("İçerik")
    .items([
      ...S.documentTypeListItems(),
      S.divider(),
      S.listItem()
        .title("Tooltips")
        .child(S.document().schemaType("tooltips").documentId("tooltips")),
      S.listItem()
        .title("Genel Ayarlar")
        .child(S.document().schemaType("settings").documentId("settings")),
    ]);
