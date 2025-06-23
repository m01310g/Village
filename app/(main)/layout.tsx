const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-[calc(100vh-46px-81px)] bg-background-primary">
      {children}
    </main>
  );
};

export default MainLayout;
