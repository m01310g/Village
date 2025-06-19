import Image from "next/image";

const KakaoLoginButton = () => {
  const handleLogin = () => {
    const kakaoAuthUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-auth/kakao`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <button
      onClick={handleLogin}
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

export default KakaoLoginButton;
