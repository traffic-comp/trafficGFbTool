import s from "@/app/main/layout.module.scss";
import Navbar from "@/app/components/Navbar/Navbar";
import Header from "@/app/components/Header/Header";

function MainLayout({ children }) {
  return (
    <>
      <main className={s.main}>
        <Navbar />
        <div className={s.container}>
          <Header />
          {children}
        </div>
      </main>
    </>
  );
}

export default MainLayout;
