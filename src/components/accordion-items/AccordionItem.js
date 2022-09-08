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
        block: (props) => {
            return <p style={{ marginBottom: "20px" }}> {props.children} </p>
        },
        types: {
            image: (props) => {
                const mid = {margin: "0 auto"}
                const right = {float: "right"}
                let imgPos = {float: "left"}  
                if (props.value.imgPos === "right")  { imgPos = right} 
                else if (props.value.imgPos === "mid") {imgPos = mid}
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
                <div
                    className="new"
                    style={{ marginTop: "10px", fontFamily: "Literata" }}
                ></div>

                <div className="texts">
                    <PortableText value={props.value} components={serializer} />
                </div>
            </div>
        </div>
    );
};
export default AccordionItem;
