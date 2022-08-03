import { useSelector } from "react-redux";
import { IMovie } from "../interfaces/movies.interface";

const moviesSelector = (state: {
  //it was state: any before, not this object
  movies: {
    movies: IMovie[];
    searchedMovie: string;
    filterOptions: { genre: string };
    sortOptions: { sortOrder: string; sortKey: string };
  };
}) => {
  return state.movies.movies
    .filter((movie: IMovie) =>
      movie.title
        .toLowerCase()
        .includes(state.movies.searchedMovie.toLowerCase())
    )
    .filter(
      (movie: IMovie) =>
        state.movies.filterOptions.genre === "" ||
        movie.genres
          .map((genre) => genre.toLowerCase())
          .includes(state.movies.filterOptions.genre)
    )
    .sort((a: IMovie, b: IMovie) => {
      if (state.movies.sortOptions.sortOrder === "ascending") {
        switch (state.movies.sortOptions.sortKey) {
          case "releaseDate":
            return (
              Number.parseInt(a.release_date) - Number.parseInt(b.release_date)
            );
          case "length":
            return a.runtime - b.runtime;
          case "rating":
            return a.vote_count - b.vote_count;
        }
      } else {
        switch (state.movies.sortOptions.sortKey) {
          case "releaseDate":
            return (
              Number.parseInt(b.release_date) - Number.parseInt(a.release_date)
            );
          case "length":
            return b.runtime - a.runtime;
          case "rating":
            return b.vote_count - a.vote_count;
        }
      }
      return Number.parseInt(a.release_date) - Number.parseInt(b.release_date);
    });
};


export const useMovies = () => useSelector(moviesSelector);
