export const sendToCrm = async (dto) => {
  for (let i = 0; i < dto.length; i++) {
    const formBody = new URLSearchParams(dto[i]).toString();

    const res = await fetch("https://crm.traffic-g.live/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
        // body: formBody,
    });

    // const answer = await res.json();
  }
};
