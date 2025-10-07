export const registrate = async (dto) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/user/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(dto),
  });
  const data = await res.json();

  return data;
};

export const login = async (dto) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/user/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(dto),
  });
  const data = await res.json();

  return data;
};

export const chekAuth = async (token) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/user/checkAuth`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};
