import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Birimler from "../../components/birimler";
import sanityClient from "../../Client";
import Navigation from "../../components/Navigation/Navigation"
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
  const getData = data => {
    console.log(data)
  }
  return (
    <>
      {/*categories && categories[0].title*/}
      <Birimler data={getData} />
    </>
  );
};
export default Yasambilim;
