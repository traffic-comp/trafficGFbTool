import Link from "next/link";
import { NavbarItemProms } from "./NavbarItem";
import styles from "./message.module.css";

const NavbarItem = ({ img, text, isActive, alt, href }: NavbarItemProms) => {
  return (
    <Link
      className={`${styles.link} ${isActive ? styles.active : ""}`}
      href={href}
    >
      <img className={styles.icon} src={img} alt={alt} />
      <p>{text}</p>
    </Link>
  );
};

export default NavbarItem;
