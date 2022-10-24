import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Birimler from "../../components/birimler";
import Modal from "../../components/Modal/Modal";
const Yasambilim = () => {
  const { setTitle } = useOutletContext();

  useState(() => {
    setTitle("YAŞAMBİLİM");
  }, []);

  /* const [categories, setCategories] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "article"]{
        title,
        slug,
      }`
      )
      .then((data) => setCategories(data))
      .catch(console.error);
  }, []); dont make unnecessary requests*/
  return (
    <>
      <Modal />
      {/*categories && categories[0].title*/}
      <Birimler />
    </>
  );
};
export default Yasambilim;
