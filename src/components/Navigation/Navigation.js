import classes from "./Navigation.module.css"
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Navigation = (props) => {
  const activeClassName = classes.active;
  const inactiveClassName = classes.inactive;
  const [isNavOpen, setIsNavOpen] = useState({})
  const toggleNav = (id) => {
    setIsNavOpen((p) => ({ ...p, [id]: !p[id] }));
  }
  //  Object.keys(isNavOpen).length;
  //  let i = ""
  //  for (const p in isNavOpen) {
  //    i += p + " : " + isNavOpen[p] + ", "
  //    console.log(i)
  //    const obj = {}, re = new RegExp('(.*?):(.*?)(?:,|$)', 'g')
  //
  //    i.replace(re, (_, key, value) => obj[key.trim()] = value.trim())
  //
  //    console.log(obj)
  //  }

  let output_obj = {}
  // iterate over object properties
  for (const [k, v] of Object.entries(isNavOpen)) {
    // split key string to string array
    let keys = k.split(',')
    // iterate over string array, validating each value's actually a number
    for (const key of keys) {
      // skip if not an integer
      let i = parseInt(key)
      if (isNaN(i)) {
        continue
      }
      // assign to array
      output_obj[i] = v
    }
  }
  console.log("data in nav:", props.data)
  const unique = props.data && [...new Set(props.data.map(item => item.birim_title))];
  const unique2 = props.data && [...new Set(props.data.map(item => ([item.birim_no, item.bolum_no, item.title])))];
  const tree2 = unique && unique.map((item, i) => {
    return (
      <>
        {/*console.log(unique2.filter((e) => { let a = e[0] === i + 1; return a }).map((e) => e[1]))*/}
        <li style={{ lineHeight: "20px", padding: "3px 0" }} key={item}>
          <span onClick={() => toggleNav(unique2.filter((e) => { let a = e[0] === i + 1; return a }).map((e) => e[1]))}> Birim {i + 1}: {item}</span>
        </li>
        <ul> {
          unique2.filter((e) => { let a = e[0] === i + 1; return a }).map((c) => {
            return (
              <li
                className={output_obj[c[1]] ? `${classes.navActive}` : `${classes.navInactive}`}
                key={c[1]} style={{ lineHeight: "20px", padding: "3px 0", marginLeft: "20px" }} >
                <NavLink
                  className={({ isActive }) => isActive ? activeClassName : inactiveClassName}
                  to={`/yasambilim/birim-${c[0]}/bolum-${c[1]}`}>Bölüm {c[1]}: {c[2]}
                </NavLink>
              </li>
            )
          })
        } </ul>

      </>
    )
  })
  return <div className={classes.navigation}>
    <nav>
      <ul>
        {tree2}
      </ul>
    </nav>
  </div>
}
export default Navigation
