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

export const addMovies = createAsyncThunk(
  "movies/addMovie",
  async (args: IMovies, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8000/movies", {
        args
        //kell még ide egy id
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface moviesState {
  movies: IMovies[];
  error: string;
  status: boolean;
  numberOfMovies: number;
}

const initialState: moviesState = {
  movies: [],
  error: "",
  status: false,
  numberOfMovies: 0,
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
    builder
      .addCase(
        getMovies.fulfilled,
        //ide raktam át a map loopot a thunkból akkor hibát kaptam
        (state, action: PayloadAction<IMovies>) => {
          state.movies = Object.values(action.payload);
          state.status = true;
          state.error = "";
          state.numberOfMovies = state.movies.length;
          console.log(state.movies);
        }
      )
      .addCase(getMovies.pending, (state) => {
        console.log("Pending");
        state.status = false;
      })
      .addCase(getMovies.rejected, (state, action) => {
        console.log(action.payload);
        state.error = "error bruh";
      });
  },
});

export const { addMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
