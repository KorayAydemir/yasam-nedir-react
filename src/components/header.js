import React, { useState } from "react";

import classes from "./header.module.css";
import { Link, NavLink, Outlet } from "react-router-dom";
import SideNav from "./SideNav/SideNav";
import DarkToggle from "./DarkToggle/DarkToggle";
const Header = () => {
  let activeClassName = classes.active;
  let inactiveClassName = classes.inactive;
  const [title, setTitle] = useState("");
  const [width, setWidth] = useState("0%");

  return (
    <div className={classes["header-container"]}>
      <div className={classes["dark-toggle-hide"]}>
        <DarkToggle place="header" />
      </div>

      <section className={classes.header}>
        <SideNav
          width={width}
          closeNav={() => {
            setWidth("0%");
          }}
        />
        <button
          className={classes["sidenav-button"]}
          onClick={() => {
            setWidth("260px");
          }}
        ></button>
        <h1>
          <Link to="/">
            <span className={classes.logo}>YAŞAM NEDİR?</span>
          </Link>
        </h1>

        <div className={classes["menu-container"]}>
          <nav className={classes.menu}>
            <ul>
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeClassName : inactiveClassName
                }
                to="/yasambilim"
              >
                <li className={classes["menu-item-1"]}>
                  <span>YAŞAMBİLİM</span>
                </li>
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive ? activeClassName : inactiveClassName
                }
                to="/evrim"
              >
                <li className={classes["menu-item-2"]}>
                  <span>EVRİM KURAMI</span>
                </li>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeClassName : inactiveClassName
                }
                to="/denemeler"
              >
                <li className={classes["menu-item-3"]}>
                  <span>DENEMELER</span>
                </li>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeClassName : inactiveClassName
                }
                to="/neden"
              >
                <li className={classes["menu-item-3"]}>
                  <span>NEDEN</span>
                </li>
              </NavLink>
            </ul>
          </nav>
        </div>
      </section>
      <section className={classes["header-bottom"]}>
        <span className="site-container">{title}</span>
      </section>
      <Outlet context={{ setTitle }} />
    </div>
  );
};

export default Header;
