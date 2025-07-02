function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function randomDelay() {
    const min = 3 * 60 * 1000; // 3 минуты в миллисекундах
    const max = 12 * 60 * 1000; // 12 минут
 
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;

  console.log(
    `Ждём ${Math.floor(delay / 1000)} секунд (${delay / 60000} минут)...`
  );
  await sleep(delay);
  console.log("Задержка завершена");
}

export const sendToCrm = async (dto, setComplitedLeads) => {
  console.log(dto);

  for (let i = 0; i < dto.length; i++) {
    const formBody = new URLSearchParams(dto[i]).toString();

    const res = await fetch("https://crm.traffic-g.live/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      //   body: formBody,
    });

    const answer = await res.json();

    setComplitedLeads(i+1);
    await randomDelay();
  }
};
