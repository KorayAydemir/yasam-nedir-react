import { useState, createContext, useEffect, useReducer } from 'react';
import sanityClient from "../Client"

export const DataContext = createContext()
export const DataDispatchContext = createContext(null);


function dataReducer(state, action) {
  switch (action.type) {
    case 'birim-bolum': {
      return ["a"]
    }
    case 'alt-bolum': {
      return action
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export function DataProvider({ children }) {
  const [dataState, dispatch] = useReducer(dataReducer, { data: [] })
  return (
    <DataContext.Provider value={dataContext}>
      <DataDispatchContext.Provider value={dispatch}>
        {children}
      </DataDispatchContext.Provider>
    </DataContext.Provider>
  )
}

