import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IMovies } from "../interfaces/movies.interface";

const moviesAPI = createAsyncThunk(
  "movies/getAllMovies",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://my-json-server.typicode.com/karalyosbela/json-server/movies"
      );

      const data = response.data.map((item: IMovies) => {
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

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
