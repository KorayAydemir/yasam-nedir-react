import React, { useState } from "react";
import { PortableText } from "@portabletext/react";
import sanityClient from "../../Client";
import imageUrlBuilder from "@sanity/image-url";
import classes from "./AccordionItem.module.css";
import "./AccordionItem2.css";
import getYouTubeID from "get-youtube-id";

var Latex = require("react-latex");
const AccordionItem = (props) => {
    const [isActive, setIsActive] = useState(false);
    const builder = imageUrlBuilder(sanityClient);
    function urlFor(source) {
        return builder.image(source);
    }

    const title = props.title;
    const serializer = {
        block: (props) => {
            return (
                <>
                    {" "}
                    <p
                        className="seperator"
                        style={{ marginTop: "20px", display: "block" }}
                    ></p>{" "}
                    <p style={{ display: "inline" }}> {props.children} </p>{" "}
                </>
            );
        },
        types: {
            youtubeEmbed: ({ value }) => {
                const url = value.url;
                const id = getYouTubeID(url);
                const fullUrl = `https://www.youtube.com/embed/${id}`;

                return (
                    <iframe
                        className="aspect-video w-full"
                        title="YouTube Preview"
                        width="900"
                        height="515"
                        src={fullUrl}
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    />
                );
            },
            latex: (props) => {
                const sep = (
                    <div
                        className="seperator"
                        style={{ marginTop: "20px" }}
                    ></div>
                );
                const latex = props && props.value.body;
                let line = props && props.value && props.value.settings.line;
                if (props.value.settings.line === "newline") {
                    line = "block";
                }
                const latexValue = String.raw`${latex}`;
                const mid = {
                    display: line,
                    textAlign: "center",
                    fontSize: `${props.value.settings.fontSize}px`,
                };
                const right = {
                    display: line,
                    textAlign: "right",
                    fontSize: `${props.value.settings.fontSize}px`,
                };
                let latexPos = {
                    display: line,
                    fontSize: `${props.value.settings.fontSize}px`,
                };
                if (props.value.settings.alignment === "right") {
                    latexPos = right;
                } else if (props.value.settings.alignment === "center") {
                    latexPos = mid;
                }
                return (
                    <>
                        {props.value.settings.line === "newline" && sep}
                        <p style={latexPos} className="latex">
                            <Latex>{`$$${latexValue}$$`}</Latex>
                        </p>
                    </>
                );
            },
            textAlignment: (props) => {
                let alignment = {};
                if (props.value.alignment === "right") {
                    alignment = { textAlign: "right" };
                } else if (props.value.alignment === "center") {
                    alignment = { textAlign: props.value.alignment };
                }
                return (
                    <div style={alignment}>
                        <PortableText value={props.value.text} />
                    </div>
                );
            },
            image: (props) => {
                const mid = { margin: "0 auto" };
                const right = { float: "right" };
                let imgPos = { float: "left" };
                if (props.value.imgPos === "right") {
                    imgPos = right;
                } else if (props.value.imgPos === "mid") {
                    imgPos = mid;
                }
                return (
                    props.value.asset && (
                        <div>
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
                    )
                );
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
                        ? `${classes.active} ${classes.unset} unset`
                        : `${classes.inactive} ${classes.unset} unset`
                }
            >
                <div className="new" style={{ fontFamily: "Literata" }}></div>

                <div className="texts">
                    <PortableText value={props.value} components={serializer} />
                </div>
            </div>
        </div>
    );
};
export default AccordionItem;
