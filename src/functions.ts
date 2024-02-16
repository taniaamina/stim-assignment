
import { IPostItem } from "./types";

export async function postKnittingItem(data: IPostItem, setKnittingItems, knittingItems: Array<IPostItem>) {
    const postData = {
      item: data.item,
      yarn: data.yarn,
      needles: data.needles,
      link: data.link,
      isComplete: false,
      id: ''
    };

    try {
      const res = await fetch(`${process.env.REACT_APP_CRUD_ENDPOINT}/entry`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        const message = res.status + ':' + res.statusText
        throw new Error(message);
      }

      const data = await res.json();

      const result = {
        data: data,
      };

      setKnittingItems([...knittingItems, result.data])


    } catch (err) {
      console.log('error')
    }
}

  export async function getKnittingItems(setKnittingItems) {
      try {
        const res = await fetch(`${process.env.REACT_APP_CRUD_ENDPOINT}/entry`);

        if (!res.ok) {
          const message = res.status + ':' + res.statusText
          throw new Error(message);
        }

        const data = await res.json();

        const result = {
          data: data,
          status: res.status,
          statusText: res.statusText,
          headers: {
            "Content-Type": res.headers.get("Content-Type"),
            "Content-Length": res.headers.get("Content-Length"),
          },
        };

        setKnittingItems(result.data)
      } catch (err) {
        console.log(err.message)
      }
    
  }

export async function editKnittingItem(item: IPostItem) {
  alert(item.id)
      try {
        const res = await fetch(`${process.env.REACT_APP_CRUD_ENDPOINT}/entry/${item.id}`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        });

        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }

        const data = await res

        const result = {
          status: res.status + "-" + res.statusText,
          headers: { "Content-Type": res.headers.get("Content-Type") },
          data: data,
        };

      } catch (err) {
        console.log(err)
      }
  }
  

export async function deleteData(id: string) {
      try {
        const res = await fetch(`${process.env.REACT_APP_CRUD_ENDPOINT}/entry/${id}`, { method: "delete" });


        const result = {
          status: res.status + "-" + res.statusText,
          headers: { "Content-Type": res.headers.get("Content-Type") },
        };

      
      } catch (err) {
        console.log(err.message);
      } 
  }
  