"use client";

import Input from "@/app/components/Input";
import { useState } from "react";
import Button from "@/app/components/Button";
import ProfileImageSection from "./components/ProfileImageSection";
import CareerSection from "./components/CareerSection";
import IntroduceSection from "./components/IntroduceSection";
import CreateButton from "./components/CreateButton";

const ProfileCreatePage = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [nicknameError, setNicknameError] = useState<string | null>(null);

  const [isNameComposing, setIsNameComposing] = useState(false);
  const [isNicknameComposing, setIsNicknameComposing] = useState(false);

  const isValidName = (value: string) => /^[가-힣a-zA-Z]+$/.test(value);
  const isValidNickname = (value: string) => {
    const allowed = /^[가-힣a-zA-Z0-9._-]+$/;
    const containsEmoji =
      /[\p{Emoji}]/u.test(value) ||
      /[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(value);
    return allowed.test(value) && !containsEmoji;
  };

  const handleInputChange = (
    type: "name" | "nickname",
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;

    if (type === "name") {
      setName(value);
      if (value === "") {
        setNameError("이름을 입력해주세요.");
      } else if (!isValidName(value)) {
        setNameError("숫자 및 특수문자는 입력이 불가능합니다.");
      } else {
        setNameError(null);
      }
    } else {
      setNickname(value);
      if (value === "") {
        setNicknameError("닉네임을 입력해주세요.");
      } else if (!isValidNickname(value)) {
        setNicknameError(
          "밑줄, 점, 하이픈 외 특수문자, 이모지는 입력이 불가능합니다.",
        );
      } else {
        setNicknameError(null);
      }
    }
  };

  const handleCompositionStart = (type: "name" | "nickname") => {
    if (type === "name") setIsNameComposing(true);
    else setIsNicknameComposing(true);
  };

  const handleCompositionEnd = (
    type: "name" | "nickname",
    e: React.CompositionEvent<HTMLInputElement>,
  ) => {
    const value = e.currentTarget.value;
    if (type === "name") {
      setIsNameComposing(false);
      if (!isValidName(value)) {
        setNameError("숫자 및 특수문자는 입력이 불가능합니다.");
      } else {
        setNameError(null);
      }
    } else {
      setIsNicknameComposing(false);
      if (!isValidNickname(value)) {
        setNicknameError(
          "밑줄, 점, 하이픈 외 특수문자, 이모지는 입력이 불가능합니다.",
        );
      } else {
        setNicknameError(null);
      }
    }
  };

  const isFormValid =
    name !== "" &&
    nickname !== "" &&
    !nameError &&
    !nicknameError &&
    !isNameComposing &&
    !isNicknameComposing;

  return (
    <div className="flex h-full flex-col items-center">
      <form className="flex w-full max-w-[375px] flex-1 flex-col gap-8 overflow-y-auto p-4">
        <ProfileImageSection />
        <Input
          label={"이름"}
          value={name}
          onChange={(e) => handleInputChange("name", e)}
          required
          placeholder="실명을 입력해주세요."
          maxLength={10}
          description="내 이력과 프로필에만 표시됩니다."
          errorMessage={nameError!}
          onCompositionEnd={(e) => handleCompositionEnd("name", e)}
          onCompositionStart={() => handleCompositionStart("name")}
        />
        <Input
          label={"닉네임"}
          value={nickname}
          onChange={(e) => handleInputChange("nickname", e)}
          required
          placeholder="닉네임을 입력해주세요"
          maxLength={15}
          description="커뮤니티 활동 시 표시됩니다."
          errorMessage={nicknameError!}
          onCompositionEnd={(e) => handleCompositionEnd("nickname", e)}
          onCompositionStart={() => handleCompositionStart("nickname")}
        />
        <Input
          label="업종"
          required
          value="트레이너"
          disabled
          onChange={() => {}}
        />
        <CareerSection />
        <IntroduceSection />
      </form>

      <CreateButton isFormValid={isFormValid} />
    </div>
  );
};

export default ProfileCreatePage;
