import movieReducers, {
  addMovie,
  deleteMovie,
  editMovie,
  getMovies,
  setChoosenMovie,
  setGenreFilter,
  setMovieBannerStatus,
  setSearchedMovie,
  setSortParams,
} from "../moviesSlice";

describe("movies reducer", () => {
  const initialState = {
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

  //ha üres actiont akarunk meghívni a movie reducerben, ami nem léteik a reducerben, akkor az init state ne változzon
  it("should return the initial state when passed an empty object", () => {
    const initialState = undefined;
    const result = movieReducers(initialState, { type: "" });
    expect(result).toEqual({
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
    });
  });

  it("should change the 'searchedMovie' state", () => {
    const result = movieReducers(
      initialState,
      setSearchedMovie("this_is_the_new_searched_movie_state")
    );
    expect(result).toEqual({
      movies: [],
      searchedMovie: "this_is_the_new_searched_movie_state",
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
    });
  });

  it("should change the 'filterOptions.genre' state", () => {
    const result = movieReducers(initialState, setGenreFilter("comedy"));
    expect(result).toEqual({
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
        genre: "comedy",
      },
      numberOfActionMovies: 0,
    });
  });

  it("should change the 'sortParams' state", () => {
    const result = movieReducers(
      initialState,
      setSortParams({ key: "rating", order: "ascending" })
    );
    expect(result).toEqual({
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
        sortKey: "rating",
        sortOrder: "ascending",
      },
      filterOptions: {
        genre: "",
      },
      numberOfActionMovies: 0,
    });
  });

  it("should change the 'bannerVisible' state", () => {
    const result = movieReducers(initialState, setMovieBannerStatus(true));
    expect(result).toEqual({
      movies: [],
      searchedMovie: "",
      bannerVisible: true,
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
    });
  });

  it("should change the 'movie' state", () => {
    const result = movieReducers(
      initialState,
      setChoosenMovie({
        tagline: "tagline",
        vote_average: 10,
        vote_count: 10,
        poster_path: "path",
        budget: 1110,
        revenue: 110,
        id: "123",
        genres: ["comedy", "horror"],
        release_date: "2021",
        runtime: 180,
        title: "Movie title",
        overview: "this is the overview",
      })
    );

    expect(result).toEqual({
      movies: [],
      searchedMovie: "",
      bannerVisible: false,
      movie: {
        tagline: "tagline",
        vote_average: 10,
        vote_count: 10,
        poster_path: "path",
        budget: 1110,
        revenue: 110,
        id: "123",
        genres: ["comedy", "horror"],
        release_date: "2021",
        runtime: 180,
        title: "Movie title",
        overview: "this is the overview",
      },
      sortOptions: {
        sortKey: "",
        sortOrder: "",
      },
      filterOptions: {
        genre: "",
      },
      numberOfActionMovies: 0,
    });
  });
});

describe("movies async thunk", () => {
  const initialState = {
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

  it("should call 'getMovies'", () => {
    const action = {
      type: getMovies.fulfilled.type,
      payload: {
        tagline: "tagline",
        vote_average: 10,
        vote_count: 10,
        poster_path: "path",
        budget: 1110,
        revenue: 110,
        id: "123",
        genres: ["comedy", "horror"],
        release_date: "2021",
        runtime: 180,
        title: "Movie title",
        overview: "this is the overview",
      },
    };
    const result = movieReducers(initialState, action);
    expect(result.movies.length).toBeTruthy();
  });

  it("should add movie to the movies array", () => {
    const action = {
      type: addMovie.fulfilled.type,
      payload: {
        tagline: "tagline",
        vote_average: 10,
        vote_count: 10,
        poster_path: "path",
        budget: 1110,
        revenue: 110,
        id: "123",
        genres: ["comedy", "horror"],
        release_date: "2021",
        runtime: 180,
        title: "Movie title",
        overview: "this is the overview",
      },
    };
    const result = movieReducers(initialState, action);
    expect(result.movies.length).toBeTruthy();
  });

  it("should add movie to the movies array a second time", () => {
    const action = {
      type: addMovie.fulfilled.type,
      payload: {
        tagline: "tagline",
        vote_average: 10,
        vote_count: 10,
        poster_path: "path",
        budget: 1110,
        revenue: 110,
        id: "123",
        genres: ["comedy", "horror"],
        release_date: "2021",
        runtime: 180,
        title: "Movie title",
        overview: "this is the overview",
      },
    };

    const action2 = {
      type: addMovie.fulfilled.type,
      payload: {
        tagline: "tagline",
        vote_average: 10,
        vote_count: 10,
        poster_path: "path",
        budget: 1110,
        revenue: 110,
        id: "123",
        genres: ["comedy", "horror"],
        release_date: "2021",
        runtime: 180,
        title: "Movie title",
        overview: "this is the overview",
      },
    };
    let result = movieReducers(initialState, action);
    expect(result.movies.length).toEqual(1);
    result = movieReducers(result, action2);
    expect(result.movies.length).toEqual(2);
  });

  it("should delete movie from the movie array", () => {
    const initialState = {
      movies: [
        {
          tagline: "tagline",
          vote_average: 10,
          vote_count: 10,
          poster_path: "path",
          budget: 1110,
          revenue: 110,
          id: "123",
          genres: ["comedy", "horror"],
          release_date: "2021",
          runtime: 180,
          title: "Movie title",
          overview: "this is the overview",
        },
      ],
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

    const action = {
      type: deleteMovie.fulfilled.type,
      payload: {
        tagline: "tagline",
        vote_average: 10,
        vote_count: 10,
        poster_path: "path",
        budget: 1110,
        revenue: 110,
        id: "123",
        genres: ["comedy", "horror"],
        release_date: "2021",
        runtime: 180,
        title: "Movie title",
        overview: "this is the overview",
      },
    };

    let result = movieReducers(initialState, action);
    expect(result.movies.length).toEqual(0);
    expect(result.movies).toEqual([]);
  });

  it("should edit movie from the movie array", () => {
    const initialState = {
      movies: [
        {
          tagline: "tagline",
          vote_average: 10,
          vote_count: 10,
          poster_path: "path",
          budget: 1110,
          revenue: 110,
          id: "123",
          genres: ["comedy", "horror"],
          release_date: "2021",
          runtime: 180,
          title: "Movie title",
          overview: "this is the overview",
        },
      ],
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

    const action = {
      type: editMovie.fulfilled.type,
      payload: {
        tagline: "taglineeee",
        vote_average: 10,
        vote_count: 10,
        poster_path: "path",
        budget: 1110,
        revenue: 110,
        id: "123",
        genres: ["comedy", "horror"],
        release_date: "2021",
        runtime: 180,
        title: "Movie title",
        overview: "this is the overview",
      },
    };

    let result = movieReducers(initialState, action);
    expect(result.movies.length).toEqual(1);
  });
});
