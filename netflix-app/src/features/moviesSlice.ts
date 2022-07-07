import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IMovies } from "../interfaces/movies.interface";

export const getMovies = createAsyncThunk(
  //this is the type
  "movies/getMovies",
  //this is the payload
  async () => {
    try {
      const response = await axios.get(
        "https://my-json-server.typicode.com/karalyosbela/json-server/movies"
      );

      const data = response.data;

      // const movieData = data.movies.map((item: IMovies) => {
      //   return {
      //     title: item.title,
      //     release_date: item.release_date,
      //     genre: item.genre,
      //     thumbnail: item.thumbnail,
      //     movie_url: item.movie_url,
      //     rating: item.rating,
      //     runtime: item.runtime,
      //   };
      // });

      return data;
    } catch (error) {}
  }
);

//ezt miért így kell megadni, miért nem lehet egyben
//const inState: IMovies[] = { movies: [] }

interface moviesState {
  movies: IMovies[];
}

const initialState: moviesState = {
  movies: [],
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  //A reducerben lévő fgv-ek fogják updatelni a statet
  reducers: {
    addMovie: (state, action: PayloadAction<IMovies>) => {
      state.movies = [...state.movies, action.payload];
      console.log(state.movies);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getMovies.fulfilled,
      (state, action: PayloadAction<IMovies>) => {
        state.movies = Object.values(action.payload);
        console.log(state.movies);
      }
    );
  },
});

export const { addMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
