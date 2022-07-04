import { IMovies } from "../interfaces/movies.interface";
import classes from "./Movie.module.css";

interface Props {
  movie: IMovies
}

export const Movie: React.FC<Props> = ({movie}) => {
  return (
    <div>
      <div className={classes.card}>
        <div className={classes.circle}>
          <div className={classes.firstDot}></div>
          <div className={classes.secondDot}></div>
          <div className={classes.thirdDot}></div>
        </div>
        {/* <div className={classes.image}></div> */}
        <img className={classes.image} src={movie.thumbnail} alt="alt"></img>
        <div className={classes.info}>
          <div className={classes.title}>{movie.title}</div>
          <div className={classes.year}>{movie.release_date}</div>
        </div>
        <div className={classes.genre}>{movie.genre}</div>
      </div>
    </div>
  );
};
