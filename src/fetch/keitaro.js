export async function GET(setOffers) {
  const res = await fetch("http://212.34.155.77/api/admin_api/v1/offers", {
    headers: {
      "Api-Key": process.env.NEXT_PUBLIC_KEITARO_API_KEY,
    },
  });

  const data = await res.json();
  setOffers(data)
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
