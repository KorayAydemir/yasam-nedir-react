import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import classes from "./denemeler.module.css"
import Birim from "../../components/Birim"
import image from "../home/images/c63c19bb811929b7f98aa41ff4cce46c251058e3-155x136.webp"
const Denemeler = () => {
  const { setTitle } = useOutletContext();

  console.log(setTitle);

  useState(() => {
    setTitle("DENEMELER");
  }, []);
  return (
    <div className="site-container">
      <section className={classes.main}>
        <Birim notNumbered={true} icon={image}>isim</Birim>
        <Birim notNumbered={true} icon={image}>isim</Birim>
        <Birim notNumbered={true} icon={image}>isim</Birim>
      </section>
    </div>
  )
};
export default Denemeler;
