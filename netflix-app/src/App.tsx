import { Route, Routes } from "react-router-dom";
import { Banner } from "./components/Banner";
import { Footer } from "./components/Footer";
import { MovieList } from "./components/MovieList";
import { HomePage } from "./pages/HomePage";
import { Layout } from "./ui/Layout";

export const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
};
