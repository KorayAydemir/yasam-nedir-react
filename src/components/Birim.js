import React from "react";
import { Link } from "react-router-dom";
import classes from "./Birim.module.css";

const Birim = (props) => {
  if (props.notNumbered) {
    let slug = `${props.children}`.toLowerCase().split(" ").join("-")
    { console.log() }
    return (
      <Link
        to={slug}
        className={classes.card}
      >
        <div className={classes["card-content"]}>
          <div>
            <img src={props.icon} alt="icon" />
          </div>
          <span>
            {props.children}
          </span>
        </div>
      </Link>
    )
  }
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
