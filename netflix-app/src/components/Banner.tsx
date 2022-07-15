import React, { useState } from "react";
import { AddMovieModal } from "./AddMovieModal";
import classes from "./Banner.module.css";
import { useDispatch } from "react-redux";
import { setSearchedMovie } from "../features/moviesSlice";
import { AppDispatch } from "../app/store";

export const Banner: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  // const [searched, setSearched] = useState<string>("");

  const hideModal = () => {
    setOpenAddModal(false);
  };

  const openModal = () => {
    setOpenAddModal(true);
  };

  const searchedMovieInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    // setSearched(event.currentTarget.value);
    dispatch(setSearchedMovie(event.currentTarget.value));
  };

  // const searchMovie = () => {
  //   dispatch(setSearchedMovie(searched));
  // };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      dispatch(setSearchedMovie(event.currentTarget.value));
    }
  };

  return (
    <div className={classes.picture}>
      {openAddModal && <AddMovieModal hide={hideModal} />}
      <div className={classes.banner}>
        <div className={classes.upperBar}>
          <div>
            <h4 className={classes.upperBarTitle}>
              <span>netflix</span>Roulette
            </h4>
          </div>
          <button className={classes.addButton} onClick={openModal}>
            ADD MOVIE
          </button>
        </div>
        <div className={classes.title}>
          <h1>FIND YOUR MOVIE</h1>
        </div>
        <div className={classes.searchBar}>
          <input className={classes.searchInput}
            placeholder="What do you want to watch?"
            onChange={searchedMovieInputChange}
            onKeyDown={handleKeyDown}
          ></input>
          {/* <button className={classes.searchbutton} onClick={searchMovie}>
            SEARCH
          </button> */}
        </div>
      </div>
    </div>
  );
};
