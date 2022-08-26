import React, { useEffect, useState } from "react";
import AccordionItem from "../../components/accordion-items/AccordionItem";
import { useOutletContext, useParams } from "react-router-dom";

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
    sanityClient
      .fetch(
        `*[_type in ["tooltips", "alt_bolum"]]{kelimeler, alt_bolum_no, title, content, "bolum_title": related_bolum->title, "bolum_no": related_bolum->bolum_no, "birim_no": related_bolum->related_birim->birim_no, "birim_title": related_bolum->related_birim->title}` /*   `*[_type == "Bolum" ]{bolum_no, title, "birim_title": related_birim->title}`*/
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
  try {
    setTitle(
      `BİRİM ${currentChapter}: ${altBolum[0].birim_title} / BÖLÜM ${currentSection}: ${altBolum[0].bolum_title} `
    );
  } catch (e) {
    console.log("YO", e);
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
  const content =
    altBolum &&
    altBolum
      .filter((a) => a.bolum_no === parseInt(currentSection))
      .sort((a, b) => a.alt_bolum_no - b.alt_bolum_no)
      .map((a) => (
        <AccordionItem
          title={a.title}
          key={a.alt_bolum_no}
          bolum={currentSection}
          altBolum={a.alt_bolum_no}
          value={a.content}
          img={a.content.filter((c) => {
            return c.asset && c.asset;
          })} /*a.content.map((c) => {
            return c.asset && urlFor(c.asset).url();
          })*/
        ></AccordionItem>
      ));

  return (
    <div className="site-container" style={{ marginTop: " 30px" }}>
      {content}
    </div>
  );
};

export default Sections;
