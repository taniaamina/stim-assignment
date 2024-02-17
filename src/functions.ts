import { IKnitPostItem } from "./types";

export async function postKnittingItem(
  data: IKnitPostItem,
) {
  const postData = {
    item: data.item,
    yarn: data.yarn,
    needles: data.needles,
    link: data.link,
    isComplete: false,
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
      const message = res.status + ":" + res.statusText;
      throw new Error(message);
    }

    const data = await res.json();

    const result = {
      data: data,
    };

    return result

  } catch (err) {
    console.log("error");
  }
}

export async function getKnittingItems() {
  try {
    const res = await fetch(`${process.env.REACT_APP_CRUD_ENDPOINT}/entry`);

    if (!res.ok) {
      const message = res.status + ":" + res.statusText;
      throw new Error(message);
    }

    const data = await res.json();

    const result = {
      data: data,
      status: res.status,
      statusText: res.statusText,
    };


    return result

  } catch (err) {
    console.log(err.message);
  }
}

export async function editKnittingItem(id: string, item: IKnitPostItem) {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_CRUD_ENDPOINT}/entry/${id}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      },
    );

    if (!res.ok) {
      const message = `An error has occured: ${res.status} - ${res.statusText}`;
      throw new Error(message);
    }

    const data = await res;

    const result = {
      status: res.status + "-" + res.statusText,
      data: data,
    };

    console.log(result.status)
  } catch (err) {
    console.log(err);
  }
}

export async function deleteData(id: string) {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_CRUD_ENDPOINT}/entry/${id}`,
      { method: "delete" },
    );

    const result = {
      status: res.status + "-" + res.statusText,
    };

    console.log(result.status)

  } catch (err) {
    console.log(err.message);
  }
}
