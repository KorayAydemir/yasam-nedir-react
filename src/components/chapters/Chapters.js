import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Birim from "../Birim";
import classes from "./Chapters.module.css";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import sanityClient from "../../Client";
import imageUrlBuilder from "@sanity/image-url";
import Navigation from "../Navigation/Navigation";

const Chapters = (props) => {
  const builder = imageUrlBuilder(sanityClient);
  const { setTitle } = useOutletContext();

  const { chapterId } = useParams();
  const currentChapter = chapterId.match(/(\d+)/)[0];
  const [bolumler, setBirimler] = useState(null);

  function urlFor(source) {
    return builder.image(source);
  }

  useEffect(() => {
    let subscribed = true;

    sanityClient
      .fetch(
        `*[_type == "Bolum" ]{bolum_no, title, "birim_title": related_birim->title, "birim_no": related_birim-> birim_no, birim_icon}` /*   `*[_type == "Bolum" ]{bolum_no, title, "birim_title": related_birim->title}`*/
      )
      .then((data) => {
        if (subscribed) {
          setBirimler(
            data
              .sort((a, b) => a.bolum_no - b.bolum_no)
              .filter((a) => a.birim_no === parseInt(currentChapter))
          );
          console.log("bolumler");
        }
      })
      .catch(console.error);
    console.log("bolumler out");
    return () => {
      subscribed = false;
    };
  }, [currentChapter]);
  if (bolumler) {
    setTitle(`BİRİM ${bolumler[0].birim_no}: ${bolumler[0].birim_title}`);
  }
  /*useState(() => {
    setTitle(newTitle);
  }, []);*/

  /*const s = data[currentChapter - 1].sections.map((section) => {
    return (
      <Birim key={section.number} number={section.number}>
        {" " + section.title}
      </Birim>
    );
  });*/
  const content =
    bolumler &&
    bolumler.map((bolum) => {
      return (
        <Birim
          key={bolum.bolum_no}
          number={bolum.bolum_no}
          icon={urlFor(bolum.birim_icon).auto("format").url()}
        >
          {bolum.title}
        </Birim>
      );
    });

  return (
    <>
      <Navigation />
      <div className="site-container">
        <div className={classes.main}>{content}</div>
      </div>
    </>
  );
};
export default Chapters;
