import React from "react";
import { Link } from "react-router-dom";
import classes from "./Birim.module.css";

const Birim = (props) => {
  function importAll(r) {
    return r.keys().map(r);
  }

  const images = importAll(
    require.context("./images/birimler", false, /\.(png|jpe?g|svg)$/)
  );

  return (
    <Link
      to={`${props.type === "birim" ? "birim" : "bolum"}-${props.number}`}
      className={classes.card}
    >
      <div className={classes["card-content"]}>
        <div>
          <img src={props.icon} alt="icon" />
        </div>
        <span>
          {props.type === "birim" ? "BİRİM" : "BÖLÜM"} {props.number}:{" "}
          {props.children}
        </span>
      </div>
    </Link>
  );
};
export default Birim;
