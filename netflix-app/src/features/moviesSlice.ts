import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IMovie } from "../interfaces/movies.interface";
import { v4 } from "uuid";

export const getMovies = createAsyncThunk(
  "movies/getMovies",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:4000/movies?limit=30");

      const movieData = response.data.data.map((item: IMovie) => {
        return {
          id: item.id,
          title: item.title,
          tagline: item.tagline,
          vote_average: item.vote_average,
          budget: item.budget,
          revenue: item.revenue,
          release_date: item.release_date.slice(0,4),
          genres: item.genres,
          poster_path: item.poster_path,
          vote_count: item.vote_count,
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
  async (movie: IMovie, { rejectWithValue }) => {
    //adding a uniqe id to the movie
    // movie.id = v4();
    console.log(movie);
    try {
      //adjam át id nélkül
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
      return movie;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (movie: IMovie, { rejectWithValue }) => {
    try {
      axios.delete(
        `http://localhost:4000/movies/${movie.id}`
      );
      return movie;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editMovie = createAsyncThunk(
  "movies/editMovie",
  async (movie: IMovie, { rejectWithValue }) => {
    try {
      axios.put(
        `http://localhost:4000/movies`, movie
      );
      return movie;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface moviesState {
  movies: IMovie[]
  searchedMovie: string
  movie: IMovie
  bannerVisible: boolean
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
  bannerVisible: false,
  movie: {
    tagline: "",
    vote_average: 0,
    vote_count: 0,
    poster_path: "",
    budget: 0,
    revenue: 0,
    id: "",
    genres: [],
    release_date: "",
    runtime: 0,
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
    setChoosenMovie: (state, action: PayloadAction<IMovie>) => {
      state.movie = action.payload;
    },
    // resetForm: (state) => {
    //  state.movie.title = "";
    // },
    setMovieBannerStatus: (state, action: PayloadAction<boolean>) => {
      state.bannerVisible = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.fulfilled, (state, action: PayloadAction<IMovie>) => {
        state.movies = Object.values(action.payload);
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
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
  // resetForm,
  setMovieBannerStatus
} = moviesSlice.actions;
export default moviesSlice.reducer;
