"use client";

import Header from "./Header";
import { useHeader } from "./HeaderContext";

const HeaderConsumer = () => {
  const header = useHeader();
  return (
    <Header
      title={header.title ?? ""}
      showBackButton={header.showBackButton}
      showSearchButton={header.showSearchButton}
      showNotificationButton={header.showNotificationButton}
      showSettingButton={header.showSettingButton}
      showCreateButton={header.showCreateButton}
      showMenuButton={header.showMenuButton}
      showCreateButtonProps={header.showCreateButtonProps}
      onClick={header.onClick}
    />
  );
};

export default HeaderConsumer;
