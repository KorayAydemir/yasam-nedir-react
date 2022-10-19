import classes from "./DenemelerMain.module.css"
import { useOutletContext } from "react-router-dom"
import { DataDispatchContext, DataContext } from "../Contexts"
import { useContext, useEffect } from "react"

const DenemelerMain = () => {

  const dispatch = useContext(DataDispatchContext)
  const context = useContext(DataContext)
  useEffect(() => {
  })
  const { setTitle } = useOutletContext();
  //  console.log(context)
  setTitle("Test")
  console.log(context)
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
