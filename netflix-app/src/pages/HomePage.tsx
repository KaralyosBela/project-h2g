import { useEffect } from "react";
import { Banner } from "../components/Banner";
import { FilterBar } from "../components/FilterBar";
import { Footer } from "../components/Footer";
import { MovieList } from "../components/MovieList";
import { Layout } from "../ui/Layout";
// import { IMovies } from "../interfaces/movies.interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { getMovies } from "../features/moviesSlice";
import { useAppSelector } from "../app/hooks";
import { MovieBanner } from "../components/MovieBanner";

export const HomePage: React.FC = () => {
// const [movies, setMovies] = useState<IMovies[]>([])
// const [moviesCount, setMoviesCount] = useState<number>(0);

const dispatch = useDispatch<AppDispatch>();
const movies = useAppSelector((state) =>state.movies.movies);
const moviesCount = useAppSelector((state) => state.movies.numberOfMovies);

  // const getMovies = async () => {
  //   try {
  //     const response = await fetch("https://my-json-server.typicode.com/karalyosbela/json-server/db", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //     });
  //     const data = await response.json();
   
  //     //local json servernél data.movies.map
  //     const movieData = data.movies.map((item: IMovies) => {
  //       return {
  //           title: item.title,
  //           release_date: item.release_date,
  //           genre: item.genre,
  //           thumbnail: item.thumbnail,
  //           movie_url: item.movie_url,
  //           rating: item.rating,
  //           runtime: item.runtime
  //       };
  //     });

  //     setMoviesCount(movieData.length);
  //     setMovies(movieData);

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    dispatch(getMovies());
  }, []); //eddig benne volt a moviesCount

  return (
    <div>
      <Layout>
        {/* <MovieBanner/> */}
        <Banner />
        <FilterBar movieCount={moviesCount}/>
        {moviesCount !== 0 && <MovieList moviesList={movies}/>}
        <Footer />
      </Layout>
    </div>
  );
};
