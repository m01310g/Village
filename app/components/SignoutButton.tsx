"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { signoutUser } from "../lib/signoutUser";
import { useState } from "react";
import ModalWrapper from "./modal/ModalWrapper";
import Button from "./Button";

const SignoutButton = () => {
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignout = () => {
    signoutUser(refreshToken!);
  };

  return (
    <>
      <li
        className="cursor-pointer px-4 py-5 text-neutral-800"
        onClick={() => setIsModalOpen(true)}
      >
        로그아웃
      </li>
      {isModalOpen && (
        <ModalWrapper onClose={() => setIsModalOpen(false)}>
          <h3 className="text-title-3 text-text-primary">로그아웃</h3>
          <p className="text-body-2 text-text-secondary">
            정말 로그아웃 하시겠어요?
          </p>
          <div className="flex w-full gap-1">
            <Button
              size="lg"
              color="secondaryColor"
              onClick={() => setIsModalOpen(false)}
            >
              취소
            </Button>
            <Button size="lg" onClick={handleSignout}>
              확인
            </Button>
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

export default SignoutButton;
