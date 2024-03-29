import { IMovie } from "../interfaces/movies.interface";
import { Movie } from "./Movie";
import classes from "./MovieList.module.css";

interface Props {
  moviesList: IMovie[];
}

export const MovieList: React.FC<Props> = ({ moviesList }) => {
  return (
    <div className={classes.mainSection}>
      <div className={classes.movieContainer}>
        {moviesList.map((movie, id) => {
          return <Movie key={id} movie={movie} />;
        })}
      </div>
    </div>
  );
};
