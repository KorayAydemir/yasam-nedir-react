import classes from "./DenemelerMain.module.css"
import { useOutletContext } from "react-router-dom"
import { DataDispatchContext, DataContext } from "../Contexts"
import { useContext, useEffect, useState } from "react"
import sanityClient from "../../Client"

const DenemelerMain = () => {
  const context = useContext(DataContext)
  const { setTitle } = useOutletContext();
  const [data, setData] = useState(null)
  //  console.log(context)
  setTitle("Test")
  useEffect(() => {
    let subbed = true
    sanityClient
      .fetch(`*[_type == "Bolum" ]{bolum_no, title, "birim_title": related_birim->title, "birim_no": related_birim-> birim_no, "birim_icon": related_birim->birim_icon, }`)
      .then((data) => { if (subbed) { console.log("ran"); setData(data) } })
    return () => {
      subbed = false
    }
  }, [])
  console.log(context.data)
  return (
    <div className="site-container">
      <div className={classes.wrapper}>
        <span className={classes.title}>
          Test
        </span>
      </div>
    </div>
  )
}

export default DenemelerMain
