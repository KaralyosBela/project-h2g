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

export const addMovies = createAsyncThunk(
  "movies/addMovie",
  async (args: IMovies, { rejectWithValue }) => {
    //adding a uniqe id to the movie
    args.id = v4();
    try {
      axios.post("http://localhost:8000/movies", 
        args
      );
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface moviesState {
  moviesAPI: IMovies[];
  error: string;
  status: boolean;
  numberOfMovies: number;
  movies: IMovies[];
  searchedMovie: string
}

const initialState: moviesState = {
  moviesAPI: [],
  error: "",
  status: false,
  numberOfMovies: 0,
  movies: [],
  searchedMovie: ""
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  //A reducerben lévő fgv-ek fogják updatelni a statet
  reducers: {
   updateSearchedMovie: (state, action) => {
    state.searchedMovie = action.payload;
   },
   searchMovie: (state) => {
    console.log(state.searchedMovie);
    state.movies = state.moviesAPI.filter((movie) => movie.title.toLowerCase().includes(state.searchedMovie.toLowerCase()));
    state.numberOfMovies = state.movies.length;
    console.log(state.movies);
   }
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getMovies.fulfilled,
        //ide raktam át a map loopot a thunkból akkor hibát kaptam
        (state, action: PayloadAction<IMovies>) => {
          state.moviesAPI = Object.values(action.payload);
          state.status = true;
          state.error = "";
          state.numberOfMovies = state.moviesAPI.length;
          console.log(state.moviesAPI);

          //bruh
          state.movies = state.moviesAPI;
        }
      )
      .addCase(getMovies.pending, (state) => {
        console.log("Pending");
        state.status = false;
      })
      //actionnak type kell még
      .addCase(getMovies.rejected, (state, action) => {
        console.log(action.payload);
        state.error = "error bruh";
      }).addCase(
        addMovies.fulfilled,
        //ide raktam át a map loopot a thunkból akkor hibát kaptam
        (state) => {
          state.numberOfMovies++;
        }
      )
  },
});

export const { updateSearchedMovie, searchMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
