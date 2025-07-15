const Auth = () => {
  const appId = process.env.NEXT_APP_ID;
  const redirectUri = `${process.env.NEXT_SITE_LINK}/callback`;
  const scope = "pages_show_list,leads_retrieval,public_profile,email";
  const responseType = "token";

  const fbAuthUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${scope}&response_type=${responseType}`;

  return (
    <div className="flex items-center justify-center h-screen w-full gap-8">
      <a
        href={fbAuthUrl}
        className="flex items-center gap-2.5 px-2.5 py-2.5 text-center text-lg font-semibold uppercase text-white rounded-xl bg-[#1877f2] transition duration-300 cursor-pointer no-underline"
      >
        <img
          src="assets/icon/fb.png"
          alt="Facebook logo"
          className="filter invert"
        />
        <span>Войти через Facebook</span>
      </a>
      <a
        href="/main/tt"
        className="flex items-center gap-2.5 px-2.5 py-2.5 text-center text-lg font-semibold uppercase text-white rounded-xl bg-black transition duration-300 cursor-pointer no-underline"
      >
        <img
          src="assets/icon/tt.png"
          alt="Tiktok icon"
          className="filter invert"
        />
        <span>tiktok</span>
      </a>
    </div>
  );
};

export default Auth;
