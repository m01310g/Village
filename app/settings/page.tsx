"use client";

import { useEffect, useState } from "react";
import { useSetHeader } from "../components/header/HeaderContext";
import UserDeleteButton from "../components/UserDeleteButton";
import SignoutButton from "../components/SignoutButton";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserProfile } from "../(main)/hooks/useUserProfile";

const SettingsPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const setHeader = useSetHeader();
  const { data: profile } = useUserProfile(isLoggedIn);
  const nickname = profile?.nickname;
  const router = useRouter();

  useEffect(() => {
    const accessToken = useAuthStore.getState().accessToken;
    setIsLoggedIn(!!accessToken);
  }, []);

  useEffect(() => {
    setHeader({
      title: "설정",
      showBackButton: true,
    });
  }, [setHeader]);

  useEffect(() => {});

  return (
    <main className="h-[calc(100vh-46px)] bg-background-primary">
      <h2 className="text-title-1 px-4 pb-5 pt-3">
        <span className="text-text-onsecondary">{nickname}님</span> 안녕하세요!
      </h2>
      <ul className="text-body-2 divide-y-[1px] divide-border-primary">
        <li
          className="cursor-pointer px-4 py-5 text-neutral-800"
          onClick={() => router.push("/support")}
        >
          고객지원 / FAQ
        </li>
        <li
          className="cursor-pointer px-4 py-5 text-neutral-800"
          onClick={() => router.push("/terms")}
        >
          서비스이용약관 / 개인정보처리방침
        </li>
        <SignoutButton />
        <UserDeleteButton />
      </ul>
    </main>
  );
};

export default SettingsPage;
