"use client";

import { createContext, useContext, useState } from "react";

interface HeaderState {
  title?: string;
  showBackButton?: boolean;
  showNotificationButton?: boolean;
  showSearchButton?: boolean;
  showSettingButton?: boolean;
  showCreateButton?: boolean;
  showCreateButtonProps?: { className: string; disabled: boolean };
}

interface HeaderContextType {
  header: HeaderState;
  setHeader: (header: HeaderState) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [header, setHeader] = useState<HeaderState>({
    title: "",
    showBackButton: false,
    showNotificationButton: false,
    showSearchButton: false,
    showSettingButton: false,
    showCreateButton: false,
    showCreateButtonProps: { className: "", disabled: true },
  });

  return (
    <HeaderContext.Provider value={{ header, setHeader }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeader은 HeaderProvider 내부에서 사용되어야 합니다.");
  }

  return context.header;
};

export const useSetHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error(
      "useSetHeader은 HeaderProvider 내부에서 사용되어야 합니다.",
    );
  }

  return context.setHeader;
};
