import React, { useState } from "react";
import { deleteData, editKnittingItem } from "../functions.ts";
import { useKnittingItemsContext } from "../useKnittingItemsContext.tsx";
// eslint-disable-next-line
import { IKnitPostItem } from "../types";

const KnitItem: React.FC<IKnitPostItem> = (props) => {
  const { knittingItems, setKnittingItems } = useKnittingItemsContext();
  const [isComplete, setIsComplete] = useState<boolean>(props.isComplete);
  const [showEdit, setShowEdit] = useState<boolean>(false);

  const deleteItem = (id: string) => {
    deleteData(id);
    const newList = knittingItems.filter((item) => item._id !== id);
    setKnittingItems([...newList]);
  };

  const editItem = (item: IKnitPostItem) => {
    setShowEdit(!showEdit);

    editKnittingItem(item._id as string, {
      item: item.item,
      yarn: item.yarn,
      needles: item.needles,
      link: item.link,
      isComplete: isComplete,
    });

    const knitItem = knittingItems.find((e) => e._id === props._id);
    if (knitItem !== undefined) {
      knitItem.isComplete = isComplete;

      const newArray = knittingItems.map((item) => {
        if (item._id === props._id) {
          return { ...knitItem };
        }
        return item;
      });

      setKnittingItems(newArray);
    }
  };
  return (
    <div className="flex md:mb-8">
      {props && (
        <div className="flex flex-col">
          <div className="flex flex-col mb-4">
            <p>Grej: {props.item}</p>
            <p>Garn: {props.yarn}</p>
            <p>Stickor: {props.needles}</p>
            <p>
              Referens:{" "}
              <a className="underline" href={props.link}>
                {props.link}
              </a>
            </p>
          </div>
          {showEdit && (
            <div>
              <div className="mb-2">
                <label>Är du klar? </label>
                <input
                  type="checkbox"
                  defaultChecked={props.isComplete}
                  onChange={() => setIsComplete((state) => !state)}
                  name="isComplete"
                />
              </div>
              <button
                className="border border-black rounded-md py-2 px-3"
                onClick={() => {
                  editItem(props);
                }}
              >
                Save
              </button>
            </div>
          )}
          {!showEdit && (
            <div className="flex gap-2">
              <button
                className="border border-black rounded-md py-2 px-3"
                onClick={() => {
                  deleteItem(props._id as string);
                }}
              >
                Delete
              </button>
              <button
                className="border border-black rounded-md py-2 px-3"
                onClick={() => {
                  {
                    setShowEdit(!showEdit);
                  }
                }}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default KnitItem;
