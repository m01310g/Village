const PostLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-[calc(100vh-46px-70px)] bg-background-primary">
      {children}
    </main>
  );
};

export default PostLayout;
