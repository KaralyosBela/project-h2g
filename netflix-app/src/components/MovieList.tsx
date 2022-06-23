import { IMovies } from "../interfaces/movies.interface";
import { Movie } from "./Movie";
import classes from "./MovieList.module.css";

interface Props {
  children: React.ReactNode;
  moviesList: IMovies[];
}

//ha itt kiveszem a childrent nem mukodik
export const MovieList: React.FC<Props> = ({ children, moviesList }) => {
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
