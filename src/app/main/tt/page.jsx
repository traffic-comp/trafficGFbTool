"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/main/tt/files");
  }, []);

  return <></>;
};

export default Page;
