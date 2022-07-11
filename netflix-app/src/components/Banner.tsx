import React, { useState } from "react";
import { AddMovieModal } from "./AddMovieModal";
import classes from "./Banner.module.css";
import { useDispatch } from "react-redux";
import { updateSearchedMovie, addMovie, searchMovie } from "../features/moviesSlice";
import { AppDispatch } from "../app/store";
import { useAppSelector } from "../app/hooks";

export const Banner: React.FC = () => {
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const hideModal = () => {
    setOpenAddModal(false);
  };

  const inputChange = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(updateSearchedMovie(e.currentTarget.value))
  }

  const search = () => {
    dispatch(searchMovie())
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if(e.key === "Enter") {
    dispatch(searchMovie())
  }
  }

  return (
    <div className={classes.picture}>
      <AddMovieModal show={openAddModal} hide={hideModal}/>
      <div className={classes.banner}>
        <div className={classes.upperBar}>
          <div>
            <h4 className={classes.upperBarTitle}>
              <span>netflix</span>Roulette
            </h4>
          </div>
          <button
            className={classes.addButton}
            onClick={() => {
              setOpenAddModal(!openAddModal);
            }}
          >
            + ADD MOVIE
          </button>
        </div>
        <div className={classes.title}>
          <h1>FIND YOUR MOVIE</h1>
        </div>
        <div className={classes.searchBar}>
          <input placeholder="What do you want to watch?" onChange={inputChange} onKeyDown={handleKeyDown}></input>
          <button className={classes.searchbutton} onClick={search}>
            SEARCH
          </button>
        </div>
      </div>
    </div>
  );
};
