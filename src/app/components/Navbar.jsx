"use client";

import { usePathname } from "next/navigation";
import NavbarItem from "@/app/components/ui/NavbarItem";
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

  useEffect(() => {
    setLinks(
      baseLinks.map((link) => ({
        ...link,
        isActive: link.href.includes(pathName.split("/")[2]),
      }))
    );
  }, [pathName]);

  return (
    <div className="Navbar pl-6 pr-1 py-6 h-[100vh] bg-white">
      <div className="flex items-center mb-[56px]">
        <img
          src="/assets/img/logo.png"
          alt="logo"
          className="w-[30px] h-[30px]"
        />
        <p className="font-[500] text-[20px]">Traffic G</p>
      </div>

      <div>
        <h3 className="mb-[20px] text-[14px] font-normal text-[var(--color-gray)]">MAIN MENU</h3>
        <nav>
          <ul className="flex flex-col">
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
