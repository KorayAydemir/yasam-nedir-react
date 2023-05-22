import React from "react";
import S from "@sanity/desk-tool/structure-builder";
import Iframe from "sanity-plugin-iframe-pane";
import sanityClient from "@sanity/client";

const ignoredDocTypes = ["comment"];
const restOfTheDocs = (S) => [
    ...S.documentTypeListItems().filter(
        (listItem) => !ignoredDocTypes.includes(listItem.getId() ?? "")
    ),
];

const options = {
    projectId: "9cr46sy3", // find this at manage.sanity.io or in your sanity.json
    dataset: "production", // this is from those question during 'sanity init'
    useCdn: false,
    apiVersion: "2023-05-07",
    withCredentials: true,
};

const client = sanityClient(options);

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
            .title("Önizleme"),
    ]);
};

export default async () =>
    S.list()
        .title("İçerik")
        .items([
            ...restOfTheDocs(S),
            S.listItem()
                .title("Yorumlar")
                .child(
                    S.list()
                        .title("Status")
                        .items(await commentFilters(S))
                ),
            S.divider(),
            S.listItem()
                .title("Tooltips")
                .child(
                    S.document().schemaType("tooltips").documentId("tooltips")
                ),
            S.listItem()
                .title("Genel Ayarlar")
                .child(
                    S.document()
                        .schemaType("settings")
                        .documentId("settings")
                        .views([
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
                                .title("Önizleme"),
                        ])
                ),

            S.listItem()
                .title("Giriş Modal")
                .child(S.document().schemaType("modal").documentId("modal")),
            S.listItem()
                .title("Neden ?")
                .child(S.document().schemaType("fourth").documentId("fourth")),
        ]);

S.view
    .component(Iframe)
    .options({
        url: `https://yasamnedir.web.app`,
        reload: {
            button: true, // default `undefined`
            revision: true, // default `undefined`
        },
    })
    .title("Preview");

const commentFilters = async (S) => {
    let slugs = new Set();
    slugs = await client.fetch('*[_type == "comment"].post');
    let uniqueSlugs = [...new Set(slugs)];

    const postsThatHaveComments = (approvedStatus) =>
        uniqueSlugs.map((slug) => {
            return S.listItem()
                .title(slug)
                .child(() =>
                    S.documentList()
                        .title("Yorumlar")
                        .filter(
                            `_type == "comment" && post == "${slug}"  && ${approvedStatus}`
                        )
                );
        });

    console.log(uniqueSlugs);
    return [
        S.listItem()
            .title("Bekleyen")
            .child(
                S.list()
                    .title("Posts")
                    .items(postsThatHaveComments("!defined(approved)"))
            ),
        S.listItem()
            .title("Reddedilmiş")
            .child(
                S.list()
                    .title("Posts")
                    .items(postsThatHaveComments("approved == false"))
            ),
        S.listItem()
            .title("Kabul Edilmiş")
            .child(
                S.list()
                    .title("Posts")
                    .items(postsThatHaveComments("approved == true"))
            ),
    ];
};
