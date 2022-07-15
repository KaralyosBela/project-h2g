import axios from "axios";
import { IMovieWithoutID } from "../interfaces/movies.interface";
import { getMovies } from "./moviesSlice";

export const addMovie = (movie: IMovieWithoutID, dispatch: any) => {
    try {
        axios.post("http://localhost:4000/movies", {
          title: movie.title,
          tagline: movie.tagline,
          vote_average: movie.vote_average,
          budget: movie.budget,
          revenue: movie.revenue,
          release_date: movie.release_date,
          genres: movie.genres,
          poster_path: movie.poster_path,
          vote_count: movie.vote_count,
          runtime: movie.runtime,
          overview: movie.overview,
        });
        console.log("object");
        dispatch(getMovies());
      } catch (error) {}
    }