"use client";

import { useRouter } from "next/navigation";

type SignoutErrorResponse = {
  message: string;
  statusCode: number;
  error: string;
};

type SignoutResponse = {
  message: string;
  statusCode: number;
  data: {
    accessToken: string;
    refreshToken: string;
    webUser: {
      id: number;
      nickname: string;
      email: string;
      role: "USER";
    };
  };
};

const SignoutButton = () => {
  const router = useRouter();

  const handleSignout = async () => {
    try {
      const res = await fetch("/web-auth/signout", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        const error: SignoutErrorResponse = await res.json();
        console.error("로그아웃 실패:", error.message);
      } else {
        const data: SignoutResponse = await res.json();
        console.log(data.message);
        router.replace("/signin");
      }
    } catch (err: any) {
      console.error(
        err instanceof Error ? err.message : "로그아웃 중 오류 발생",
      );
    }
  };

  return <button onClick={handleSignout}>로그아웃</button>;
};

export default SignoutButton;
