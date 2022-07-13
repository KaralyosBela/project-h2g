import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IMovies } from "../interfaces/movies.interface";
import { v4 } from "uuid";

export const getMovies = createAsyncThunk(
  "movies/getMovies",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:4000/movies");

      const movieData = response.data.data.map((item: IMovies) => {
        return {
          id: item.id,
          title: item.title,
          tagline: item.tagline,
          vote_average: item.vote_average,
          budget: item.budget,
          revenue: item.revenue,
          release_date: item.release_date.slice(0,4),
          genres: item.genres,
          movie_url: item.poster_path,
          rating: item.vote_count,
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
  movies: [],
  searchedMovie: "",
  movie: {
    tagline: "",
    vote_average: "",
    vote_count: "",
    poster_path: "",
    budget: "",
    revenue: "",
    id: "",
    genres: [],
    movie_url: "",
    rating: "",
    release_date: "",
    runtime: "",
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
    setSearchedMovie: (state, action) => {
      state.searchedMovie = action.payload;
    },
    setGenreFilter: (state, action) => {
      state.filterOptions.genre = action.payload;
    },
    setSortParams: (state, action) => {
      state.sortOptions.sortKey = action.payload.key;
      state.sortOptions.sortOrder = action.payload.order;
    },
    setChoosenMovie: (state, action: PayloadAction<IMovies>) => {
      state.movie = action.payload;
    },
    resetForm: (state) => {
      console.log("hehe");
      // state.movie.genre = [];
      // state.movie.movie_url = "";
      // state.movie.overview = "";
      // state.movie.rating = "";
      // state.movie.release_date = "";
      // state.movie.runtime = "";
      // state.movie.thumbnail = "";
     state.movie.title = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.fulfilled, (state, action: PayloadAction<IMovies>) => {
        state.movies = Object.values(action.payload);
        // state.numberOfMovies = state.movies.length;
        // state.movies = state.moviesAPI;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
        // state.numberOfMovies++;
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
  setSearchedMovie,
  setGenreFilter,
  setSortParams,
  setChoosenMovie,
  resetForm
} = moviesSlice.actions;
export default moviesSlice.reducer;
