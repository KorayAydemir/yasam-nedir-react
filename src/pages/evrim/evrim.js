import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import classes from "./evrim.module.css"
import Birim from "../../components/Birim"
import image from "../home/images/c63c19bb811929b7f98aa41ff4cce46c251058e3-155x136.webp"

const Evrim = () => {
  const { setTitle } = useOutletContext();

  useState(() => {
    setTitle("EVRİM KURAMI");
  }, []);

  return (
    <div className="site-container">
      <section className={classes.main}>
        <Birim notNumbered={true} icon={image}>isim</Birim>
        <Birim notNumbered={true} icon={image}>isim</Birim>
      </section>
    </div>
  )
  //<div style={{ textAlign: "center", fontWeight: "bold", marginTop: "10px", fontSize: "20px" }}>Bu sayfa henüz hazır değil!</div>;
};
export default Evrim;
