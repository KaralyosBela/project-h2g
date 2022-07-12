import classes from "./EditMovieModal.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { useAppSelector } from "../app/hooks";
import { IMovies } from "../interfaces/movies.interface";
import { useEffect, useState } from "react";
import {editMovie} from "../features/moviesSlice";

interface Props {
  hide: () => void;
  // show: boolean;
  movieDetails: IMovies
}
export const EditMovieModal: React.FC<Props> = ({ hide, movieDetails }) => {
  const dispatch = useDispatch<AppDispatch>();

  const selectedMovieDetails = useAppSelector((state) => state.movies.movie);

  const [title, setTitle] = useState<string>(selectedMovieDetails.title)
  const [genre, setGenre] = useState<string[]>(selectedMovieDetails.genre)
  const [movieUrl, setMovieUrl] = useState<string>(selectedMovieDetails.movie_url)
  const [overview, setOverview] = useState<string>(selectedMovieDetails.overview)
  const [rating, setRating] = useState<string>(selectedMovieDetails.rating)
  const [releaseDate, setReleaseDate] = useState<string>(selectedMovieDetails.release_date)
  const [runtime, setRuntime] = useState<string>(selectedMovieDetails.runtime)

  console.log("....");

  const edit = (e: any) => {
    e.preventDefault();
    dispatch(editMovie({
      id: selectedMovieDetails.id,
      title: title,
      release_date: releaseDate,
      genre: genre,
      thumbnail: "https://i.kym-cdn.com/photos/images/original/001/394/314/c62.jpg",
      movie_url: movieUrl,
      rating: rating,
      runtime: runtime,
      overview: overview
    }));
    hide();
  };

  return (
        <>
          <div className={classes.overlay} onClick={hide} />
          <div className={classes.modal}>
            <h1>EDIT MOVIE</h1>
            <form>
              <div className={classes.modalbody}>
                <div className={classes.leftside}>
                  <label htmlFor="title">TITLE</label>
                  <input type="text" id="title"  value={title} onChange={(e) => setTitle(e.currentTarget.value)}></input>
                  <label htmlFor="url">MOVIE URL</label>
                  <input type="text" id="url" value={movieUrl} onChange={(e) => setMovieUrl(e.currentTarget.value)}></input>
                  <label htmlFor="genre">GENRE</label>
                  {/* <select name="genre" id="genre" value={genre} onChange={(e) => setGenre(e.currentTarget.value)}>
                    <option value="Horror">horror</option>
                    <option value="Comedy">comedy</option>
                    <option value="Action">horror</option>
                  </select> */}
                </div>

                <div className={classes.rightside}>
                  <label htmlFor="releasedate">RELEASE DATE</label>
                  <input type="text" id="releasedate" value={releaseDate} onChange={(e) => setReleaseDate(e.currentTarget.value)}></input>
                  <label htmlFor="rating">RATING</label>
                  <input type="text" id="rating" value={rating} onChange={(e) => setRating(e.currentTarget.value)}></input>
                  <label htmlFor="runtime">RUNTIME</label>
                  <input type="text" id="runtime" value={runtime} onChange={(e) => setRuntime(e.currentTarget.value)}></input>
                </div>
              </div>

              <div className={classes.overview}>
                <label htmlFor="overview">OVERVIEW</label>
                <textarea id="overview" value={overview} onChange={(e) => setOverview(e.currentTarget.value)}></textarea>
              </div>

              <div className={classes.action}>
                <button className={classes.resetBtn} onClick={(e) => {e.preventDefault(); console.log(selectedMovieDetails)}}>RESET</button>
                <button className={classes.submitBtn} onClick={edit}>SUBMIT</button>
              </div>
            </form>
            <div className={classes.close} onClick={hide}>
              &times;
            </div>
          </div>
        </>
  );
};
