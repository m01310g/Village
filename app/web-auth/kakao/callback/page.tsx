"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const KakaoCallbackPage = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      if (!code) return;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-auth/kakao/code?code=${code}`,
        );

        const result = await response.json();
        console.log("로그인 결과:", result);

        router.push("/");
      } catch (err: any) {
        console.error(
          err instanceof Error ? err.message : "로그인 처리 중 오류 발생",
        );
      }
    };
    fetchToken();
  }, [code]);

  return <div>카카오 로그인 처리 중</div>;
};

export default KakaoCallbackPage;
