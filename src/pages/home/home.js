import bg from "./images/Yasamnedir2.jpg";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import classes from "./home.module.css";
import Button from "../../globals/button/button";
import octopus from "./images/ahto.png";
import sanityClient from "../../Client"
import { PortableText } from "@portabletext/react";

const Home = () => {
    let [paragraph, setParagraph] = useState([]);
    useEffect(() => {
        let subscribed = true;
        sanityClient
            .fetch(
                `*[_type in ["settings"]]`
            )
            .then((data) => {
                if (subscribed) {
                    setParagraph(data)
                }
            })
            .catch(console.error);
        console.log("accordion out");
        return () => {
            subscribed = false;
        };
    }, []);

    const serializer = {
        block: (props) => {
            if (paragraph[0].lineHeight.value) {
                return <p style={{ marginBottom: "20px", lineHeight: paragraph[0].lineHeight.value }}> {props.children} </p>
            }
            else {
                return <p style={{ marginBottom: "20px", lineHeight: "1.2rem" }}> {props.children} </p>
            }
        },
        marks: {
            em: ({ children }) => <i> {children} </i>,
            strong: (props) => <strong> {props.children} </strong>,
            underline: (props) => <u> {props.children} </u>,
            // TODO if any mark has props.value.pixels, then set fontSize as that. Else don't set fontsize.homecs
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
        }
    }
    return (
        <div className={classes["bg-container"]}>

            <img className={classes.bg} src={bg} alt="background" />
            <div className={classes["octopus-wrapper"]}>
                <img className={classes.octopus} src={octopus} alt="octopus" />
            </div>
            <div className={classes["text-container"]}>
                {paragraph && paragraph[0] && <PortableText value={paragraph[0].homeContent} components={serializer} />}
                <div className={classes.buttons}>
                    <Link to="/yasambilim">
                        <Button color="#6ab165">YAŞAMBİLİM</Button>
                    </Link>
                    <Link to="/evrim">
                        <Button color="#e7432b">EVRİM KURAMI</Button>
                    </Link>
                    <Link to="/denemeler">
                        <Button color="#486769">DENEMELER</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default Home;
