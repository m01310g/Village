import { useRouter } from "next/navigation";

const HeaderSettingButton = () => {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.push("/settings")}>
      <img
        src={"/icons/icn_settings.svg"}
        alt="설정 버튼"
        width={24}
        height={24}
      />
    </button>
  );
};

export default HeaderSettingButton;
