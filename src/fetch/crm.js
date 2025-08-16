import useErrorStore from "@/store/useErrorStore";

export const sendToCrm = async (dto) => {
  const { addMessage } = useErrorStore.getState();

  for (let i = 0; i < dto.length; i++) {
    const formBody = new URLSearchParams(dto[i]).toString();

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
    } catch (err) {
      console.log(err);
      addMessage("error", err.message);
    }
  }
};
