import React, { useState, useEffect } from "react";
import { getKnittingItems, deleteData, editKnittingItem } from "../functions.ts";
import { useKnittingItemsContext } from "../useKnittingItemsContext.tsx";
import { IPostItem } from "../types";
import KnitItem from "./KnitItem.tsx";


const data = {isComplete: false};

const StoredItems: React.FunctionComponent = () => {   
    const {knittingItems, setKnittingItems} = useKnittingItemsContext();

  useEffect(() => {
    getKnittingItems(setKnittingItems)
  }, [])


return (
    <div>
        <h2>Knitted items</h2>
        <div className="flex">
        {knittingItems.map((item, key) =>
            <KnitItem key={key} item={item.item} link={item.link} needles={item.needles} id={item._id} yarn={item.yarn} />
        )}
        </div>
    </div>
  );
};
export default StoredItems;
