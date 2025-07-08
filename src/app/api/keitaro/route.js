export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_KEITARO_HOST}/api/admin_api/v1/offers`, {
    headers: {
      "Api-Key": process.env.NEXT_PUBLIC_KEITARO_API_KEY,
    },
  });

  if (!res.ok) {
    return new Response(
      JSON.stringify({ error: "Ошибка при запросе к Keitaro" }),
      { status: res.status }
    );
  }

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
