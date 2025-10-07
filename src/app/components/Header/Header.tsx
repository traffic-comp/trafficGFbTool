import { JSX } from "react";
import type { HeaderProps } from "./Header.props";
import s from "./header.module.css";

const Header = ({ ...props }: HeaderProps): JSX.Element => {
  const appId = process.env.NEXT_PUBLIC_APP_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_SITE_LINK}/callback`;
  const scope =
    "email, catalog_management, pages_show_list, ads_management, ads_read, business_management, leads_retrieval, attribution_read, pages_read_engagement, pages_manage_metadata, pages_manage_ads, public_profile";
  const responseType = "token";

  const fbAuthUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${scope}&response_type=${responseType}`;

  return (
    <header className={s.header} {...props}>
      <a href={fbAuthUrl} className={s.fbLink}>
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
