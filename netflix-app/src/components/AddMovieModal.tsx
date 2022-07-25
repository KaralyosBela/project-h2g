import classes from "./AddMovieModal.module.css";
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { addMovie } from "../features/moviesSlice";
import React, { useState } from "react";
import Select from "react-select/";
import { CgClose } from "react-icons/cg";
import { selectStyle } from "../components/selectStyle";

interface Props {
  hide: () => void;
  submitted: any;
}

export const AddMovieModal: React.FC<Props> = ({ hide, submitted }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [validation, setValidation] = useState<{errorMsg: string, formUnfilled: boolean}>({errorMsg: "", formUnfilled: true});
  const [title, setTitle] = useState<string>("");
  const [genre, setGenre] = useState<string[]>([]);
  const [movieUrl, setMovieUrl] = useState<string>("");
  const [overview, setOverview] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [releaseDate, setReleaseDate] = useState<string>("");
  const [runtime, setRuntime] = useState<number>(0);

  //OnChange handlers
  const titleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
  const genreOnChange = (event: any) => {
    const genres: string[] = event.map((genre: { value: string }) => genre.value);
    setGenre(genres);
  };
  const movieUrlOnChange = (event: React.ChangeEvent<HTMLInputElement>) => setMovieUrl(event.currentTarget.value)
  const overviewOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setOverview(event.currentTarget.value)
  const ratingOnChange = (event: React.ChangeEvent<HTMLInputElement>) => setRating(Number.parseInt(event.currentTarget.value))
  const releaseDateOnChange = (event: React.ChangeEvent<HTMLInputElement>) => setReleaseDate(event.currentTarget.value)
  const runTimeOnChange = (event: React.ChangeEvent<HTMLInputElement>) => setRuntime(Number.parseInt(event.currentTarget.value))

  const add = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formValidation();
    if (!validation.formUnfilled) {
      dispatch(
        addMovie({
          id: "",
          title: title,
          release_date: releaseDate.slice(0, 4),
          genres: genre,
          runtime: runtime,
          overview: event.currentTarget.overview.value,
          tagline: "dummyData",
          vote_average: 10,
          budget: 0,
          revenue: 0,
          vote_count: rating,
          poster_path:
            "https://i.kym-cdn.com/photos/images/original/001/394/314/c62.jpg",
        })
      );
      submitted(true);
      hide();
    }
  };

  const formValidation = () => {
    if (title === "") {
      validation.formUnfilled = true;
      setValidation({
        errorMsg: "Title must be filled out.",
        formUnfilled: true,
      });
    } else if (movieUrl === "") {
      validation.formUnfilled = true;
      setValidation({
        errorMsg: "Movie URL must be filled out.",
        formUnfilled: true,
      });
    } else if (releaseDate === "") {
      validation.formUnfilled = true;
      setValidation({
        errorMsg: "Release date must be filled out.",
        formUnfilled: true,
      });
    } else if (genre.length < 1) {
      validation.formUnfilled = true;
      setValidation({
        errorMsg: "At least choose one genre.",
        formUnfilled: true,
      });
    } else if (overview === "") {
      validation.formUnfilled = true;
      setValidation({
        errorMsg: "Overview must be filled out.",
        formUnfilled: true,
      });
    } else {
      validation.formUnfilled = false;
      setValidation({ errorMsg: "", formUnfilled: false });
    }
  };

  const closeErrorMsg = () => {
    setValidation({errorMsg: "", formUnfilled: false});
  };

  const reset = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setTitle("");
    setGenre([""]);
    setMovieUrl("");
    setOverview("");
    setRating(0);
    setReleaseDate("");
    setRuntime(0);
  };

  const options = [
    { value: "Horror", label: "Horror" },
    { value: "Comedy", label: "Comedy" },
    { value: "Drama", label: "Drama" },
    { value: "Fantasy", label: "Fantasy" },
    { value: "Adventure", label: "Adventure" },
    { value: "Crime", label: "Crime" },
  ];

  return (
    <>
      <div>
        <div className={classes.overlay} onClick={hide} />
        <div className={classes.modal}>
          <h1>ADD MOVIE</h1>
          <form onSubmit={add}>
            <div className={classes.modalbody}>
              <div className={classes.leftside}>
                <label htmlFor="title">TITLE*</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={titleOnChange}
                ></input>
                <label htmlFor="url">MOVIE URL*</label>
                <input
                  type="text"
                  id="url"
                  name="url"
                  value={movieUrl}
                  onChange={movieUrlOnChange}
                ></input>
                <label htmlFor="genre">GENRE*</label>
                <Select
                  options={options}
                  isMulti={true}
                  onChange={genreOnChange}
                  styles={selectStyle}
                />
              </div>

              <div className={classes.rightside}>
                <label htmlFor="releasedate">RELEASE DATE*</label>
                <input
                  type="date"
                  id="releasedate"
                  name="date"
                  value={releaseDate}
                  onChange={releaseDateOnChange}
                ></input>
                <label htmlFor="rating">RATING*</label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={rating}
                  onChange={ratingOnChange}
                ></input>
                <label htmlFor="runtime">RUNTIME*</label>
                <input
                  type="number"
                  id="runtime"
                  name="runtime"
                  value={runtime}
                  onChange={runTimeOnChange}
                ></input>
              </div>
            </div>

            <div className={classes.overview}>
              <label htmlFor="overview">OVERVIEW*</label>
              <textarea
                id="overview"
                name="overview"
                value={overview}
                onChange={overviewOnChange}
              ></textarea>
            </div>

            {validation.formUnfilled && validation.errorMsg && (
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
              <button className={classes.resetBtn} onClick={reset}>
                RESET
              </button>
              <button type="submit" className={classes.submitBtn}>
                SUBMIT
              </button>
            </div>
          </form>
          <div className={classes.close} onClick={hide}>
            <CgClose size={30} />
          </div>
        </div>
      </div>
    </>
  );
};
