import Link from "next/link";
import { NavbarItemProms } from "./NavbarItem.props";
import s from "./navbaritem.module.css";
import { JSX } from "react";

const NavbarItem = ({
  img,
  text,
  isActive,
  alt,
  href,
}: NavbarItemProms): JSX.Element => {
  return (
    <Link className={`${s.link} ${isActive ? s.active : ""}`} href={href}>
      <img className={s.icon} src={img} alt={alt} />
      <p>{text}</p>
    </Link>
  );
};
export default NavbarItem;
