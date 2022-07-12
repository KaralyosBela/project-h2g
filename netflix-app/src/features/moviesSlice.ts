import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IMovies } from "../interfaces/movies.interface";
import { v4 } from "uuid";

export const getMovies = createAsyncThunk(
  "movies/getMovies",
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
          overview: item.overview,
        };
      });
      console.log(movieData);
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
      return movie;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (movie: IMovies, { rejectWithValue }) => {
    try {
      axios.delete(
        `http://localhost:8000/movies/${movie.id}`
      );
      return movie;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editMovie = createAsyncThunk(
  "movies/editMovie",
  async (movie: IMovies, { rejectWithValue }) => {
    try {
      axios.patch(
        `http://localhost:8000/movies/${movie.id}`, movie
      );
      return movie;
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
  sortOptions: {
    sortKey: string
    sortOrder: string
  }
  filterOptions: {
    genre: string
  }
}

const initialState: moviesState = {
  moviesAPI: [],
  numberOfMovies: 0,
  movies: [],
  searchedMovie: "",
  movie: {
    id: "",
    genre: [],
    movie_url: "",
    rating: "",
    release_date: "",
    runtime: "",
    thumbnail: "",
    title: "",
    overview: "",
  },
  sortOptions: {
    sortKey: "",
    sortOrder: ""
  },
  filterOptions: {
    genre: ""
  }
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    updateSearchedMovie: (state, action) => {
      state.searchedMovie = action.payload;
    },
    searchMovie: (state) => {
      state.movies = state.moviesAPI.filter((movie) =>
        movie.title.toLowerCase().includes(state.searchedMovie.toLowerCase())
      );
      state.numberOfMovies = state.movies.length;
    },
    setGenreFilter: (state, action) => {
      state.filterOptions.genre = action.payload;
    },
    setSortParams: (state, action) => {
      state.sortOptions.sortKey = action.payload.key;
      state.sortOptions.sortOrder = action.payload.order;
    },
    setEditedMovie: (state, action: PayloadAction<IMovies>) => {
      state.movie = action.payload;
      console.log(state.movie);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.fulfilled, (state, action: PayloadAction<IMovies>) => {
        state.movies = Object.values(action.payload);
        state.numberOfMovies = state.movies.length;
        // state.movies = state.moviesAPI;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
        state.numberOfMovies++;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter(
          (movie) => movie.id !== action.payload.id
        );
      }).addCase(editMovie.fulfilled, (state, action) => {
        const index = state.movies.findIndex((movie) => movie.id === action.payload.id);
        state.movies[index] = action.payload;
      })
  },
});

export const {
  updateSearchedMovie,
  searchMovie,
  setGenreFilter,
  setSortParams,
  setEditedMovie,
} = moviesSlice.actions;
export default moviesSlice.reducer;
