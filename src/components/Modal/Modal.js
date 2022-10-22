import classes from "./Modal.module.css"
import { useState } from "react"
import { createPortal } from "react-dom"
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../Client";
var Latex = require("react-latex")
const Modal = (props) => {
  const builder = imageUrlBuilder(sanityClient);
  function urlFor(source) {
    return builder.image(source);
  }

  const lineHeight = `${props.data && props.data.lineHeight && props.data.lineHeight.value}rem`
  const serializer = {
    block: (props) => {
      return <> <p className="seperator" style={{ marginTop: "20px", display: "block" }}></p> <p style={{ display: "inline" }}> {props.children} </p> </>
    },
    types: {
      latex: (props) => {
        const sep = <div className="seperator" style={{ marginTop: "20px" }}></div>
        const latex = props && props.value.body;
        let line = props && props.value && props.value.settings.line
        if (props.value.settings.line === "newline") { line = "block" }
        const latexValue = String.raw`${latex}`
        const mid = { display: line, textAlign: "center", fontSize: `${props.value.settings.fontSize}px`, }
        const right = { display: line, textAlign: "right", fontSize: `${props.value.settings.fontSize}px` }
        let latexPos = { display: line, fontSize: `${props.value.settings.fontSize}px` }
        if (props.value.settings.alignment === "right") { latexPos = right }
        else if (props.value.settings.alignment === "center") { latexPos = mid }
        return (<>
          {props.value.settings.line === "newline" && sep}
          <p style={latexPos} className="latex">
            <Latex>{`$$${latexValue}$$`}</Latex>
          </p>
        </>)
      },
      textAlignment: (props) => {
        let alignment = {}
        if (props.value.alignment === "right") { alignment = { textAlign: "right" } }
        else if (props.value.alignment === "center") { alignment = { textAlign: props.value.alignment } }
        return <div style={alignment}><PortableText value={props.value.text} /></div>
      },
      image: (props) => {
        const mid = { margin: "0 auto" }
        const right = { float: "right" }
        let imgPos = { float: "left" }
        if (props.value.imgPos === "right") { imgPos = right }
        else if (props.value.imgPos === "mid") { imgPos = mid }
        return props.value.asset && <div>
          <a
            href={urlFor(props.value.asset._ref).url()}
            target={"_blank"}
            rel="noopener noreferrer"
          >
            <img
              loading="lazy"
              //src={props.img.filter((e) => e !== undefined)}
              src={urlFor(props.value.asset._ref)
                .fit(props.value.fit || "clip")
                .ignoreImageParams()
                .width(props.value.width)
                .height(props.value.height)
                .auto("format")
                .url()}
              alt={"asset"}
              style={imgPos}
              className={classes.image}
            />
          </a>
        </div>
      },
      span: (props) => <span>{props.children}</span>,
    },
    marks: {
      em: ({ children }) => <i> {children} </i>,
      strong: (props) => <strong> {props.children} </strong>,
      underline: (props) => <u> {props.children} </u>,
      // TODO if any mark has props.value.pixels, then set fontSize as that. Else don't set fontsize.
      fontStyles: (props) => {
        let decorator = "";
        if (props.children[0].props) {
          decorator = props.children[0].props.markType;
        }
        const content = ` ${props.text} `;

        if (decorator === "strong") {
          return (
            <strong
              style={{
                fontSize: `${props.value.pixels}px`,
                fontFamily: `${props.value.fontFamily}`,
              }}
            >
              {content}
            </strong>
          );
        }
        if (decorator === "em") {
          return (
            <em
              style={{
                fontSize: `${props.value.pixels}px`,
                fontFamily: `${props.value.fontFamily}`,
              }}
            >
              {content}
            </em>
          );
        }
        if (decorator === "underline") {
          return (
            <u
              style={{
                fontSize: `${props.value.pixels}px`,
                fontFamily: `${props.value.fontFamily}`,
              }}
            >
              {content}
            </u>
          );
        }
        if (decorator === "strike-through") {
          return (
            <s
              style={{
                fontSize: `${props.value.pixels}px`,
                fontFamily: `${props.value.fontFamily}`,
              }}
            >
              {content}
            </s>
          );
        } else {
          return (
            <span
              style={{
                fontSize: `${props.value.pixels}px`,
                fontFamily: props.value.fontFamily
                  ? `${props.value.fontFamily}`
                  : "Literata",
              }}
            >
              {content}
            </span>
          );
        }
      },

      indented: (props) => {
        return <p style={{ marginLeft: "2em" }}>{props.children}</p>;
      },
    },
  };
  const [isModalHidden, setIsModalHidden] = useState(false)
  const Backdrop = (props) => {
    let displayState = props.width === "0%" ? "none" : "unset";
    return (
      <div
        onClick={() => {
          props.onClick();
        }}
        className={classes.backdrop}
        style={{ display: `${displayState}` }}
      >
      </div>
    );
  };
  const modalRootEl = document.getElementById("modal-root")
  const content = (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <div className={classes.title}>
          <span>{props.data && props.data.modalTitle}</span>
          <div className={classes.close} onClick={() => { setIsModalHidden(true) }}></div>
        </div>
        <div style={{ lineHeight: lineHeight }} className={`${classes.text} unset2`} >
          {props.data && <PortableText value={props.data.modalContent} components={serializer} />}
        </div>
      </div>
    </div>)

  return (createPortal(
    <div>
      {!isModalHidden && <Backdrop onClick={() => { setIsModalHidden(true) }} />}
      {!isModalHidden && content}
    </div>,
    modalRootEl
  )
  )
}

export default Modal
