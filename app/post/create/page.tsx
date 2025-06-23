"use client";

import { useSetHeader } from "@/app/components/header/HeaderContext";
import { useEffect } from "react";

const PostCreatePage = () => {
  const setHeader = useSetHeader();

  useEffect(() => {
    setHeader({ title: "빌리지", showBackButton: true });
  }, [setHeader]);

  return <div></div>;
};

export default PostCreatePage;
