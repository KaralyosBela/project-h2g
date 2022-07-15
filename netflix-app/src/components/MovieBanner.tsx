import { IMovie } from "../interfaces/movies.interface";
import classes from "./MovieBanner.module.css";
import {FaSearch } from "react-icons/fa"
import { setMovieBannerStatus } from "../features/moviesSlice";
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";

interface Props {
  movie: IMovie;
}

export const MovieBanner: React.FC<Props> = ({ movie }) => {
  const dispatch = useDispatch<AppDispatch>();

  const setMovieBannerState = () => {
    dispatch(setMovieBannerStatus(false));
  }

  return (
    <div className={classes.movieBanner}>
      <div className={classes.titleBar}>
        <h3 className={classes.pageTitle}>netflixRoulette</h3>
        <div className={classes.searchIcon} onClick={setMovieBannerState}><FaSearch size={30}/></div>
      </div>
      <div className={classes.infoPart}>
        <img className={classes.image} src={movie.poster_path} alt="alt"></img>
        <div className={classes.movieInfo}>
          <div className={classes.firstRow}>
            <h1 className={classes.title}>{movie.title}</h1>
            <span className={classes.vote_average}>
            {movie.vote_average}
            </span>
          </div>
          <p className={classes.genre}>{movie.genres.join(", ")}</p>
          <div className={classes.secondRow}>
            <h3 className={classes.release_date}>{movie.release_date}</h3>
            <h3 className={classes.runtime}>{movie.runtime} min</h3>
          </div>
          <div className={classes.thirdRow}>
            <p className={classes.overview}>{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
