export const getTemplates = async (userId) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/template/getTemplates?userId=${userId}`
    );

    const data = await res.json();

    if (!res.ok || data.type === "error") {
      return data.message;
    }

    return data;
  } catch (err) {
    return err;
  }
};

export const updateTemplate = async (dto, formId) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/template/updateTemplate`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...dto, formId }),
      }
    );

    const data = await res.json();

    if (!res.ok || data.type === "error") {
      return data.message;
    }

    return data;
  } catch (err) {
    return err;
  }
};

export const deleteTemplate = async (_id, formId) => {
  try {
    console.log(_id, formId)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/template/deleteTemplate`,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ _id, formId }),
      }
    );

    const data = await res.json();

    if (!res.ok || data.type === "error") {
      return data.message;
    }

    return data;
  } catch (err) {
    return err;
  }
};
