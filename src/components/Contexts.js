import { useState, createContext, useEffect } from 'react';
import sanityClient from "../Client"

export const DataContext = createContext(null)


export function DataProvider({ children }) {
  const [birimler, setBirimler] = useState(null)
  useEffect(() => {
    let subscribed = true;
    sanityClient
      .fetch(`*[_type == "Bolum" ]{bolum_no, title, "birim_title": related_birim->title, "birim_no": related_birim-> birim_no, "birim_icon": related_birim->birim_icon, }`)
      .then((myData) => {
        if (subscribed) {
          setBirimler(myData.sort((a, b) => a.birim_no - b.birim_no));
          console.log("birimler");
        }
      })
      .catch(console.error);
    console.log("birimler out");
    return () => {
      subscribed = false;
    };
  }, []);
  return (
    <DataContext.Provider value={birimler}>
      {children}
    </DataContext.Provider>
  )
}



