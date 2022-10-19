import { useState, createContext, useEffect, useReducer } from 'react';
import sanityClient from "../Client"

export const DataContext = createContext(null)
export const DataDispatchContext = createContext(null);


export function DataProvider({ children }) {
  const [data, dispatch] = useReducer(dataReducer, initialData)
  const [birimler, setBirimler] = useState(null)
  function dataReducer(data, action) {
    switch (action.type) {
      case 'birim-bolum': {
        return ["a"]
      }
      case 'alt-bolum': {
        return action
      }
      case 'denemeler': {
        return { obj: "abc" }
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }
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
      <DataDispatchContext.Provider value={dispatch}>
        {children}
      </DataDispatchContext.Provider>
    </DataContext.Provider>
  )
}



const initialData = {} 
