import classes from "./Navigation.module.css"
import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar"

const Navigation = (props) => {
  const [isMenuShown, setIsMenuShown] = useState(false)

  const Backdrop = (props) => {
    let displayState = props.width === "0%" ? "none" : "unset";
    return (
      <div
        onClick={() => {
          props.onClick();
        }}
        className={classes.backdrop}
        style={{ display: `${displayState}` }}
      ></div>
    );
  };
  const burgerState = isMenuShown ? classes.change : ""
  let width = isMenuShown ? classes.width : ""

  return (
    <>
      {isMenuShown && <Backdrop onClick={() => { setIsMenuShown(false) }} />}
      <div className={classes.navigation}> {/*classes.navigation*/}
        <button onClick={() => { setIsMenuShown(p => !p); }} className={`${classes.button} ${burgerState}`}>
          <div className={classes.burger1}></div>
          <div className={classes.burger2}></div>
          <div className={classes.burger3}></div>
        </button>
        <nav>
          <ul>
            <div className={classes.head}>
              <span>Bütün Bölümler</span>
            </div>
            {<div className={`${classes["mobile-tree"]} ${width}`}>

              <SearchBar placeholder="Bölüm Ara..." />
            </div>}
          </ul>
        </nav>
      </div>
    </>
  )
}
export default Navigation
