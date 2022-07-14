import classes from "./AddMovieModal.module.css";
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { addMovie } from "../features/moviesSlice";
import React, { useState } from "react";
import { AddMovieSuccessModal } from "./AddMovieSuccessModal";
import Select from "react-select/";
import {CgClose} from "react-icons/cg"

interface Props {
  hide: () => void;
}

export const AddMovieModal: React.FC<Props> = ({ hide }) => {
  const dispatch = useDispatch<AppDispatch>();

  //Success modal visible controll
  const [submitted, setSubmitted] = useState<boolean>(false);

  //Set the form input fields
  const [title, setTitle] = useState<string>("")
  const [genre, setGenre] = useState<string[]>([])
  const [movieUrl, setMovieUrl] = useState<string>("")
  const [overview, setOverview] = useState<string>("")
  const [rating, setRating] = useState<number>(0)
  const [releaseDate, setReleaseDate] = useState<string>("")
  const [runtime, setRuntime] = useState<number>(0)

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
  const ratingOnChange = (event: React.ChangeEvent<HTMLInputElement>) => { setRating(Number.parseInt(event.currentTarget.value)) };
  const releaseDateOnChange = (event: React.ChangeEvent<HTMLInputElement>) => { setReleaseDate(event.currentTarget.value) };
  const runTimeOnChange = (event: React.ChangeEvent<HTMLInputElement>) => { setRuntime(Number.parseInt(event.currentTarget.value)) };

  const add = (event: any) => {
    event.preventDefault();
    dispatch(addMovie({
      id: "",
      title: title,
      release_date: releaseDate.slice(0, 4),
      genres: genre,
      runtime: runtime,
      overview: event.currentTarget.overview.value,
      tagline: "dummyData",
      vote_average: 0,
      budget: 0,
      revenue: 0,
      vote_count: rating,
      poster_path: "https://i.kym-cdn.com/photos/images/original/001/394/314/c62.jpg"
    }));
    setSubmitted(true);
    hide();
  };

  const close = () => {
    setSubmitted(false);
  }

  const reset = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    // dispatch(resetForm());
    setTitle("");
    setGenre([""]);
    setMovieUrl("");
    setOverview("");
    setRating(0);
    setReleaseDate("");
    setRuntime(0);
  }

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
      {submitted && <AddMovieSuccessModal close={close} />}
      <div>
        <div className={classes.overlay} onClick={hide} />
        <div className={classes.modal}>
          <h1>ADD MOVIE</h1>
          <form onSubmit={add}>
            <div className={classes.modalbody}>
              <div className={classes.leftside}>
                <label htmlFor="title">TITLE</label>
                <input type="text" id="title" name="title" value={title} onChange={titleOnChange}></input>
                <label htmlFor="url">MOVIE URL</label>
                <input type="text" id="url" name="url" value={movieUrl} onChange={movieUrlOnChange}></input>
                <label htmlFor="genre">GENRE</label>
                <Select options={options} isMulti={true} onChange={genreOnChange}/>
              </div>

              <div className={classes.rightside}>
                <label htmlFor="releasedate">RELEASE DATE</label>
                <input type="date" id="releasedate" name="date" value={releaseDate} onChange={releaseDateOnChange}></input>
                <label htmlFor="rating">RATING</label>
                <input type="number" id="rating" name="rating" value={rating} onChange={ratingOnChange}></input>
                <label htmlFor="runtime">RUNTIME</label>
                <input type="number" id="runtime" name="runtime" value={runtime} onChange={runTimeOnChange}></input>
              </div>
            </div>

            <div className={classes.overview}>
              <label htmlFor="overview">OVERVIEW</label>
              <textarea id="overview" name="overview" value={overview} onChange={overviewOnChange}></textarea>
            </div>

            <div className={classes.action}>
              <button className={classes.resetBtn} onClick={reset}>
                RESET
              </button>
              <button type="submit" className={classes.submitBtn}>SUBMIT</button>
            </div>
          </form>
          <div className={classes.close} onClick={hide}>
            <CgClose size={30}/>
          </div>
        </div>
      </div>
    </>
  );
};
