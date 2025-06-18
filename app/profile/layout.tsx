import Header from "../components/Header";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header title="프로필 등록" showBackButton />
      <main className="h-[calc(100vh-46px)] px-4 py-4">{children}</main>
    </>
  );
};

export default ProfileLayout;
