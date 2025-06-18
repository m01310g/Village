"use client";

import Input from "@/app/components/Input";
import { useState } from "react";
import ProfileLabel from "./components/ProfileLabel";
import AddButton from "./components/AddButton";
import Button from "@/app/components/Button";

const ProfileCreatePage = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [introduce, setIntroduece] = useState("");

  return (
    <div className="flex h-full flex-col items-center">
      <form className="flex w-full max-w-[375px] flex-1 flex-col gap-8 overflow-y-auto p-4">
        <Input
          label={"이름"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="실명을 입력해주세요."
          maxLength={10}
          description="내 이력과 프로필에만 표시됩니다."
        />
        <Input
          label={"닉네임"}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
          placeholder="닉네임을 입력해주세요"
          maxLength={15}
          description="커뮤니티 활동 시 표시됩니다."
        />
        <Input
          label="업종"
          required
          value="트레이너"
          disabled
          onChange={() => {}}
        />
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <ProfileLabel label="경력사항" bold />
            <AddButton />
          </div>
          <div className="bg-border-secondary h-[1px] w-full" />
          <p className="text-body-2 py-3 text-center text-neutral-400">
            경력사항을 자유롭게 작성해주세요!
            <br />
            신입이면 넘어가셔도 좋습니다.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <ProfileLabel label="자기소개" />
          <div className="flex flex-col gap-1">
            <textarea
              name="자기소개"
              id="introduce"
              className="border-border-secondary text-body-2 h-[163px] resize-none rounded-[4px] border p-3 text-text-primary outline-none placeholder:text-neutral-400"
              placeholder="자신을 소개해주세요."
              value={introduce}
              onChange={(e) => setIntroduece(e.target.value)}
              maxLength={200}
            />
            <p className="text-caption-3 text-right text-neutral-400">
              {introduce.length}/200
            </p>
          </div>
        </div>
      </form>

      <div className="sticky bottom-0 left-1/2 w-full max-w-[375px] bg-background-primary px-4 py-3">
        <Button size="lg">등록 완료</Button>
      </div>
    </div>
  );
};

export default ProfileCreatePage;
