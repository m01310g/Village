import Header from "../components/Header";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header title="프로필" showBackButton />
      <main className="h-[calc(100vh-46px)] overflow-y-auto">{children}</main>
    </>
  );
};

export default ProfileLayout;
