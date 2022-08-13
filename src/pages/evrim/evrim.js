import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

const Evrim = () => {
  const { setTitle } = useOutletContext();

  console.log(setTitle);

  useState(() => {
    setTitle("EVRİM KURAMI");
  }, []);
  return <div></div>;
};
export default Evrim;
