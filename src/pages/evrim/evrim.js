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
          setData(data.sort((a, b) => a.index > b.index))
          console.log("evrim");
        }
      })
      .catch(console.error);
    console.log("evrim out");
    return () => {
      subscribed = false;
    };
  }, []);
  useState(() => {
    setTitle("EVRİM KURAMI");
  }, []);
  const content = data && data.map((a) => <Birim key={a.title} notNumbered={true} icon={a.evrim_icon && urlFor(a.evrim_icon)}>{a.index + ": " + a.title}</Birim>)
  return (
    <div className="site-container">
      <section className={classes.main}>
        {content}
      </section>
    </div>
  )
  //<div style={{ textAlign: "center", fontWeight: "bold", marginTop: "10px", fontSize: "20px" }}>Bu sayfa henüz hazır değil!</div>;
};
export default Evrim;
