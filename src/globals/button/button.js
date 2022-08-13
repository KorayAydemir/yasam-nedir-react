import classes from "./button.module.css";
import React from "react";

const Button = (props) => {
  let color = `${props.color}`;
  return (
    <span
      className={classes.button}
      style={{ backgroundColor: color, borderColor: color }}
    >
      {props.children}
    </span>
  );
};
export default Button;
