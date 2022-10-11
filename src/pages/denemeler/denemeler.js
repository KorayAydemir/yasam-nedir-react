import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
const Denemeler = () => {
  const { setTitle } = useOutletContext();

  console.log(setTitle);

  useState(() => {
    setTitle("DENEMELER");
  }, []);
  return <div style={{ textAlign: "center", fontWeight: "bold", marginTop: "10px", fontSize: "20px" }}>Bu sayfa henüz hazır değil!</div>;
};
export default Denemeler;
