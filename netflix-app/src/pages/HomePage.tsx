import { Banner } from "../components/Banner";
import { FilterBar } from "../components/FilterBar";
import { Footer } from "../components/Footer";
import { MovieList } from "../components/MovieList";
import { Layout } from "../ui/Layout";

export const HomePage: React.FC = () => {
  return (
    <div>
      <Layout>
        <Banner />
        <FilterBar/>
        <MovieList />
        <Footer/>
      </Layout>
    </div>
  );
};
