"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/main/fb/fanpages");
  }, []);

  return <></>;
};

export default Page;
