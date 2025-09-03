export const filteredLeads = async (leads) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/duplicateLeads/fileterdLeads`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ leads }),
      }
    );

    if (!res.ok) {
      return {
        error: "Ошибка при фильтрации",
      };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("Ошибка при фильтрации:", error);
  }
};

export const uploadLeads = async (leads) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/duplicateLeads/uploadLeads`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ leads }),
      }
    );

    if (!res.ok) {
      return {
        error: "Ошибка при сохранении лидов",
      };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("Ошибка при сохранении лидов:", error);
  }
};
