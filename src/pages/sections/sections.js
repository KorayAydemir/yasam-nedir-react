import React, { useEffect, useState } from "react";
import AccordionItem from "../../components/accordion-items/AccordionItem";
import { useOutletContext, useParams } from "react-router-dom";
import { toPlainText } from "@portabletext/react";

import sanityClient from "../../Client";

const Sections = () => {
  const [altBolum, setAltBolum] = useState([]);
  const { chapterId, sectionId } = useParams();
  const { setTitle } = useOutletContext();
  const currentChapter = chapterId.match(/(\d+)/)[0];
  const currentSection = sectionId.match(/(\d+)/)[0];

  const [wordData, setWordData] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type in ["tooltips", "alt_bolum"]]{kelimeler, alt_bolum_no, title, content, "bolum_title": related_bolum->title, "bolum_no": related_bolum->bolum_no, "birim_no": related_bolum->related_birim->birim_no, "birim_title": related_bolum->related_birim->title}` /*   `*[_type == "Bolum" ]{bolum_no, title, "birim_title": related_birim->title}`*/
      )
      .then((data) => {
        setAltBolum(data);
        let abc = data.filter((a) => a.kelimeler)[0].kelimeler.split("\n");
        abc.pop();
        const newWordData = abc.map((word) => {
          return (word = word.split("="));
        });
        setWordData(newWordData);
      })
      .catch(console.error);
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

  /*
  if (altBolum) {
    if (altBolum[0]) {
      for (const text of altBolum[0].content[0].children) {
        text.text = text.text.replace(
          new RegExp("Yeryüzü", "gm"),
          "<span onmouseover=\"wordsAssigned['" +
            "Yeryüzü" +
            "']()\">" +
            "Yeryüzü" +
            "</span>"
        );
      } //getting the rawtext
    }
  }*/

  /*
  if (altBolum) {
    console.log(
      altBolum.map((a) => {
        return a.content;
      })
    );
  }
*/

  /*
  altBolum && altBolum[0] && console.log(toPlainText(altBolum[0].content));
  if (altBolum) {
    const MetaDescription = (altBolum) => console.log(altBolum);
    MetaDescription();
  } get raw text*/

  /* const [baseHtml, setBaseHtml] = useState();
  useEffect(() => {
    for (const key of document.getElementsByClassName("texts")) {
      setBaseHtml(key.innerHTML);
    }
  }, []); what this even good for ? recently removed*/
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
  console.log(altBolum);
  const content =
    altBolum &&
    altBolum
      .filter((a) => a.birim_no === parseInt(currentSection))
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
      {console.log(content)} {content}
    </div>
  );
};

export default Sections;
