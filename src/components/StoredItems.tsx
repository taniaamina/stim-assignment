import React, { useState, useEffect } from "react";
import { getKnittingItems } from "../functions.ts";

const StoredItems: React.FunctionComponent = () => {   
  const [knittingItems, setKnittingItems] = useState([])
  


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
        </div>)}
        </div>
    </div>
  );
};
export default StoredItems;
