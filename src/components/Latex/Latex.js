const Latex = (props) => {
    var Latex = require("react-latex")
    return <div style={{fontSize: "inherit"}}><Latex>{props.value}</Latex></div>
}
export default Latex
