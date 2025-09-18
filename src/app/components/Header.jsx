const Header = () => {
  const appId = process.env.NEXT_PUBLIC_APP_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_SITE_LINK}/callback`;
  const scope = "pages_show_list, leads_retrieval, public_profile, email, pages_manage_ads, ads_read, ads_management";
  const responseType = "token";

  const fbAuthUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${scope}&response_type=${responseType}`;

  return (
    <header className="flex justify-end p-1 bg-white h-[40px]">
      <a
        href={fbAuthUrl}
        className=" flex items-center gap-2.5 px-2.5  text-center text-lg font-semibold uppercase text-white rounded-xl bg-[#1877f2] transition duration-300 cursor-pointer no-underline"
      >
        <img
          src="../../assets/icon/fb.png"
          alt="Facebook logo"
          className="filter invert"
        />
        <span>Подключить Facebook</span>
      </a>
    </header>
  );
};

export default Header;
