import s from "./auth.module.scss";

const Auth = () => {
  const appId = process.env.NEXT_APP_ID;
  const redirectUri = `${process.env.NEXT_SITE_LINK}/callback`;
  const scope =
    "pages_show_list,ads_management,leads_retrieval,pages_read_engagement,pages_manage_metadata,pages_manage_ads,business_management,email";
  const responseType = "token";

  const fbAuthUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${scope}&response_type=${responseType}`;

  return (
    <div className={s.auth}>
      <a href={fbAuthUrl} className={s.fb}>
        <img src="assets/icon/fb.png" alt="Facebook logo" />
        <span>Войти через Facebook</span>
      </a>
      <a href="/main/tt" className={s.tt}>
        <img src="assets/icon/tt.png" alt="Tiktok icon" />
        <span>tiktok</span>
      </a>
    </div>
  );
};

export default Auth;
