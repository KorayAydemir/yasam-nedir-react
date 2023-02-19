import classes from "./SideNav.module.css";
import { NavLink } from "react-router-dom";
import DarkToggle from "../DarkToggle/DarkToggle";

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
const SideNav = (props) => {
  const activeClassName = classes.active;
  const inactiveClassName = classes.inactive;
  return (
    <div>
      <Backdrop
        width={props.width}
        onClick={() => {
          props.closeNav();
        }}
      />
      <div className={classes.sidenav} style={{ width: props.width }}>
        <div className={classes["dark-toggle"]}>
          <DarkToggle place="side-nav" />
        </div>

        <div className={classes.buttonw}>
          <button className={classes.button} onClick={props.closeNav}></button>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeClassName : inactiveClassName
                }
                to="/yasambilim"
              >
                <span onClick={props.closeNav}>YAŞAMBİLİM</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeClassName : inactiveClassName
                }
                to="/evrim"
              >
                <span onClick={props.closeNav}>EVRİM KURAMI</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeClassName : inactiveClassName
                }
                to="/denemeler"
              >
                <span onClick={props.closeNav}>DENEMELER</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeClassName : inactiveClassName
                }
                to="/neden"
              >
                <span onClick={props.closeNav}>NEDEN ?</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default SideNav;
