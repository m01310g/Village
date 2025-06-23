"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";

const PostLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <main
      className={clsx(
        "bg-background-primary",
        pathname === "/post/create"
          ? "h-[calc(100vh-46px)]"
          : "h-[calc(100vh-46px-70px)]",
      )}
    >
      {children}
    </main>
  );
};

export default PostLayout;
