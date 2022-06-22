import { Banner } from "../components/Banner";
import { Footer } from "../components/Footer";
import { MovieList } from "../components/MovieList";
import { Layout } from "../ui/Layout";

export const HomePage: React.FC = () => {
  return (
    <div>
      <Layout>
        <Banner />
        <MovieList />
        <Footer/>
      </Layout>
    </div>
  );
};
