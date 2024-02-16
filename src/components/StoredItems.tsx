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
    <div className="flex">
        <div className="basis-1/2 p-16">
        {knittingItems.length > 0 && <h2 className="text-2xl">Dessa är på kö!</h2> }
        <div className="flex flex-col">
            {knittingItems.map((item, index) =>
            <KnitItem key={index} item={item.item} link={item.link} needles={item.needles} id={item._id} yarn={item.yarn} isComplete={item.isComplete}/>
            )}
        </div>
        </div>
        <div className="basis-1/2 p-16">
        {knittingItems.length > 0 && <h2 className="text-2xl">...Och dessa är klara!</h2> }
        <div className="flex flex-col">
        {knittingItems.map((item, index) =>
            <KnitItem key={index} item={item.item} link={item.link} needles={item.needles} id={item._id} yarn={item.yarn} isComplete={item.isComplete}/>
        )}
        </div>
    </div>
    </div>
    
  );
};
export default StoredItems;
