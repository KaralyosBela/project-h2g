import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";

export const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
};
