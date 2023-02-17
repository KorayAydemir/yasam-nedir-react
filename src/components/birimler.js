import classes from "./birimler.module.css";
import React from "react";
import Birim from "./Birim";
import sanityClient from "../Client";
import imageUrlBuilder from "@sanity/image-url";
import { DataContext } from "./Contexts"
import { useContext } from "react"

import Navigation from "./Navigation/Navigation"

const Birimler = () => {
  const birimler = useContext(DataContext)
  const builder = imageUrlBuilder(sanityClient);


  function urlFor(source) {
    return builder.image(source);
  }

  const seen = new Set();
  const filteredArr = birimler && birimler.filter(el => {
    const duplicate = seen.has(el.birim_title);
    seen.add(el.birim_title);
    return !duplicate;
  });

  filteredArr.shift()

  return (
    <>
      <Navigation />
      <div className="site-container">
        <section className={classes.main}>
          {/*birimler &&
          birimler.map((birim) => (
            <img src={urlFor(birim.birim_icon).width(200).url()} />
          ))*/}
          {birimler &&
            filteredArr.map((birim) => (
              <Birim
                type="birim"
                key={birim.birim_no}
                number={birim.birim_no}
                icon={urlFor(birim.birim_icon).auto("format").url()}
              >
                {birim.birim_title}
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
    </>

  );
};
export default Birimler;
