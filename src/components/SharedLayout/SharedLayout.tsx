import { Outlet } from "react-router-dom";
import { Suspense, FC } from "react";
import AppBar from "../AppBar";

const SharedLayout: FC = () => {
  return (
    <>
      <AppBar />

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default SharedLayout;
