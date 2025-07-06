"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";

const PostLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <main
      className={clsx(
        "bg-background-primary",
        pathname === "/post/create" || pathname.endsWith("/edit")
          ? "h-[calc(100dvh-46px-env(safe-area-inset-bottom))]"
          : "h-[calc(100dvh-46px-70px-env(safe-area-inset-bottom))]",
      )}
    >
      {children}
    </main>
  );
};

export default PostLayout;
