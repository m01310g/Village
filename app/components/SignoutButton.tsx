"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { signoutUser } from "../lib/signoutUser";

const SignoutButton = () => {
  const refreshToken = useAuthStore((state) => state.refreshToken);

  const handleSignout = () => {
    signoutUser(refreshToken!);
  };

  return <button onClick={handleSignout}>로그아웃</button>;
};

export default SignoutButton;
