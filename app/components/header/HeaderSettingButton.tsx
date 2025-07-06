import { useRouter } from "next/navigation";
import SettingIcon from "@/public/icons/icn_settings.svg";

const HeaderSettingButton = () => {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.push("/settings")}>
      <SettingIcon width="24px" height="24px" color="#171717" />
    </button>
  );
};

export default HeaderSettingButton;
