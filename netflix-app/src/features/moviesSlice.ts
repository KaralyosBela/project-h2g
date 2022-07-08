import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IMovies } from "../interfaces/movies.interface";
import { v4 } from "uuid";

export const getMovies = createAsyncThunk(
  //this is the type
  "movies/getMovies",
  //this is the payload
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/movies");

      const movieData = response.data.map((item: IMovies) => {
        return {
          id: item.id,
          title: item.title,
          release_date: item.release_date,
          genre: item.genre,
          thumbnail: item.thumbnail,
          movie_url: item.movie_url,
          rating: item.rating,
          runtime: item.runtime,
        };
      });

      return movieData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addMovie = createAsyncThunk(
  "movies/addMovie",
  async (movie: IMovies, { rejectWithValue }) => {
    //adding a uniqe id to the movie
    movie.id = v4();
    try {
      axios.post("http://localhost:8000/movies", movie);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (movie: IMovies, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/movies/${movie.id}`
      );
      console.log(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface moviesState {
  moviesAPI: IMovies[];
  numberOfMovies: number;
  movies: IMovies[];
  searchedMovie: string;
  movie: IMovies;
}

const initialState: moviesState = {
  moviesAPI: [],
  numberOfMovies: 0,
  movies: [],
  searchedMovie: "",
  movie: {
    id: "",
    genre: "",
    movie_url: "",
    rating: "",
    release_date: "",
    runtime: "",
    thumbnail: "",
    title: "",
  },
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    updateSearchedMovie: (state, action) => {
      state.searchedMovie = action.payload;
    },
    searchMovie: (state) => {
      console.log(state.searchedMovie);
      state.movies = state.moviesAPI.filter((movie) =>
        movie.title.toLowerCase().includes(state.searchedMovie.toLowerCase())
      );
      state.numberOfMovies = state.movies.length;
      console.log(state.movies);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getMovies.fulfilled,
        //ide raktam át a map loopot a thunkból akkor hibát kaptam
        (state, action: PayloadAction<IMovies>) => {
          state.moviesAPI = Object.values(action.payload);
          state.numberOfMovies = state.moviesAPI.length;
          console.log(state.moviesAPI);

          //bruh
          state.movies = state.moviesAPI;
        }
      )
      .addCase(getMovies.pending, (state) => {
        console.log("Pending");
      })
      //actionnak type kell még
      .addCase(getMovies.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(
        addMovie.fulfilled,
        //ide raktam át a map loopot a thunkból akkor hibát kaptam
        (state) => {
          state.numberOfMovies++;
        }
      );
  },
});

export const { updateSearchedMovie, searchMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
