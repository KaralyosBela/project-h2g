import { useEffect } from "react";
import { Banner } from "../components/Banner";
import { FilterBar } from "../components/FilterBar";
import { Footer } from "../components/Footer";
import { MovieList } from "../components/MovieList";
import { Layout } from "../ui/Layout";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { getMovies } from "../features/moviesSlice";
import { MovieBanner } from "../components/MovieBanner";
import { useMovies } from "../features/movies.hook";
import { useAppSelector } from "../app/hooks";
import { AnyAction } from "@reduxjs/toolkit";

export const HomePage: React.FC = () => {
  const movieSelected = useAppSelector((state) => state.movies.movie);
  const bannerVisible = useAppSelector((state) => state.movies.bannerVisible);
  const dispatch = useDispatch<AppDispatch>();
  const movies = useMovies();

  useEffect(() => {
    dispatch(getMovies() as unknown as AnyAction);
  }, []);

  return (
    <div>
      <Layout>
        {bannerVisible && <MovieBanner movie={movieSelected} />}
        {!bannerVisible && <Banner />}
        <FilterBar movieCount={movies.length} />
        {movies.length > 0 && <MovieList moviesList={movies} />}
        <Footer />
      </Layout>
    </div>
  );
};
