import { useIsLoggedIn } from "@/app/hooks/useIsLoggedIn";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useCheckIsLoggedIn = () => {
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn, router]);
};
