import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, FC } from "react";
import SharedLayout from "./SharedLayout";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const TransactionPage = lazy(
  () => import("../pages/TransactionPage/TransactionPage")
);

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/transaction" element={<TransactionPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default App;
