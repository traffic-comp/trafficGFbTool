"use client";

import { usePathname } from "next/navigation";
import NavbarItem from "@/app/components/ui/NavbarItem";
import { useState } from "react";

const Navbar = () => {
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
          text: "Conncet form",
          img: "/assets/icon/fb.png",
          alt: "Facebook icon",
          href: "/fb/connectform",
        },
      ],
    },
    {
      text: "TikTok",
      img: "/assets/icon/tt.png",
      alt: "TikTok icon",
      href: [
        {
          text: "upload",
          img: "/assets/icon/tt.png",
          alt: "TikTok icon",
          href: "/tt/files",
        },
      ],
    },
  ];

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
        <h3 className="mb-[20px] text-[14px] font-normal text-[var(--color-gray)]">
          MAIN MENU
        </h3>
        <nav>
          <ul className="flex flex-col">
            {baseLinks.map((link) => (
              <div key={link.text}>
                <div className="flex flex-col items-center gap-2 p-[20px] rounded-[8px] text-4 font-[500] text-black">
                  <div
                    className=" flex gap-2 self-start cursor-pointer"
                    onClick={() => setActiveTab(link.text)}
                  >
                    <img src={link.img} alt={link.alt} />
                    <p>{link.text}</p>
                  </div>

                  <ul
                    className={`${
                      activeTab === link.text ? "flex" : "hidden"
                    } flex-col`}
                  >
                    {link.href.map((item) => (
                      <li key={item.href}>
                        <NavbarItem
                          key={item.href}
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
