import React, { useState } from "react";
import { PortableText } from "@portabletext/react";
import sanityClient from "../../Client";
import imageUrlBuilder from "@sanity/image-url";
import classes from "./AccordionItem.module.css";

const AccordionItem = (props) => {
  //console.log("h");
  const [isActive, setIsActive] = useState(false);
  const builder = imageUrlBuilder(sanityClient);
  function urlFor(source) {
    return builder.image(source);
  }
  //  console.log(props.value);
  const title = props.title;
  const serializer = {
    types: {
      image: (props) => (
        <div>
          <a
            href={urlFor(props.value.asset._ref).url()}
            target={"_blank"}
            rel="noopener noreferrer"
          >
            <img
              //src={props.img.filter((e) => e !== undefined)}
              src={urlFor(props.value.asset._ref)
                .fit(props.value.fit || "clip")
                .ignoreImageParams()
                .width(props.value.width)
                .height(props.value.height)
                .url()}
              alt={"asset"}
              className={classes.image}
            />
          </a>
        </div>
      ),
      span: (props) => <span>{props}</span>,
    },
    marks: {
      em: ({ children }) => (
        <i className="text-gray-600 font-semibold">{children}</i>
      ),
      // TODO if any mark has props.value.pixels, then set fontSize as that. Else don't set fontsize.
      fontSize: (props) => (
        <span style={{ fontSize: `${props.value.pixels}px` }}>
          {props.children}
        </span>
      ),

      indented: (props) => {
        return <p style={{ marginLeft: "2em" }}>{props.children}</p>;
      },
    },
  };

  return (
    <div className={classes.wrapper}>
      <span
        className={classes.title}
        onClick={() => {
          setIsActive(!isActive);
        }}
      >
        Bölüm {props.bolum}.{props.altBolum}: {title}
      </span>

      <div
        className={
          isActive
            ? `${classes.active} ${classes.unset} `
            : `${classes.inactive} ${classes.unset}`
        }
      >
        <div className="new" style={{ marginTop: "10px" }}></div>

        <div className="texts">
          <PortableText value={props.value} components={serializer} />
        </div>
      </div>
    </div>
  );
};
export default AccordionItem;
