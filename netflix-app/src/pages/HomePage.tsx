import { useEffect, useState } from "react";
import { Banner } from "../components/Banner";
import { FilterBar } from "../components/FilterBar";
import { Footer } from "../components/Footer";
import { MovieList } from "../components/MovieList";
import { Layout } from "../ui/Layout";
import { IMovies } from "../interfaces/movies.interface";
import { AddMovieModal } from "../components/AddMovieModal";

export const HomePage: React.FC = () => {
const [movies, setMovies] = useState<IMovies[]>([])
const [moviesCount, setMoviesCount] = useState<number>(0);

  const getMovies = async () => {
    try {
      const response = await fetch("movies.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();
   
      const movieData = data.movies.map((item: IMovies) => {
        return {
            title: item.title,
            release_date: item.release_date,
            genre: item.genre,
            thumbnail: item.thumbnail,
            movie_url: item.movie_url,
            rating: item.rating,
            runtime: item.runtime
        };
      });

      setMoviesCount(movieData.length);
      setMovies(movieData);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      <Layout>
        <Banner />
        <FilterBar movieCount={moviesCount}/>
        <MovieList moviesList={movies}/>
        <Footer />
      </Layout>
    </div>
  );
};
