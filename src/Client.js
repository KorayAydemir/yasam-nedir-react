import sanityClient from "@sanity/client";

console.log(window.location.href)
let preview = false
if (window.location.href.includes("?preview=true")) {
  console.log("it does")
  preview = true
}
else {
  console.log("no")
  preview = false
}
export default sanityClient({
  projectId: "9cr46sy3", // find this at manage.sanity.io or in your sanity.json
  dataset: "production", // this is from those question during 'sanity init'
  useCdn: true,
  apiVersion: "2021-08-31",
  withCredentials: preview,
});


export const clientForPreview = sanityClient({
  projectId: "9cr46sy3", // find this at manage.sanity.io or in your sanity.json
  dataset: "production", // this is from those question during 'sanity init'
  useCdn: true,
  apiVersion: "2021-08-31",
  withCredentials: true,
});

