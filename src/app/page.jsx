const Auth = () => {
  const appId = process.env.NEXT_APP_ID;
  const redirectUri = `${process.env.NEXT_SITE_LINK}/callback`;
  const scope =
    "pages_show_list,ads_management,leads_retrieval,pages_read_engagement,pages_manage_metadata,pages_manage_ads,business_management,email";
  const responseType = "token";

  const fbAuthUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${scope}&response_type=${responseType}`;

  
  return <>
    <a href={fbAuthUrl}>Войти через Facebook</a>
    <a href="/main/tt">tiktok</a>
  </>;
};

export default Auth;
