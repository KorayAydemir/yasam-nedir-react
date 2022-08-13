import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
const Denemeler = () => {
  const { setTitle } = useOutletContext();

  console.log(setTitle);

  useState(() => {
    setTitle("DENEMELER");
  }, []);
  return <div></div>;
};
export default Denemeler;
