import { Suspense } from "react";
import ClientSearchPostPage from "./ClientSearchPostPage";

const page = () => {
  return (
    <Suspense fallback={<div></div>}>
      <ClientSearchPostPage />
    </Suspense>
  );
};

export default page;
