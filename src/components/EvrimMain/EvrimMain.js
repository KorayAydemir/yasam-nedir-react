import classes from "./EvrimMain.module.css";
import { useState, useEffect, useContext, useRef, Suspense } from "react";
import sanityClient from "../../Client";
import { useOutletContext, useParams } from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { TooltipContext } from "../TooltipContext";
import { Helmet } from "react-helmet";
import CommentSection from "../CommentSection/CommentSection";
import getYouTubeID from "get-youtube-id";

const EvrimMain = () => {
    const tooltips = useContext(TooltipContext);
    var Latex = require("react-latex");
    const { evrimName } = useParams();
    const { setTitle } = useOutletContext();
    const [data, setData] = useState(null);
    const builder = imageUrlBuilder(sanityClient);

    let index = evrimName[0] - 1;

    if (hasNumber(evrimName[1])) {
        index = evrimName.slice(0, 2) - 1;
    } else {
        index = evrimName[0] - 1;
    }

    function hasNumber(myString) {
        return /\d/.test(myString);
    }

    function urlFor(source) {
        return builder.image(source);
    }

    useEffect(() => {
        let subscribed = true;
        sanityClient
            .fetch(`*[_type == "evrim"]{content, title, index}`)
            .then((data) => {
                if (subscribed) {
                    console.log("evrimunsorted", data)
                    let sortedData = data.sort((a, b) => a.index - b.index)
                    setData(sortedData);
                    console.log('evrimmaindata',sortedData)
                }
            })
            .catch(console.error);
        return () => {
            subscribed = false;
        };
    }, []);
    setTitle(data && data[index].title);
    const serializer = {
        block: (props) => {
            return (
                <>
                    <p
                        className="seperator"
                        style={{ marginTop: "20px", display: "block" }}
                    ></p>
                    <p style={{ display: "inline" }}> {props.children} </p>
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
                const line = props && props.value && props.value.settings.line;
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

    for (const key of document.getElementsByClassName("texts")) {
        key.hidden = true;
    }

    if (tooltips) {
        let k = 0;
        for (const key of document.getElementsByClassName("texts")) {
            let temp = key.innerHTML;

            tooltips.forEach((word) => {
                temp = temp.replaceAll(
                    ` ${word[0]} `,
                    ` <span class="tooltip" style="font-size: inherit" data-text='${word[1]}'>${word[0]}</span> `
                );
            });
            document.getElementsByClassName("new")[k].innerHTML = temp;

            k = k + 1;
        }
    }

    return (
        <div className="site-container">
            <Helmet>
                <meta charSet="utf-8" />
                {data && <title>{data[index].title + ` - Yaşam Nedir?`}</title>}
            </Helmet>
            <div className={classes.wrapper}>
                <span className={classes.title}>
                    {data && data[index].title}
                </span>
                <div className="unset" style={{ lineHeight: "2rem" }}>
                    <div className="new"></div>
                    <div className="texts">
                        <PortableText
                            value={data && data[index].content}
                            components={serializer}
                        />
                    </div>
                </div>
            </div>

        {<CommentSection denemeName={evrimName}/>}

        </div>
    );
};

export default EvrimMain;
