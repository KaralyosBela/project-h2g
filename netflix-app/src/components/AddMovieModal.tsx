import classes from "./AddMovieModal.module.css";
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { addMovie } from "../features/moviesSlice";
import React, { useState } from "react";
import {AddMovieSuccessModal} from "./AddMovieSuccessModal";

interface Props {
  show: boolean;
  hide: () => void;
}

export const AddMovieModal: React.FC<Props> = ({ show, hide }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [submitted, setSubmitted] = useState<boolean>(false);

  //Itt nem okés a formevent<htmlform> valami
  const add = (e: any) => {
    e.preventDefault();
    dispatch(addMovie({
      id: "",
      title: e.currentTarget.title.value,
      release_date: e.currentTarget.url.value,
      genre: e.currentTarget.genre.value,
      thumbnail: "https://i.kym-cdn.com/photos/images/original/001/394/314/c62.jpg",
      movie_url: e.currentTarget.url.value,
      rating: e.currentTarget.rating.value,
      runtime: e.currentTarget.runtime.value,
      overview: e.currentTarget.overview.value
    }));
    setSubmitted(true);
    hide();
  };

  const close = () =>{
    setSubmitted(false);
  }

  return (
    <div>
      {submitted && <AddMovieSuccessModal close={close}/>}
      {show && (
        <div>
          <div className={classes.overlay} onClick={hide} />
          <div className={classes.modal}>
            <h1>ADD MOVIE</h1>
            <form onSubmit={add}>
              <div className={classes.modalbody}>
                <div className={classes.leftside}>
                  <label htmlFor="title">TITLE</label>
                  <input type="text" id="title" name="title"></input>
                  <label htmlFor="url">MOVIE URL</label>
                  <input type="text" id="url" name="url"></input>
                  <label htmlFor="genre">GENRE</label>
                  <select name="genre" id="genre">
                    <option value="Horror">Horror</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Action">Action</option>
                  </select>
                </div>

                <div className={classes.rightside}>
                  <label htmlFor="releasedate">RELEASE DATE</label>
                  <input type="date" id="releasedate" name="date"></input>
                  <label htmlFor="rating">RATING</label>
                  <input type="text" id="rating" name="rating"></input>
                  <label htmlFor="runtime">RUNTIME</label>
                  <input type="text" id="runtime" name="runtime"></input>
                </div>
              </div>

              <div className={classes.overview}>
                <label htmlFor="overview">OVERVIEW</label>
                <textarea id="overview" name="overview"></textarea>
              </div>

              <div className={classes.action}>
                <button className={classes.resetBtn}>
                  RESET
                </button>
                <button type="submit" className={classes.submitBtn}>SUBMIT</button>
              </div>
            </form>
            <div className={classes.close} onClick={hide}>
              X
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
