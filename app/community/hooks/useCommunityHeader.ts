import { useSetHeader } from "@/app/components/header/HeaderContext";
import { useEffect } from "react";

export const useCommunityHeader = () => {
  const setHeader = useSetHeader();

  useEffect(() => {
    setHeader({
      title: "",
      showBackButton: false,
      showSearchButton: true,
      showSettingButton: false,
      showLogo: true,
    });
  }, [setHeader]);
};
