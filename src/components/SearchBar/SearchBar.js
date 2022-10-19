import classes from "./SearchBar.module.css"
import { useContext, useEffect, useState } from 'react'
import { NavLink } from "react-router-dom"
import { DataContext } from "../Contexts"

const SearchBar = (props) => {
  const dataContext = useContext(DataContext)
  const data1 = dataContext && [...new Set(dataContext.map(item => item.birim_title))];
  const data2 = dataContext && [...new Set(dataContext.map(item => ([item.birim_no, item.bolum_no, item.title])))];
  const activeClassName = classes.active;
  const inactiveClassName = classes.inactive;
  const [isNavOpen, setIsNavOpen] = useState({})

  const [filteredData, setFilteredData] = useState([])
  useEffect(() => { setFilteredData(data2) }, [dataContext])

  const handleFilter = (e) => {
    const searchWord = e.target.value
    if (e.target.value === "") {
      setIsNavOpen(false)
    }
    if (e.target.value !== "") {
      setIsNavOpen({
        "1,2": true,
        "3,4,5": true,
        "6,7,8,9,10,11,12,13": true,
        "14,15,16,17,18,19,20,21": true,
        "26,27,28,29,30,31,32,33": true,
        "34,35,36,37,38": true,
        "39,40,41,42,43,44,45,46,47,48,49,50": true,
        51: true
      }
      )
    }
    const newFilter = data2.filter((value) => {
      return value[2].toLowerCase().includes(searchWord.toLowerCase());
    })

    setFilteredData(newFilter)
  }

  const toggleNav = (id) => {
    setIsNavOpen((p) => ({ ...p, [id]: !p[id] }));
  }

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
  const tree2 = data1 && data1.map((item, i) => {
    return (
      <>
        <div className={classes["arrow-icon"]}>
          <span className={classes["left-bar"]}></span>
          <span className={classes["right-bar"]}></span>
        </div>
        {/*console.log(unique2.filter((e) => { let a = e[0] === i + 1; return a }).map((e) => e[1]))*/}
        <li style={{ lineHeight: "20px", padding: "3px 0" }} key={item}>
          <span onClick={() => toggleNav(filteredData && filteredData.filter((e) => { let a = e[0] === i + 1; return a }).map((e) => e[1]))}> Birim {i + 1}: {item}</span>
        </li>
        <ul> {
          filteredData && filteredData.filter((e) => { let a = e[0] === i + 1; return a }).map((c) => {
            return (<>
              <li
                className={output_obj[c[1]] ? `${classes.navActive}` : `${classes.navInactive}`}
                key={c[1]} style={{ lineHeight: "20px", padding: "3px 0", marginLeft: "20px" }} >
                <div className={classes["arrow-icon2"]}>
                  <span className={classes["left-bar2"]}></span>
                  <span className={classes["right-bar2"]}></span>
                </div>
                <NavLink
                  className={({ isActive }) => isActive ? activeClassName : inactiveClassName}
                  to={`/yasambilim/birim-${c[0]}/bolum-${c[1]}`}>Bölüm {c[1]}: {c[2]}
                </NavLink>
              </li>
            </>
            )
          })
        } </ul>

      </>
    )
  })


  return (
    <div className={classes["input-wrapper"]}>
      <input type="text" placeholder={props.placeholder} onChange={handleFilter} />
      <div>{tree2}</div>
    </div>
  )
}

export default SearchBar
