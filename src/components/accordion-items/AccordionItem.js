import React, { useState } from "react";
import { PortableText } from "@portabletext/react";
import sanityClient from "../../Client";
import imageUrlBuilder from "@sanity/image-url";
import classes from "./AccordionItem.module.css";

const AccordionItem = (props) => {
  console.log("h");
  const [isActive, setIsActive] = useState(false);
  const builder = imageUrlBuilder(sanityClient);
  function urlFor(source) {
    return builder.image(source);
  }
  console.log(props.value);
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

  /*const [theHtml, setTheHtml] = useState();
	useEffect(() => {
	  setTheHtml(
		document
		  .getElementsByClassName("texts")[0]
		  .innerHTML.replace(
			new RegExp("Elimizde", "gm"),
			"<span>" + "Elimizde" + "</span>"
		  )
	  );
	}, []);
	console.log(theHtml);*/
  // const [words, setWords] = useState();
  // const [baseHtml, setBaseHtml] = useState();
  //useEffect(() => {
  //  sanityClient
  //  .fetch(`*[_type == "tooltips"]`)
  // .then((data) => setWords(data[0].kelimeler.slice(0, 10)))
  // .catch(console.error);

  //setBaseHtml(document.getElementsByClassName("texts")[1].innerHTML);
  /*for (const key of document.getElementsByClassName("texts")) {
		setBaseHtml(key.innerHTML);
	  }*/

  /* document.getElementsByClassName("new")[0].innerHTML = document
		.getElementsByClassName("texts")[0]
		.innerHTML.replace(
		  new RegExp("Elimizde", "gm"),
		  "<span class='tooltip' data-text='Thank for hovering! I'm a tooltip.'>" +
			"Elimizde" +
			"</span>"
		);*/
  /* for (const key of document.getElementsByClassName("texts")) {
		key.hidden = true;
	  }*/
  // }, []);

  //WHAT THE FUCK DID I JUST CODE AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
  /* if (words) {
	  let k = 0;
	  for (const key of document.getElementsByClassName("texts")) {
		let b = 0;
  
		words.map((word) => {
		  word = word.split("=");
		  if (b === 0) {
			document.getElementsByClassName("new")[k].innerHTML =
			  key.innerHTML.replace(
				new RegExp("\\b" + word[0] + "\\b", "gm"),
				`<span class='tooltip' data-text='${word[1]}'>` +
				  word[0] +
				  "</span>"
			  );
			b = b + 1;
		  } else {
			document.getElementsByClassName("new")[k].innerHTML = document
			  .getElementsByClassName("new")
			  [k].innerHTML.replace(
				new RegExp("\\b" + word[0] + "\\b", "gm"),
				`<span class='tooltip' data-text='${word[1]}'>` +
				  word[0] +
				  "</span>"
			  );
		  }
		});
  
		k = k + 1;
	  }
	}*/
  /*a = a.replace(
		  new RegExp(word[0], "gm"),
		  `<span class='tooltip' data-text='${word[1]}'>` + word[0] + "</span>"
		);*/ //REACTIVate THIS
  //  console.log(a);
  // document.getElementsByClassName("new")[1].innerHTML = a; //REACTIVate THIS

  /*  document.getElementsByClassName("new")[0].innerHTML = document
		  .getElementsByClassName("texts")[0]
		  .innerHTML.replace(
			new RegExp(word[0], "gm"),
			`<span class='tooltip' data-text='${word[1]}'>` + word[0] + "</span>"
		  );*/

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
        <div className="new"></div>

        <div className="texts">
          <PortableText value={props.value} components={serializer} />
        </div>
      </div>
    </div>
  );
};
export default AccordionItem;
