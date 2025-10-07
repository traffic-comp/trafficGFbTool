import Navbar from "@/app/components/Navbar/Navbar";
import Header from "@/app/components/Header/Header";
import { DetailedHTMLProps, HTMLAttributes, JSX, ReactNode } from "react";
import s from "./layout.module.css";
import Breadcrumbs from "../components/ui/Breadcrumbs/Breadcrumbs";
import MessageList from "../components/ui/Message/Message";

interface MainLayoutProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  children: ReactNode;
}
function MainLayout({ children }: MainLayoutProps): JSX.Element {
  return (
    <>
      <main className={s.main} >
        <Navbar />
        <div className={s.mainContent}>
          <Header />
          <div className={s.container} style={{background:'#fff'}}>
            <h2 className={s.secondTitle}>
              <Breadcrumbs />
            </h2>
            {children}

            <MessageList />
          </div>
        </div>
      </main>
    </>
  );
}

export default MainLayout;
