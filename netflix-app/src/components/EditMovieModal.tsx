import classes from "./EditMovieModal.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { useAppSelector } from "../app/hooks";
import React, { useState } from "react";
import { editMovie, resetForm } from "../features/moviesSlice";
import Select from "react-select"

interface Props {
  //Hides the  edit movie modal
  hide: () => void;
}

export const EditMovieModal: React.FC<Props> = ({ hide }) => {
  const dispatch = useDispatch<AppDispatch>();

  //Get the current selected movie from the store
  const selectedMovieDetails = useAppSelector((state) => state.movies.movie);

  //Set the form input fields based on the current selected movie
  const [title, setTitle] = useState<string>(selectedMovieDetails.title)
  const [genre, setGenre] = useState<string[]>(selectedMovieDetails.genre)
  const [movieUrl, setMovieUrl] = useState<string>(selectedMovieDetails.movie_url)
  const [overview, setOverview] = useState<string>(selectedMovieDetails.overview)
  const [rating, setRating] = useState<string>(selectedMovieDetails.rating)
  const [releaseDate, setReleaseDate] = useState<string>(selectedMovieDetails.release_date)
  const [runtime, setRuntime] = useState<string>(selectedMovieDetails.runtime)

  //OnChange handlers
  const titleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => { setTitle(event.currentTarget.value) };
  const genreOnChange = (event: any) => {
    const genres: string[] = event.map((genre: { value: string; }) => genre.value);
    console.log(genres);
    setGenre(genres);
    console.log(genre);
  }; 
  const movieUrlOnChange = (event: React.ChangeEvent<HTMLInputElement>) => { setMovieUrl(event.currentTarget.value) };
  const overviewOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => { setOverview(event.currentTarget.value) };
  const ratingOnChange = (event: React.ChangeEvent<HTMLInputElement>) => { setRating(event.currentTarget.value) };
  const releaseDateOnChange = (event: React.ChangeEvent<HTMLInputElement>) => { setReleaseDate(event.currentTarget.value) };
  const runTimeOnChange = (event: React.ChangeEvent<HTMLInputElement>) => { setRuntime(event.currentTarget.value) };

  const reset = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    // dispatch(resetForm());
    setTitle("");
    setGenre([""]);
    setMovieUrl("");
    setOverview("");
    setRating("");
    setReleaseDate("");
    setRuntime("");
  }

  //Submit the changes of the selected movie
  const submitEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(editMovie({
      id: selectedMovieDetails.id,
      title: title,
      release_date: releaseDate,
      genre: genre,
      thumbnail: selectedMovieDetails.thumbnail,
      movie_url: movieUrl,
      rating: rating,
      runtime: runtime,
      overview: overview
    }));
    hide();
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
              <Select options={options} isMulti={true} onChange={genreOnChange} />
            </div>

            <div className={classes.rightside}>
              <label htmlFor="releasedate">RELEASE DATE</label>
              <input type="text" id="releasedate" value={releaseDate} onChange={releaseDateOnChange}></input>
              <label htmlFor="rating">RATING</label>
              <input type="text" id="rating" value={rating} onChange={ratingOnChange}></input>
              <label htmlFor="runtime">RUNTIME</label>
              <input type="text" id="runtime" value={runtime} onChange={runTimeOnChange}></input>
            </div>
          </div>

          <div className={classes.overview}>
            <label htmlFor="overview">OVERVIEW</label>
            <textarea id="overview" value={overview} onChange={overviewOnChange}></textarea>
          </div>

          <div className={classes.action}>
            <button className={classes.resetBtn} onClick={reset}>RESET</button>
            <button className={classes.submitBtn} type="submit">SUBMIT</button>
          </div>
        </form>
        <div className={classes.close} onClick={hide}>
          &times;
        </div>
      </div>
    </>
  );
};
