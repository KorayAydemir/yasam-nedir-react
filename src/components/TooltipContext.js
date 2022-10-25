import { useState, createContext, useEffect } from 'react';
import sanityClient from "../Client"

export const TooltipContext = createContext(null)


export function TooltipProvider({ children }) {
  const [tooltips, setTooltips] = useState([])
  useEffect(() => {
    let subscribed = true;
    sanityClient
      .fetch(`*[_type in ["tooltips"]]{kelimeler}`)
      .then((myData) => {
        if (subscribed) {
          let abc = myData[0].kelimeler.split("\n");
          abc.pop();
          const newWordData = abc.map((word) => {
            return (word = word.split("="));
          })
          setTooltips(newWordData)
          console.log("birimler");
        }
      })
      .catch(console.error);
    console.log("birimler out");
    return () => {
      subscribed = false;
    };
  }, []);
  console.log(tooltips)
  return (
    <TooltipContext.Provider value={tooltips}>
      {children}
    </TooltipContext.Provider>
  )
}



