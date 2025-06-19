type UserDeleteResponse = {
  message: string;
  statusCode: number;
};

type UserDeleteErrorResponse = {
  message: string;
  statusCode: number;
  error: string;
};

const UserDeleteButton = () => {
  const handleUserDelete = async () => {
    try {
      const res = await fetch("/web-auth/delete", {
        method: "POST",
        credentials: "include",
      });

      if (res.status === 201) {
        const data: UserDeleteResponse = await res.json();
        console.log(data.message);
        window.location.href = "/";
      } else if (res.status === 401) {
        const error: UserDeleteErrorResponse = await res.json();
        console.error("권한 오류:", error.message);
        alert("로그인 상태가 만료되었습니다. 다시 로그인해주세요.");
      } else {
        const error = await res.json();
        console.error("알 수 없는 오류:", error.message || res.statusText);
      }
    } catch (err: any) {
      console.error(
        err instanceof Error
          ? err.message
          : "회원 탈퇴 중 오류가 발생했습니다.",
      );
    }
  };
  return <button onClick={handleUserDelete}>탈퇴하기</button>;
};

export default UserDeleteButton;
