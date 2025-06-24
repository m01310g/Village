"use client";
import PlusIcon from "@/public/icons/plus.svg";
import { useRouter } from "next/navigation";

const FloatingButton = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex-end ml-auto flex items-end">
        <div className="absolute bottom-full right-4 mb-[13px] w-max rounded-[999px] bg-background-inverse px-3 py-2 text-sm text-text-onprimary">
          여러분의 이야기를 들려주세요.
          <svg
            className="absolute -bottom-2.5 right-[17px]"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
          >
            <path
              d="M4.28501 7.14169C5.06182 8.43637 6.93818 8.43637 7.71499 7.14169L12 0H0L4.28501 7.14169Z"
              fill="#171717"
            />
          </svg>
        </div>
        <button
          className="h-12 w-12 rounded-[8px] bg-background-brand p-2.5"
          onClick={() => router.push("/post/create")}
        >
          <PlusIcon width="28px" height="28px" color="#ffffff" />
        </button>
      </div>
    </>
  );
};

export default FloatingButton;
