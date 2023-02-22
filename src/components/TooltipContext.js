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
        }
      })
      .catch(console.error);
    return () => {
      subscribed = false;
    };
  }, []);

  return (
    <TooltipContext.Provider value={tooltips}>
      {children}
    </TooltipContext.Provider>
  )
}



