export async function postKnittingItem(data, setKnittingItems, knittingItems) {

    const postData = {
      item: data.item,
      yarn: data.yarn,
      needles: data.needles,
      link: data.link
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

      console.log(knittingItems)

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

async function putData(id) {
    if (id) {
      const newData = {
        title: put_title.current.value,
        description: put_description.current.value,
        published: put_published.current.checked,
      };

      try {
        const res = await fetch(`${process.env.REACT_APP_CRUD_ENDPOINT}/entry/${id}`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        });

        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }

        const data = await res.json();

        const result = {
          status: res.status + "-" + res.statusText,
          headers: { "Content-Type": res.headers.get("Content-Type") },
          data: data,
        };

        setPutResult(fortmatResponse(result));
      } catch (err) {
        setPutResult(err.message);
      }
    }
  }
  

export async function deleteData(id) {
      try {
        const res = await fetch(`${process.env.REACT_APP_CRUD_ENDPOINT}/entry/${id}`, { method: "delete" });


        const result = {
          status: res.status + "-" + res.statusText,
          headers: { "Content-Type": res.headers.get("Content-Type") },
        };

        console.log(result)
      
      } catch (err) {
        console.log(err.message);
      } 
  }
  