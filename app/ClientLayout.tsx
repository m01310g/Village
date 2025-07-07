import HeaderConsumer from "./components/header/HeaderConsumer";
import NavigationBar from "./components/NavigationBar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderConsumer />
      {children}
      <NavigationBar />
    </>
  );
}
