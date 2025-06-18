const LoginButton = () => {
  const handleLogin = () => {
    // const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=http://localhost:3000/web-auth/kakao/callback&response_type=code`;
    const kakaoAuthUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/web-auth/kakao`;
    window.location.href = kakaoAuthUrl;
  };

  return <button onClick={handleLogin}>로그인</button>;
};

export default LoginButton;
