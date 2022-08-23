import classes from "./birimler.module.css";
import React from "react";
import Birim from "./Birim";
import { useState } from "react";
import { useEffect } from "react";
import sanityClient from "../Client";
import imageUrlBuilder from "@sanity/image-url";

const Birimler = () => {
  const builder = imageUrlBuilder(sanityClient);

  const [birimler, setBirimler] = useState(null);
  useEffect(() => {
    let subscribed = false;
    sanityClient
      .fetch(`*[_type == "Birim"]`)
      .then((data) => {
        if (subscribed) {
          setBirimler(data.sort((a, b) => a.birim_no - b.birim_no));
          console.log("a");
        }
      })
      .catch(console.error);
    return () => {
      subscribed = true;
    };
  }, []);

  function urlFor(source) {
    return builder.image(source);
  }
  return (
    <div className="site-container">
      <section className={classes.main}>
        {/*birimler &&
          birimler.map((birim) => (
            <img src={urlFor(birim.birim_icon).width(200).url()} />
          ))*/}
        {birimler &&
          birimler.map((birim) => (
            <Birim
              type="birim"
              key={birim.birim_no}
              number={birim.birim_no}
              icon={urlFor(birim.birim_icon).url()}
            >
              {birim.title}
            </Birim>
          ))}
        {/*<Birim number={"2"} type="birim">
          Yaşamın Kamığı
        </Birim>
        <Birim number={"3"} type="birim">
          Göze
        </Birim>
        <Birim number={"4"} type="birim">
          Kalıtıbilim
        </Birim>
        <Birim number={"5"} type="birim">
          Evrimin İşlergeleri
        </Birim>
        <Birim number={"6"} type="birim">
          Yaşamsal Çeşitliliğin Evrimsel Geçmişi
        </Birim>
        <Birim number={"7"} type="birim">
          Bitki Biçimi ve İşlevi
        </Birim>
        <Birim number={"8"} type="birim">
          Andık Biçimi ve İşlevi
        </Birim>
        <Birim number={"8"} type="birim">
          Andık Biçimi ve İşlevi
        </Birim>*/}
      </section>
    </div>
  );
};
export default Birimler;
