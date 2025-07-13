"use client";

import { usePathname } from "next/navigation";
import s from "./navbar.module.scss";
import NavbarItem from "@/app/components/ui/NavbarItem/NavbarItem";
import { useEffect, useState } from "react";

const Navbar = () => {
  const pathName = usePathname();

  const baseLinks = [
    {
      text: "Facebook",
      img: "/assets/icon/fb.png",
      alt: "Facebook icon",
      href: "/main/fb/fanpages",
    },
    {
      text: "TikTok",
      img: "/assets/icon/tt.png",
      alt: "TikTok icon",
      href: "/main/tt/files",
    },
  ];

  const [links, setLinks] = useState(
    baseLinks.map((link) => ({
      ...link,
      isActive: link.href.includes(pathName.split("/")[2]),
    }))
  );

  console.log();

  useEffect(() => {
    setLinks(
      baseLinks.map((link) => ({
        ...link,
        isActive: link.href.includes(pathName.split("/")[2]),
      }))
    );
  }, [pathName]);

  return (
    <div className={s.navbar}>
      <div className={s.logo}>
        <img src="/assets/img/logo.png" alt="logo" />
        <p>Traffic G</p>
      </div>

      <div className={s.menuWrapper}>
        <h3>MAIN MENU</h3>
        <nav>
          <ul className={s.menulist}>
            {links?.map((link) => (
              <NavbarItem
                key={link.href}
                text={link.text}
                img={link.img}
                isActive={link.isActive}
                alt={link.alt}
                href={link.href}
              />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
