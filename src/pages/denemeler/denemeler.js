import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import classes from "./denemeler.module.css"
import Birim from "../../components/Birim"
import imageUrlBuilder from "@sanity/image-url";

import sanityClient from "../../Client"
const Denemeler = () => {
  const { setTitle } = useOutletContext();
  const [data, setData] = useState(null)

  useState(() => {
    setTitle("DENEMELER");
  }, []);


  const builder = imageUrlBuilder(sanityClient);

  function urlFor(source) {
    return builder.image(source);
  }

  useEffect(() => {
    let subscribed = true;
    sanityClient
      .fetch(`*[_type == "denemeler" ]`)
      .then((data) => {
        if (subscribed) {
          setData(data);
          console.log("denemeler");
        }
      })
      .catch(console.error);
    console.log("denemleer out");
    return () => {
      subscribed = false;
    };
  }, []);


  const content = data && data.map((a) => (<Birim notNumbered={true}
    key={a.title} icon={urlFor(a.deneme_icon)}>{a.title}</Birim>))
  return (
    <div className="site-container">
      <section className={classes.main}>
        {content}
      </section>
    </div>
  )
};
export default Denemeler;
