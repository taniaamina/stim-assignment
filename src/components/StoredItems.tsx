import React, { useState, useEffect } from "react";
import { getKnittingItems, deleteData } from "../functions.ts";
import { useKnittingItemsContext } from "../useKnittingItemsContext.tsx";
import { IPostItem } from "../types";

const StoredItems: React.FunctionComponent = () => {   
    const {knittingItems, setKnittingItems} = useKnittingItemsContext();
  
  const deleteItem = (id: string) => {
    deleteData(id)
    const newList = knittingItems.filter((item) => item._id !== id)
    setKnittingItems([...newList])
  }

  useEffect(() => {
    getKnittingItems(setKnittingItems)
  }, [])


return (
    <div>
        <h2>Knitted items</h2>
        <div className="flex">
        {knittingItems.map((item, key) =>
            <div key={key}>
                <p>{item.item}</p>
                <p>{item.yarn}</p>
                <p>{item.needles}</p>
                <p>{item.link}</p>
                <button onClick={() => {deleteItem(item._id)}}>Delete</button>
            </div>
            )}
        </div>
    </div>
  );
};
export default StoredItems;
