import React, { useState } from "react";
import { useKnittingItemsContext } from "../useKnittingItemsContext.tsx";
import { postKnittingItem } from "../functions.ts";
import { IPostItem } from "../types";

const data: IPostItem = {
  item: "",
  yarn: "",
  needles: "",
  link: "",
  id: "",
  isComplete: false,
};

const AddItemsForm: React.FunctionComponent = () => {
  const [formData, setFormData] = useState<IPostItem>(data);
  const { knittingItems, setKnittingItems } = useKnittingItemsContext();

  const sendData = async () => {
    const result = await postKnittingItem(formData, setKnittingItems, knittingItems);
    setFormData(data);
    setKnittingItems([...knittingItems, result?.data]);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="pb-20 border-b border-black">
      <h1 className="text-4xl  h-[30vh] flex items-center justify-center">
        Hey there! Vad ska du sticka för något?
      </h1>
      <form className="">
        <div className="flex gap-4 mb-4 items-center justify-center mb-12 pb-">
          <div className="flex flex-col ">
            <label>Plagg eller grej</label>
            <input
              type="text"
              placeholder=""
              name="item"
              value={formData.item}
              onChange={onInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label>Garn</label>
            <input
              type="text"
              name="yarn"
              value={formData.yarn}
              onChange={onInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label>Stickor</label>
            <input
              type="text"
              name="needles"
              value={formData.needles}
              onChange={onInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label>Länk</label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={onInputChange}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-300 py-2 px-4 rounded-md"
            type="button"
            onClick={() => {
              sendData();
            }}
          >
            Lägg till projekt
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddItemsForm;
