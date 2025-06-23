"use client";

import SignoutButton from "./components/SignoutButton";
import UserDeleteButton from "./components/UserDeleteButton";

const Page = () => {
  return (
    <>
      <UserDeleteButton />
      <SignoutButton />
    </>
  );
};

export default Page;
