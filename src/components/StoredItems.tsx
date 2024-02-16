import React, { useEffect } from "react";
import { getKnittingItems } from "../functions.ts";
import { useKnittingItemsContext } from "../useKnittingItemsContext.tsx";
import KnitItem from "./KnitItem.tsx";



const StoredItems: React.FunctionComponent = () => {   
    const {knittingItems, setKnittingItems} = useKnittingItemsContext();

  useEffect(() => {
    getKnittingItems(setKnittingItems)
  }, [])


return (
    <div>
        {knittingItems.length > 0 && <h2>Knitted items</h2> }
        <div className="flex">
        {knittingItems.map((item, key) =>
            <KnitItem key={key} item={item.item} link={item.link} needles={item.needles} id={item._id} yarn={item.yarn} isComplete={item.isComplete}/>
        )}
        </div>
    </div>
  );
};
export default StoredItems;
