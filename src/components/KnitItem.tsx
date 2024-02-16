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
    alert(id)
    deleteData(id)
    const newList = knittingItems.filter((item) => item._id !== id)
    setKnittingItems([...newList])
  }

  const editItem = (item) => {
    editKnittingItem({...item, 'isComplete': isComplete})
  }

return (
    <div>
        <div className="flex">
        {item &&
            <div>
                <p>{item.item}</p>
                <p>{item.yarn}</p>
                <p>{item.needles}</p>
                <p>{item.link}</p>
                {showEdit || item.isComplete ?
                <div>
                    <label >Did you finish?</label>
                    <input             
                    type="checkbox"
                    defaultChecked={item.isComplete}
                    onChange={() => setIsComplete((state) => !state)}
                    name="isComplete"/>
                <button onClick={() => {editItem(item)}}>Save</button>

                </div> : ''}
                <button onClick={() => {deleteItem(item.id)}}>Delete</button>
                <button onClick={() =>{{setShowEdit(!showEdit)}}}>Edit</button>           
            </div>
            }
        </div>
    </div>
  );
};
export default KnitItem;
