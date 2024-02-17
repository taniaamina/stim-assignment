import React, { createContext, useState, useContext, Dispatch, SetStateAction } from "react";
import { IKnitPostItem, Props } from "./types";

interface KnittingItemsContextValue {
  knittingItems: IKnitPostItem[];
  setKnittingItems: Dispatch<SetStateAction<IKnitPostItem[]>>;
}

const KnittingItemsContext = createContext<KnittingItemsContextValue | undefined>(undefined);

export const KnittingItemsProvider: React.FC<Props> = ({ children }) => {
  const [knittingItems, setKnittingItems] = useState<IKnitPostItem[]>([]);

  return (
    <KnittingItemsContext.Provider value={{ knittingItems, setKnittingItems }}>
      {children}
    </KnittingItemsContext.Provider>
  );
};

export const useKnittingItemsContext = () => {
  const knittingItemsContext = useContext(KnittingItemsContext);
  if (knittingItemsContext === undefined) {
    throw new Error(
      "useKnittingItemsContext must be used within a KnittingItemsProvider"
    );
  }
  return knittingItemsContext;
};