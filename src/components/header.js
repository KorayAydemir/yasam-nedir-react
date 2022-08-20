import React, { useState } from "react";

import classes from "./header.module.css";
import { Link, NavLink, Outlet } from "react-router-dom";
import SideNav from "./SideNav/SideNav";
const Header = () => {
  let activeClassName = classes.active;
  let inactiveClassName = classes.inactive;
  const [title, setTitle] = useState("");
  const [width, setWidth] = useState("0%");

  const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  };

  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  };

  const storedTheme = localStorage.getItem("theme");

  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const defaultDark =
    storedTheme === "dark" || (storedTheme === null && prefersDark);

  if (defaultDark) {
    setDark();
  }

  const toggleTheme = (e) => {
    if (e.target.checked) {
      setDark();
    } else {
      setLight();
    }
  };

  return (
    <div className={classes["header-container"]}>
      <div className="toggle-theme-wrapper">
        <span>☀️</span>
        <label className="toggle-theme" htmlFor="checkbox">
          <input
            type="checkbox"
            id="checkbox"
            // NEW
            onChange={toggleTheme}
            defaultChecked={defaultDark}
          />
          <div className="slider round"></div>
        </label>
        <span>🌒</span>
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
            setWidth("60%");
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
