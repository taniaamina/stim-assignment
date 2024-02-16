import React, { useState } from "react";
import {  deleteData, editKnittingItem } from "../functions.ts";
import { useKnittingItemsContext } from "../useKnittingItemsContext.tsx";
import { IPostItem } from "../types";


const data = {isComplete: false};

const KnitItem: React.FunctionComponent = (item: IPostItem, key) => {   
    const {knittingItems, setKnittingItems} = useKnittingItemsContext();
    const [isComplete, setIsComplete] = useState<boolean>(item.isComplete)
    const [showEdit, setShowEdit] = useState<boolean>(false)
  
  const deleteItem = (id: string) => {
    deleteData(id)
    const newList = knittingItems.filter((item) => item._id !== id)
    setKnittingItems([...newList])
  }

  const editItem = (item) => {
    setShowEdit(true)
    editKnittingItem({...item, 'isComplete': isComplete})
    const knitItem = knittingItems.find(e => e.id === item.id)
    knitItem.isComplete = isComplete
    const newArray = [...knittingItems]
    Object.assign(
        newArray.find(({id}) => id === item.id),
        {knitItem}
    );
    setKnittingItems(newArray)
  }


return (
    <div>
        <div className="flex">
        {item &&
            <div className="flex flex-col">
                <p>Grej: {item.item}</p>
                <p>Garn: {item.yarn}</p>
                <p>Stickor: {item.needles}</p>
                <p>Referens: <a className="underline" href={item.link}>{item.link}</a></p>
                {showEdit &&
                <div>
                    <div className="">
                    <label >Är du klar? </label>
                    <input             
                    type="checkbox"
                    defaultChecked={item.isComplete}
                    onChange={() => setIsComplete((state) => !state)}
                    name="isComplete"/>
                </div>
                <button className="border border-black rounded-md py-2 px-3" onClick={() => {editItem(item)}}>Save</button>

                </div> }
                {!showEdit &&
                    <div className="flex gap-2">
                    <button className="border border-black rounded-md py-2 px-3" onClick={() => {deleteItem(item.id)}}>Delete</button>
                    <button className="border border-black rounded-md py-2 px-3" onClick={() =>{{setShowEdit(!showEdit)}}}>Edit</button>           
                    </div>
                }
            </div>
            }
        </div>
    </div>
  );
};
export default KnitItem;
