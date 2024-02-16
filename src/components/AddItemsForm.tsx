import React, { useState, useEffect } from "react";
import { postKnittingItem, getKnittingItems } from "../functions.ts";


const AddItemsForm: React.FunctionComponent = () => {   
    const data = { item: "", yarn: "", needles: "", link: "" };
  const [formData, setFormData] = useState(data);
  const [knittingItems, setKnittingItems] = useState([])
  

  const sendData = () => {
    postKnittingItem(formData)
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  useEffect(() => {
    getKnittingItems(setKnittingItems)
  }, [])


  return (
    <div className="">
      <form className="f">
        <div className="">
          <label>Item</label>
          <input
            type="text"
            placeholder=""
            name="item"
            value={formData.item}
            onChange={onInputChange}
          />
      
        </div>
        <div className="">
          <label>Yarn</label>
          <input
            type="text"
            name="yarn"
            value={formData.yarn}
            onChange={onInputChange}
          />

        </div>
        <div className="">
          <label>Needles</label>
          <input
            type="text"
            name="needles"
            value={formData.needles}
            onChange={onInputChange}
          />
             <label>Link</label>
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={onInputChange}
          />
      
        </div>
        <div className="">
          <button type="button" onClick={() => {sendData()}}>Add project</button>
        </div>
      </form>
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
export default AddItemsForm;
