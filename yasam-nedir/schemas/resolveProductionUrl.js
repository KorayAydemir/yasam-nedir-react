import sanityClient from "../../src/Client";
function useGetData(dataa) {
  //    sanityClient
  //   .fetch(
  //     `*[_type == "Bolum" ]{"birim_no": related_birim-> birim_no }` /*   `*[_type == "Bolum" ]{bolum_no, title, "birim_title": related_birim->title}`*/
  //   )
  //   .then((data) => {
  //     dataa = data;
  //   })
  //   .catch(console.error);
  // return dataa;
  //
}
export default function resolveProductionUrl(document) {
  //  const query = `*[_id == "${document._id}"]{'birim_no': related_birim-> birim_no}`;
  //  async function fetch() {
  //    window.myData = await sanityClient.fetch(query);
  //  }
  //  fetch();
  //  if (window.myData && window.myData[0]) {
  //    if (document._type === "Bolum") {
  //      return `https://yasamnedir.web.app/yasambilim/birim-${window.myData[0].birim_no}/bolum-${document.bolum_no}`;
  //    }
  //  }
  //
  //  if (document._type === "Birim") {
  //    return `https://yasamnedir.web.app/yasambilim/${document._type.toLowerCase()}-${
  //      document.birim_no
  //    }`;
  //  }
}
