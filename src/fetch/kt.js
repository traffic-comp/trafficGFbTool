export const getOffers = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/kt/offers`);
    const offers = await res.json();

    if (!res.ok) {
      throw offers;
    }
    return offers;
  } catch (error) {
    console.error("Ошибка при получении списка офферов:", error);
  }
};
