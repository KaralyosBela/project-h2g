import { useSelector } from "react-redux";
import { IMovies } from "../interfaces/movies.interface";

export const moviesSelector = (state: any) => {
  return state.movies.movies
    .filter((movie: IMovies) =>
      movie.title
        .toLowerCase()
        .includes(state.movies.searchedMovie.toLowerCase())
    )
    .filter(
      (movie: IMovies) =>
        state.movies.filterOptions.genre === "" ||
        movie.genre
          .map((genre) => genre.toLowerCase())
          .includes(state.movies.filterOptions.genre)
    )
    //IMovies nem okés itt
    .sort((a: any, b: any) => {
      if (state.movies.sortOptions.sortOrder === "ascending") {
        switch (state.movies.sortOptions.sortKey) {
          case "releaseDate":
            return a.release_date - b.release_date;
          case "length":
            return a.runtime.split(" ")[0] - b.runtime.split(" ")[0];
          case "rating":
            return a.rating - b.rating;
        }
      } else {
        switch (state.movies.sortOptions.sortKey) {
          case "releaseDate":
            return b.release_date - a.release_date;
          case "length":
            return b.runtime.split(" ")[0] - a.runtime.split(" ")[0];
          case "rating":
            return b.rating - a.rating;
        }
      }
      return a.release_date - b.release_date;
    });
};

export const useMovies = () => useSelector(moviesSelector);
