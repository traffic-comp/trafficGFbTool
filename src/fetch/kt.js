export const getOffers = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/kt/offers`);
    const offers = await res.json();

    if (!res.ok) {
      return [];
    }

    return offers;
  } catch (error) {
    console.log(error);
  }
};
