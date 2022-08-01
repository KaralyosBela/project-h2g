import classes from "./AddMovieModal.module.css";
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { addMovie } from "../features/moviesSlice";
import React, { useEffect, useState } from "react";
import Select from "react-select/";
import { CgClose } from "react-icons/cg";
import { selectStyle } from "../components/selectStyle";

interface Props {
  hide: () => void;
  submitted: any;
}

export const AddMovieModal: React.FC<Props> = ({ hide, submitted }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [err, setErr] = useState<boolean>(false);
  const [validation, setValidation] = useState<{
    errorMsg: string;
    valid: boolean;
  }>({ errorMsg: "", valid: true });
  const [title, setTitle] = useState<string>("");
  const [genre, setGenre] = useState<string[]>([]);
  const [movieUrl, setMovieUrl] = useState<string>("");
  const [overview, setOverview] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [releaseDate, setReleaseDate] = useState<string>("");
  const [runtime, setRuntime] = useState<number>(0);

  //OnChange handlers
  const titleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };
  const genreOnChange = (event: any) => {
    const genres: string[] = event.map(
      (genre: { value: string }) => genre.value
    );
    setGenre(genres);
  };
  const movieUrlOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setMovieUrl(event.currentTarget.value);
  const overviewOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setOverview(event.currentTarget.value);
  const ratingOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setRating(Number.parseInt(event.currentTarget.value));
  const releaseDateOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setReleaseDate(event.currentTarget.value);
  const runTimeOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setRuntime(Number.parseInt(event.currentTarget.value));

  useEffect(() => {
    if (title === "") {
      setValidation({ errorMsg: "title error", valid: false });
    } else if (movieUrl === "") {
      setValidation({ errorMsg: "movie url error", valid: false });
    // } else if (releaseDate === "") {
    //   setValidation({ errorMsg: "release date error", valid: false });
    // } else if (genre.length < 1) {
    //   setValidation({ errorMsg: "genre error", valid: false });
    } else if (overview === "") {
      setValidation({ errorMsg: "overview error", valid: false });
    } else {
      setValidation({ errorMsg: "", valid: true });
      setErr(false);
    }
  }, [title, movieUrl, releaseDate, genre, overview]);

  const add = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validation.valid) {
      setErr(true);
    } else {
      setErr(false);
      dispatch(
        addMovie({
          id: "",
          title: title,
          release_date: releaseDate.slice(0, 4),
          genres: genre,
          runtime: runtime,
          overview: overview,
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

  const closeErrorMsg = () => {
    setErr(false);
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
          <form role="form" onSubmit={add}>
            <div className={classes.modalbody}>
              <div className={classes.leftside}>
                <label htmlFor="title">TITLE*</label>
                <input
                  data-testid="title"
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={titleOnChange}
                ></input>
                <label htmlFor="url">MOVIE URL*</label>
                <input
                  data-testid="movieUrl"
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
                  data-testid="relDate"
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
                data-testid="overview"
                id="overview"
                name="overview"
                value={overview}
                onChange={overviewOnChange}
              ></textarea>
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
