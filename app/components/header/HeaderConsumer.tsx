"use client";

import dynamic from "next/dynamic";
import { useHeader } from "./HeaderContext";
const Header = dynamic(() => import("./Header"), { ssr: false });

const HeaderConsumer = () => {
  const header = useHeader();
  return (
    <Header
      title={header.title ?? ""}
      showLogo={header.showLogo}
      showBackButton={header.showBackButton}
      showSearchButton={header.showSearchButton}
      showNotificationButton={header.showNotificationButton}
      showSettingButton={header.showSettingButton}
      showCreateButton={header.showCreateButton}
      showMenuButton={header.showMenuButton}
      showRefreshButton={header.showRefreshButton}
      showCreateButtonProps={header.showCreateButtonProps}
      onClick={header.onClick}
    />
  );
};

export default HeaderConsumer;
