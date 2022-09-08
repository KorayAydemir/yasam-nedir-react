import React, { useEffect, useState } from "react";
import AccordionItem from "../../components/accordion-items/AccordionItem";
import { useOutletContext, useParams } from "react-router-dom";
import classes from "./sections.module.css"

import sanityClient from "../../Client";

const Sections = () => {
    const [altBolum, setAltBolum] = useState([]);
    const { chapterId, sectionId } = useParams();
    const { setTitle } = useOutletContext();
    const currentChapter = chapterId.match(/(\d+)/)[0];
    const currentSection = sectionId.match(/(\d+)/)[0];

    const [wordData, setWordData] = useState([]);

    useEffect(() => {
        let subscribed = true;
        /* `*[_type in ["tooltips", "Bolum","alt_bolum" ]]{kelimeler, bolum_no, alt_bolum_no, title, content, "bolum_title": related_bolum->title, "bolum_no": related_bolum->bolum_no, "birim_no": related_bolum->related_birim->birim_no, "birim_title": related_bolum->related_birim->title}` */
        sanityClient
            .fetch(
                `*[_type in ["tooltips",  "Bolum"]]{kelimeler, alt_bolumler, bolum_no, "bolum_title": title, "birim_no": related_birim->birim_no, "birim_title": related_birim->title}`
            )
            .then((data) => {
                if (subscribed) {
                    console.log("accordion");
                    setAltBolum(data);
                    let abc = data.filter((a) => a.kelimeler)[0].kelimeler.split("\n");
                    abc.pop();
                    const newWordData = abc.map((word) => {
                        return (word = word.split("="));
                    });
                    setWordData(newWordData);
                }
            })
            .catch(console.error);
        console.log("accordion out");
        return () => {
            subscribed = false;
        };
    }, []);
    //altBolum && console.log(altBolum);
    // wordData && console.log(wordData);
    // tesjdt
    if (altBolum && altBolum[0]) {
        const content =
        altBolum[0] &&
        altBolum
            .filter((a) => a.bolum_no === parseInt(currentSection))
            .sort((a, b) => a.alt_bolum_no - b.alt_bolum_no)[0]
        setTitle(
            `BİRİM ${currentChapter}: ${content.birim_title} / BÖLÜM ${currentSection}: ${content.bolum_title}`
        );
    }

    for (const key of document.getElementsByClassName("texts")) {
        key.hidden = true;
    }

    if (altBolum) {
        let k = 0;
        for (const key of document.getElementsByClassName("texts")) {
            let temp = key.innerHTML;

            wordData.forEach((word) => {
                temp = temp.replaceAll(
                    ` ${word[0]} `,
                    ` <span class="tooltip" style="font-size: inherit" data-text='${word[1]}'>${word[0]}</span> `
                );
            });
            document.getElementsByClassName("new")[k].innerHTML = temp;

            k = k + 1;
        }
    }
    /*  altBolum &&
      console.log(
        altBolum.filter((a) => a.bolum_no === parseInt(currentSection))[0]
          .alt_bolumler
      );*/
    const content =
        altBolum[0] &&
        altBolum
            .filter((a) => a.bolum_no === parseInt(currentSection))
            .sort((a, b) => a.alt_bolum_no - b.alt_bolum_no)[0]
            .alt_bolumler.map((a) => (
                <AccordionItem
                    title={a.title}
                    key={a.alt_bolum_no}
                    bolum={currentSection}
                    altBolum={a.alt_bolum_no}
                    value={a.content && a.content}
                    img={a.content && a.content.filter((c) => {
                            if (c.asset){return c.asset}
                    })} /*a.content.map((c) => {
             return c.asset && urlFor(c.asset).url();
           })*/
                ></AccordionItem>
            ));

    return (
        <div className={`site-container ${classes.accordions}`} style={{ marginTop: " 30px" }}>
            {content}
        </div>
    );
};

export default Sections;
