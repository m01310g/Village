"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const KakaoSigninButton = () => {
  const router = useRouter();
  const handleSignin = () => {
    const kakaoAuthUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-auth/kakao`;
    router.replace(kakaoAuthUrl);
  };

  return (
    <button
      onClick={handleSignin}
      className="flex w-full items-center justify-center gap-2 rounded-[12px] bg-[#FEE500] px-2 py-3"
    >
      <Image
        src={"/icons/kakao-icon.svg"}
        alt="카카오 로그인"
        width={20}
        height={20}
      />
      Kakao로 시작하기
    </button>
  );
};

export default KakaoSigninButton;
