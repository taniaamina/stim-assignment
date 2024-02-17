import React, { useEffect, useState } from "react";
import { getKnittingItems } from "../functions.ts";
import { useKnittingItemsContext } from "../useKnittingItemsContext.tsx";
import KnitItem from "./KnitItem.tsx";
import { IKnitPostItem } from "../types";

const StoredItems: React.FunctionComponent = () => {
  const { knittingItems, setKnittingItems } = useKnittingItemsContext();
  const [splitKnittingItems, setSplitKnittingItems] = useState<{
    isCompleted: IKnitPostItem [];
    isNotCompleted: IKnitPostItem[];
  }>({
    isCompleted: [],
    isNotCompleted: []
  });

  useEffect(() => {
    const fetchData = async () => {
    const result = await getKnittingItems();
    if (result) {
     setKnittingItems(result?.data)
    }
  }
    fetchData();
  }, []);

  useEffect(() => {
    const splitKnittingItems = knittingItems.reduce((acc, obj) => {
      if (obj.isComplete === true) {
        acc.isCompleted.push(obj);
      } else if (obj.isComplete === false) {
        acc.isNotCompleted.push(obj);
      }
      return acc;
    }, { isCompleted: [] as IKnitPostItem[], isNotCompleted: [] as IKnitPostItem[] });
    setSplitKnittingItems(splitKnittingItems)
  }, [knittingItems]);

  return (
    <div className="flex">
      <div className="basis-1/2 p-16">
        {splitKnittingItems?.isNotCompleted.length > 0 && (
          <h2 className="text-2xl">Dessa är på kö!</h2>
        )}
        <div className="flex flex-col">
          {splitKnittingItems?.isNotCompleted
            .map((item, index) => (
              <KnitItem
                key={index}
                item={item.item}
                link={item.link}
                needles={item.needles}
                _id={item._id}
                yarn={item.yarn}
                isComplete={item.isComplete}
              />
            ))}
        </div>
      </div>
      <div className="basis-1/2 p-16">
        {splitKnittingItems?.isCompleted.length > 0 && (
          <h2 className="text-2xl">...Och dessa är klara!</h2>
        )}
        <div className="flex flex-col">
          {splitKnittingItems?.isCompleted
            .map((item, index) => (
              <KnitItem
                key={index}
                item={item.item}
                link={item.link}
                needles={item.needles}
                _id={item._id}
                yarn={item.yarn}
                isComplete={item.isComplete}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
export default StoredItems;
