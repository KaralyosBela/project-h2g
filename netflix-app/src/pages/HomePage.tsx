import { Banner } from "../components/Banner";
import { FilterBar } from "../components/FilterBar";
import { Footer } from "../components/Footer";
import { Movie } from "../components/Movie";
import { MovieList } from "../components/MovieList";
import { Layout } from "../ui/Layout";

export const HomePage: React.FC = () => {
  return (
    <div>
      <Layout>
        <Banner />
        <FilterBar/>
          <MovieList>
            <Movie/>
            <Movie/>
            <Movie/>
            <Movie/>
            <Movie/>
            <Movie/>
            <Movie/>
            <Movie/>
            <Movie/>
          </MovieList>
        <Footer/>
      </Layout>
    </div>
  );
};
