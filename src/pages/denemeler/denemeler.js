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
      .fetch(`*[_type == "denemeler"]{title, deneme_icon, index}`)
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



  console.log(data)
  const content = data?.sort((a, b) => a.index - b.index)?.map((a) => (
    <Birim notNumbered={true}
      key={a.title} icon={a.deneme_icon && urlFor(a.deneme_icon)}>
      {a.index + ": " + a.title}
    </Birim>
  ))

  return (
    <div className="site-container">
      <section className={classes.main}>
        {content}
      </section>
    </div>
  )
};
export default Denemeler;
