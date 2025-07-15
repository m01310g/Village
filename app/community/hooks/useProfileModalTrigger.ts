import { UserProfile } from "@/app/(main)/hooks/useUserProfile";
import { useIsLoggedIn } from "@/app/hooks/useIsLoggedIn";
import { useEffect } from "react";

export const useProfileModalTrigger = (
  user: UserProfile | undefined,
  setShowModal: (visible: boolean) => void,
) => {
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    if (user && isLoggedIn && !user.webCareers) {
      setShowModal(true);
    }
  }, [user, setShowModal, isLoggedIn]);
};
