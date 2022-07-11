import classes from "./EditMovieModal.module.css";
import { useDispatch } from "react-redux";
import {} from "../features/moviesSlice";
import { AppDispatch } from "../app/store";
import { useAppSelector } from "../app/hooks";
import { IMovies } from "../interfaces/movies.interface";
import { useState } from "react";

interface Props {
  hide: () => void;
  show: boolean;
  movieDetails: IMovies
}
export const EditMovieModal: React.FC<Props> = ({ hide, show, movieDetails }) => {

  const dispatch = useDispatch<AppDispatch>();
  const selectedMovieDetails = useAppSelector((state) => state.movies.movie);
  const [title, setTitle] = useState<string>(selectedMovieDetails.title)

  return (
    <div>
      {show && (
        <>
          <div className={classes.overlay} onClick={hide} />
          <div className={classes.modal}>
            <h1>EDIT MOVIE</h1>
            <form>
              <div className={classes.modalbody}>
                <div className={classes.leftside}>
                  <label htmlFor="title">TITLE</label>
                  <input type="text" id="title" value={movieDetails.title} onChange={(e) => setTitle(e.currentTarget.value)}></input>
                  <label htmlFor="url">MOVIE URL</label>
                  <input type="text" id="url" readOnly value={movieDetails.movie_url}></input>
                  <label htmlFor="genre">GENRE</label>
                  <select name="genre" id="genre">
                    <option value="Horror">horror</option>
                    <option value="Comedy">comedy</option>
                    <option value="Action">horror</option>
                  </select>
                </div>

                <div className={classes.rightside}>
                  <label htmlFor="releasedate">RELEASE DATE</label>
                  <input type="text" id="releasedate"readOnly value={movieDetails.release_date}></input>
                  <label htmlFor="rating">RATING</label>
                  <input type="text" id="rating" readOnly value={movieDetails.rating}></input>
                  <label htmlFor="runtime">RUNTIME</label>
                  <input type="text" id="runtime" readOnly value={movieDetails.runtime}></input>
                </div>
              </div>

              <div className={classes.overview}>
                <label htmlFor="overview">OVERVIEW</label>
                <textarea id="overview" readOnly value={movieDetails.overview}></textarea>
              </div>

              <div className={classes.action}>
                <button className={classes.resetBtn}>RESET</button>
                <button className={classes.submitBtn}>SUBMIT</button>
              </div>
            </form>
            <div className={classes.close} onClick={hide}>
              X
            </div>
          </div>
        </>
      )}
    </div>
  );
};
