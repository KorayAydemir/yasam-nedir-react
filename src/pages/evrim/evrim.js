import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import classes from "./evrim.module.css"
import Birim from "../../components/Birim"
import sanityClient from "../../Client"
import imageUrlBuilder from "@sanity/image-url";

const Evrim = () => {
  const builder = imageUrlBuilder(sanityClient);

  function urlFor(source) {
    return builder.image(source);
  }
  const { setTitle } = useOutletContext();
  const [data, setData] = useState(null)
  useEffect(() => {
    let subscribed = true;
    sanityClient
      .fetch(`*[_type == "evrim"]{evrim_icon, title, index}`)
      .then((data) => {
        if (subscribed) {
          setData(data)
        }
      })
      .catch(console.error);
    return () => {
      subscribed = false;
    };
  }, []);
  useState(() => {
    setTitle("EVRİM KURAMI");
  }, []);
    console.log('datafromevrim,',data)
  const content = data && data?.sort((a, b) => a.index - b.index)?.map((a) => <Birim key={a.title} notNumbered={true} icon={a.evrim_icon && urlFor(a.evrim_icon)}>{a.index + ": " + a.title}</Birim>)
  return (
    <div className="site-container">
      <section className={classes.main}>
        {content}
      </section>
    </div>
  )
};

export default Evrim;
