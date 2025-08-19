"use client";
import { useRouter, usePathname } from "next/navigation";
import { getBreadcrumbs } from "@/utils/getBreadcrumbs";

const Breadcrumbs = () => {
  const router = useRouter();
  const pathname = usePathname(); // например: "/fb/form"
  const crumbs = getBreadcrumbs(pathname); // ["fb", "form"]

  const handleClick = (index) => {
    const slicedPath = crumbs.slice(0, index + 1).join("/");

    if (slicedPath === "tt") {
      return router.push(`/${slicedPath}/files`);
    } else if (slicedPath === "fb") {
      return router.push(`/${slicedPath}/fanpages`);
    }

    router.push(`/${slicedPath}`);
  };

  return (
    <div className="font-bold">
      {crumbs.map((crumb, i) => (
        <span key={i} onClick={() => handleClick(i)} className="cursor-pointer">
          {i !== 0 && <span> / </span>}
          {crumb}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
