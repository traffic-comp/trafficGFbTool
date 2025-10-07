import { Geist, Geist_Mono } from "next/font/google";
import "./global.css";
import Script from "next/script";
import type { ReactNode } from "react";
import Head from "./helpers/Head";
import MessageList from "./components/ui/Message/Message";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Traffic G",
  description: "Command Tool",
  openGraph: {
    title: "Traffic G",
    description: "Command Tool",
    url: "https://traffiicg.netlify.app/",
    siteName: "Traffic G",
    images: [
      {
        url: "https://traffiicg.netlify.app/assets/img/logo.png", // замени на актуальный путь
        width: 1200,
        height: 630,
        alt: "Preview Image",
      },
    ],
    type: "website",
    app_id: "1797611847832615",
  },
  other: {
    "facebook-domain-verification": "pbxnsseh0ok38y7na1u4xu7fknz7aa",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          id="facebook-sdk"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.fbAsyncInit = function() {
                FB.init({
                  appId      : '1797611847832615',
                  xfbml      : true,
                  version    : 'v23.0'
                });
                FB.AppEvents.logPageView();
              };

              (function(d, s, id){
                 var js, fjs = d.getElementsByTagName(s)[0];
                 if (d.getElementById(id)) {return;}
                 js = d.createElement(s); js.id = id;
                 js.src = "https://connect.facebook.net/en_US/sdk.js";
                 fjs.parentNode.insertBefore(js, fjs);
              }(document, 'script', 'facebook-jssdk'));
            `,
          }}
        />
        <MessageList />
        {children}
      </body>
    </html>
  );
}
