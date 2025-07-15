import Link from "next/link";

const NavbarItem = ({ img, text, isActive, alt, href }) => {
  return (
    <Link
      className={`flex items-center gap-2 p-[20px] rounded-[8px] text-4 font-[500] text-black ${
        isActive ? "bg-[var(--color-active-menu)]" : ""
      }`}
      href={href}
    >
      <img src={img} alt={alt} />
      <p>{text}</p>
    </Link>
  );
};

export default NavbarItem;
