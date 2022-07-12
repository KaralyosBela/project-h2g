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
          overview: item.overview,
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
      console.log(movie);
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
      const response = await axios.delete(
        `http://localhost:8000/movies/${movie.id}`
      );
      console.log(response);
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
      const response = await axios.patch(
        `http://localhost:8000/movies/${movie.id}`, movie
      );
      console.log(response);
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
    overview: "",
  }
  //sort
  //filter
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
    filterByGenre: (state, action: PayloadAction<string>) => {
      if (action.payload === "all") {
        state.movies = state.moviesAPI;
      } else {
        state.movies = state.moviesAPI.filter((movie) =>
          movie.genre.toLowerCase().includes(action.payload)
        );
      }
      state.numberOfMovies = state.movies.length;
    },
    sortBy: (state, action: PayloadAction<string>) => {
      const sortParams = action.payload.split("_");
      if (sortParams[1] === "Up") {
        switch (sortParams[0]) {
          case "relDate":
            state.movies = [...state.moviesAPI].sort((a: any, b: any) => {
              return a.release_date - b.release_date;
            });
            break;
          case "len":
            state.movies = [...state.moviesAPI].sort((a: any, b: any) => {
              return a.runtime.split(" ")[0] - b.runtime.split(" ")[0];
            });
            break;
          case "rate":
            state.movies = [...state.moviesAPI].sort((a: any, b: any) => {
              return a.rating - b.rating;
            });
            break;
        }
      } else {
        switch (sortParams[0]) {
          case "relDate":
            state.movies = [...state.moviesAPI].sort((a: any, b: any) => {
              return b.release_date - a.release_date;
            });
            break;
          case "len":
            state.movies = [...state.moviesAPI].sort((a: any, b: any) => {
              return b.runtime.split(" ")[0] - a.runtime.split(" ")[0];
            });
            break;
          case "rate":
            state.movies = [...state.moviesAPI].sort((a: any, b: any) => {
              return b.rating - a.rating;
            });
            break;
        }
      }
    },
    setEditedMovie: (state, action: PayloadAction<IMovies>) => {
      state.movie = action.payload;
      console.log(state.movie);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.fulfilled, (state, action: PayloadAction<IMovies>) => {
        state.moviesAPI = Object.values(action.payload);
        state.numberOfMovies = state.moviesAPI.length;
        state.movies = state.moviesAPI;
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
  filterByGenre,
  sortBy,
  setEditedMovie,
} = moviesSlice.actions;
export default moviesSlice.reducer;
