import classes from "./EditMovieModal.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { useAppSelector } from "../app/hooks";
import React, { useEffect, useState } from "react";
import { editMovie } from "../features/moviesSlice";
import Select from "react-select"
import {CgClose} from "react-icons/cg"
import {selectStyle} from "../components/selectStyle";

interface Props {
  hide: () => void;
}

export const EditMovieModal: React.FC<Props> = ({ hide }) => {
  const dispatch = useDispatch<AppDispatch>();

  //Get the current selected movie from the store
  const selectedMovieDetails = useAppSelector((state) => state.movies.movie);

  const [err, setErr] = useState<boolean>(false);
  const [validation, setValidation] = useState<{
    errorMsg: string;
    valid: boolean;
  }>({ errorMsg: "", valid: true });
  //Set the form input fields based on the current selected movie
  const [title, setTitle] = useState<string>(selectedMovieDetails.title)
  const [genre, setGenre] = useState<string[]>(selectedMovieDetails.genres)
  const [movieUrl, setMovieUrl] = useState<string>(selectedMovieDetails.poster_path)
  const [overview, setOverview] = useState<string>(selectedMovieDetails.overview)
  const [rating, setRating] = useState<number>(selectedMovieDetails.vote_count)
  const [releaseDate, setReleaseDate] = useState<string>(selectedMovieDetails.release_date)
  const [runtime, setRuntime] = useState<number>(selectedMovieDetails.runtime)

  //OnChange handlers
  const titleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
  const genreOnChange = (event: any) => {
    const genres: string[] = event.map((genre: { value: string; }) => genre.value);
    setGenre(genres);
  }; 
  const movieUrlOnChange = (event: React.ChangeEvent<HTMLInputElement>) => setMovieUrl(event.currentTarget.value)
  const overviewOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setOverview(event.currentTarget.value)
  const ratingOnChange = (event: React.ChangeEvent<HTMLInputElement>) => setRating(Number.parseInt(event.currentTarget.value))
  const releaseDateOnChange = (event: React.ChangeEvent<HTMLInputElement>) => setReleaseDate(event.currentTarget.value)
  const runTimeOnChange = (event: React.ChangeEvent<HTMLInputElement>) => setRuntime(Number.parseInt(event.currentTarget.value))

  const reset = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setTitle("");
    setGenre([""]);
    setMovieUrl("");
    setOverview("");
    setRating(0);
    setReleaseDate("");
    setRuntime(0);
  }

  const submitEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validation.valid) {
      setErr(true);
    } else {
      setErr(false);
      dispatch(
        editMovie({
          id: selectedMovieDetails.id,
          title: title,
          release_date: releaseDate,
          genres: genre,
          poster_path: selectedMovieDetails.poster_path,
          runtime: runtime,
          overview: overview,
          tagline: "dummyData",
          vote_average: 10,
          budget: 0,
          revenue: 0,
          vote_count: rating,
        })
      );
      hide();
    }
  };

  useEffect(() => {
    if (title === "") {
      setValidation({ errorMsg: "title error", valid: false });
    } else if (movieUrl === "") {
      setValidation({ errorMsg: "movie url error", valid: false });
    } else if (releaseDate === "") {
      setValidation({ errorMsg: "release date error", valid: false });
    } else if (genre.length < 1) {
      setValidation({ errorMsg: "genre error", valid: false });
    } else if (overview === "") {
      setValidation({ errorMsg: "overview error", valid: false });
    } else {
      setValidation({ errorMsg: "", valid: true });
      setErr(false);
    }
  }, [title, movieUrl, releaseDate, genre, overview]);

  const closeErrorMsg = () => {
    setErr(false);
  };

  const options = [
    { value: 'Horror', label: 'Horror' },
    { value: 'Comedy', label: 'Comedy' },
    { value: 'Drama', label: 'Drama' },
    { value: 'Fantasy', label: 'Fantasy' },
    { value: 'Adventure', label: 'Adventure' },
    { value: 'Crime', label: 'Crime' }
  ]

  return (
    <>
      <div className={classes.overlay} onClick={hide} />
      <div className={classes.modal}>
        <h1>EDIT MOVIE</h1>
        <form onSubmit={submitEdit}>
          <div className={classes.modalbody}>
            <div className={classes.leftside}>
              <label htmlFor="title">TITLE</label>
              <input type="text" id="title" value={title} onChange={titleOnChange}></input>
              <label htmlFor="url">MOVIE URL</label>
              <input type="text" id="url" value={movieUrl} onChange={movieUrlOnChange}></input>
              <label htmlFor="genre">GENRE</label>
              <Select options={options} isMulti={true} onChange={genreOnChange} styles={selectStyle}/>
            </div>

            <div className={classes.rightside}>
              <label htmlFor="releasedate">RELEASE DATE</label>
              <input type="text" id="releasedate" value={releaseDate} onChange={releaseDateOnChange}></input>
              <label htmlFor="rating">RATING</label>
              <input type="number" id="rating" value={rating} onChange={ratingOnChange}></input>
              <label htmlFor="runtime">RUNTIME</label>
              <input type="number" id="runtime" value={runtime} onChange={runTimeOnChange}></input>
            </div>
          </div>

          <div className={classes.overview}>
            <label htmlFor="overview">OVERVIEW</label>
            <textarea id="overview" value={overview} onChange={overviewOnChange}></textarea>
          </div>

          {err && (
              <div className={classes.errorMessage}>
                {validation.errorMsg}
                <CgClose
                  size={20}
                  className={classes.errorCloseIcon}
                  onClick={closeErrorMsg}
                />
              </div>
            )}

          <div className={classes.action}>
            <button className={classes.resetBtn} onClick={reset}>RESET</button>
            <button className={classes.submitBtn} type="submit">SUBMIT</button>
          </div>
        </form>
        <div className={classes.close} onClick={hide}>
          <CgClose size={30}/>
        </div>
      </div>
    </>
  );
};
