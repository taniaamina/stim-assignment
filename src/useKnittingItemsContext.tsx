import React, { useState } from 'react'
import { IPostItem } from "./types";

interface Props {
  children: React.ReactNode;
}

interface KnittingItemsContextValue {
  knittingItems: Array<IPostItem>
  setKnittingItems: React.Dispatch<React.SetStateAction<IPostItem[]>>;
}

const KnittingItemsContext = React.createContext<KnittingItemsContextValue 
| undefined>(undefined);


export const KnittingItemsProvider: React.FC<Props> = ({children}) => {
  const [knittingItems, setKnittingItems] = useState<IPostItem[]>([{item: '', yarn: '', needles: '', link: '', id: '', isComplete: false}]);
  return (
    <KnittingItemsContext.Provider value={{knittingItems, setKnittingItems}}>
      {children}
    </KnittingItemsContext.Provider>
  );
};


export const useKnittingItemsContext = () => {
  const knittingItemsContext = React.useContext(KnittingItemsContext);
  if (KnittingItemsContext === undefined) {
    throw new Error('useKnittingItemsContext must be inside a KnittingItemsProvider');
  }
  return knittingItemsContext;
};