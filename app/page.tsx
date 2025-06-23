"use client";

import { useEffect } from "react";
import { useSetHeader } from "./components/header/HeaderContext";

const Page = () => {
  const setHeader = useSetHeader();

  useEffect(() => {
    setHeader({
      title: "",
      showBackButton: false,
      showSearchButton: true,
      showNotificationButton: true,
      showSettingButton: false,
    });
  }, [setHeader]);
  return <></>;
};

export default Page;
