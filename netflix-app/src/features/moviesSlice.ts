import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IMovie } from "../interfaces/movies.interface";

export const getMovies = createAsyncThunk(
  "movies/getMovies",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:4000/movies");

      const movieData: IMovie = response.data.data.map((item: IMovie) => {
        return {
          id: item.id,
          title: item.title,
          tagline: item.tagline,
          vote_average: item.vote_average,
          budget: item.budget,
          revenue: item.revenue,
          release_date: item.release_date.slice(0, 4),
          genres: item.genres,
          poster_path: item.poster_path,
          vote_count: item.vote_count,
          runtime: item.runtime,
          overview: item.overview,
        };
      });
      console.log(movieData);
      return movieData;
    } catch (error: unknown) {
      return rejectWithValue("Fetch failed!");
    }
  }
);

// export const addMovie = async (movie: IMovieWithoutID) => (dispatch: any) => {
//   try {
//     //post without ID
//     axios.post("http://localhost:4000/movies", {
//       title: movie.title,
//       tagline: movie.tagline,
//       vote_average: movie.vote_average,
//       budget: movie.budget,
//       revenue: movie.revenue,
//       release_date: movie.release_date,
//       genres: movie.genres,
//       poster_path: movie.poster_path,
//       vote_count: movie.vote_count,
//       runtime: movie.runtime,
//       overview: movie.overview,
//     });
//     dispatch(getMovies());
//     // return movie;
//   } catch (error) {}
// };

export const addMovie = createAsyncThunk(
  "movies/addMovie",
  async (movie: IMovie, { rejectWithValue }) => {
    console.log(movie);
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
      return movie;
    } catch (error: unknown) {
      return rejectWithValue("Post failed!");
    }
  }
);

export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (movie: IMovie, { rejectWithValue }) => {
    try {
      axios.delete(`http://localhost:4000/movies/${movie.id}`);
      return movie;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const editMovie = createAsyncThunk(
  "movies/editMovie",
  async (movie: IMovie, { rejectWithValue }) => {
    console.log(movie);
    try {
      axios.put(`http://localhost:4000/movies`, movie);
      return movie;
    } catch (error: unknown) {
      return rejectWithValue("Edit failed!");
    }
  }
);

interface moviesState {
  movies: IMovie[];
  searchedMovie: string;
  movie: IMovie;
  bannerVisible: boolean;
  sortOptions: {
    sortKey: string;
    sortOrder: string;
  };
  filterOptions: {
    genre: string;
  };
  numberOfActionMovies: number;
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
    sortOrder: "",
  },
  filterOptions: {
    genre: "",
  },
  numberOfActionMovies: 0,
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSearchedMovie: (state, action: PayloadAction<string>) => {
      state.searchedMovie = action.payload;
    },
    setGenreFilter: (state, action: PayloadAction<string>) => {
      state.filterOptions.genre = action.payload;
    },
    setSortParams: (
      state,
      action: PayloadAction<{ key: string; order: string }>
    ) => {
      state.sortOptions.sortKey = action.payload.key;
      state.sortOptions.sortOrder = action.payload.order;
    },
    setChoosenMovie: (state, action: PayloadAction<IMovie>) => {
      state.movie = action.payload;
    },
    setMovieBannerStatus: (state, action: PayloadAction<boolean>) => {
      state.bannerVisible = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.fulfilled, (state, action: PayloadAction<IMovie>) => {
        state.movies = Object.values(action.payload);
      })
      .addCase(getMovies.rejected, (state, action: any) => {
        console.log(action.payload);
      })
      .addCase(addMovie.fulfilled, (state, action: PayloadAction<IMovie>) => {
        state.movies.push(action.payload);
      })
      .addCase(addMovie.rejected, (state, action: any) => {
        console.log(action.payload);
      })
      .addCase(
        deleteMovie.fulfilled,
        (state, action: PayloadAction<IMovie>) => {
          state.movies = state.movies.filter(
            (movie) => movie.id !== action.payload.id
          );
        }
      )
      .addCase(deleteMovie.rejected, (state, action: any) => {
        console.log(action.payload);
      })
      .addCase(editMovie.fulfilled, (state, action: PayloadAction<IMovie>) => {
        const index = state.movies.findIndex(
          (movie) => movie.id === action.payload.id
        );
        state.movies[index] = action.payload;
      })
      .addCase(editMovie.rejected, (state, action: any) => {
        console.log(action.payload);
      });
  },
});

export const {
  setSearchedMovie,
  setGenreFilter,
  setSortParams,
  setChoosenMovie,
  setMovieBannerStatus,
} = moviesSlice.actions;
export default moviesSlice.reducer;
