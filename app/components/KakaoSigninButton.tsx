"use client";

import { useRouter } from "next/navigation";
import KakaoIcon from "@/public/icons/icn_kakao.svg";

const KakaoSigninButton = () => {
  const router = useRouter();
  const handleSignin = () => {
    const kakaoAuthUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-auth/kakao`;
    router.replace(kakaoAuthUrl);
  };

  return (
    <button
      onClick={handleSignin}
      className="flex w-full items-center justify-center gap-2 rounded-[12px] bg-[#FEE500] px-2 py-3 text-[#191919]"
    >
      <KakaoIcon />
      Kakao로 시작하기
    </button>
  );
};

export default KakaoSigninButton;
