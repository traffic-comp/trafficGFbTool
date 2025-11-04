"use client";

import { usePathname } from "next/navigation";
import { JSX, useState } from "react";
import type { NavbarProps } from "./Navbar.props";
import s from "./navbar.module.css";
import NavbarItem from "../ui/NavbarItem/NavbarItem";

const Navbar = ({ ...props }: NavbarProps): JSX.Element => {
  const pathName = usePathname();
  const [activeTab, setActiveTab] = useState("Facebook");

  const baseLinks = [
    {
      text: "Facebook",
      img: "/assets/icon/fb.png",
      alt: "Facebook icon",
      href: [
        {
          text: "Fan pages",
          img: "/assets/icon/fb.png",
          alt: "Facebook icon",
          href: "/fb/fanpages",
        },
        {
          text: "Links",
          img: "/assets/icon/fb.png",
          alt: "Facebook icon",
          href: "/fb/links",
        },
        {
          text: "Spend",
          img: "/assets/icon/fb.png",
          alt: "Facebook icon",
          href: "/fb/spend",
        },
      ],
    },
    {
      text: "TikTok",
      img: "/assets/icon/tt.png",
      alt: "TikTok icon",
      href: [
        {
          text: "Upload",
          img: "/assets/icon/tt.png",
          alt: "TikTok icon",
          href: "/tt/files",
        },
      ],
    },
  ];

  return (
    <div className={s.navbar} {...props}>
      <div className={s.logoContainer}>
        <img src="/assets/img/logo.png" alt="logo" className={s.logoImage} />
        <p className={s.logoText}>Traffic G</p>
      </div>

      <div>
        <h3 className={s.menuTitle}>MAIN MENU</h3>
        <nav>
          <ul className={s.navList}>
            {baseLinks.map((link) => (
              <div key={link.text}>
                <div className={s.navItemContainer}>
                  <div
                    className={s.navItemHeader}
                    onClick={() => setActiveTab(link.text)}
                  >
                    <img src={link.img} alt={link.alt} />
                    <p>{link.text}</p>
                  </div>

                  <ul
                    className={`${s.subNavList} ${
                      activeTab === link.text
                        ? s.subNavListVisible
                        : s.subNavListHidden
                    }`}
                  >
                    {link.href.map((item) => (
                      <li key={item.href}>
                        <NavbarItem
                          text={item.text}
                          img={item.img}
                          alt={item.alt}
                          href={item.href}
                          isActive={pathName === item.href}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
