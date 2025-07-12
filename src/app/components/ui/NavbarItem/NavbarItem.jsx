import s from "./navbaritem.module.scss";
import Link from "next/link";

const NavbarItem = ({ img, text, isActive, alt, href }) => {
  return (
    <Link className={`${s.menuitem} ${isActive ? s.active : ""}`} href={href}>
      <img src={img} alt={alt} />
      <p>{text}</p>
    </Link>
  );
};

export default NavbarItem;
