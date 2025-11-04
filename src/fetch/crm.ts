import { Lead } from "@/interfaces/global";
import useErrorStore from "@/store/useErrorStore";

export const sendToCrm = async (dto: Lead[]) => {
  const { addMessage } = useErrorStore.getState();

  for (let i: number = 0; i < dto.length; i++) {
    const formBody = new URLSearchParams(
      Object.fromEntries(
        Object.entries(dto[i]).map(([key, value]) => [key, String(value)])
      )
    ).toString();

    try {
      const res = await fetch("https://crm.traffic-g.live/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: formBody,
      });

      if (res.status === 422) {
        addMessage("error", "Ошибка при отправке лида");
      }

      const data = await res.json();
      console.log(data);
      addMessage("success", data.message);
    } catch (error) {
      if (error instanceof Error) {
        addMessage("error", error.message);
      } else {
        console.log(error);
      }
      return null;
    }
  }
};
