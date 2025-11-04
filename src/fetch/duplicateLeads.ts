import { Lead } from "@/interfaces/global";

export const filteredLeads = async (leads: Lead[]) => {
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
    if (error instanceof Error) {
      throw new Error("Ошибка при фильтрации:", error);
    } else {
      console.log(error);
    }
    return null;
  }
};

export const uploadLeads = async (leads: Lead[]) => {
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
    if (error instanceof Error) {
      throw new Error("Ошибка при сохранении лидов:", error);
    } else {
      console.log(error);
    }
    return null;
  }
};
