import { useState } from "react";
import { AddMovieModal } from "./AddMovieModal";
import classes from "./Banner.module.css";
import { useDispatch } from "react-redux";
import { getMovies, addMovie, addMovies } from "../features/moviesSlice";
import { AppDispatch } from "../app/store";

export const Banner: React.FC = () => {
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const hideModal = () => {
    setOpenAddModal(false);
  };

  const feccs = () => {
    dispatch(getMovies());
  };

  const add = () => {
    dispatch(
      addMovies({
        title: "x",
        release_date: "X",
        genre: "item.genre",
        thumbnail: "item.thumbnail",
        movie_url: "item.movie_url",
        rating: "item.rating",
        runtime: "item.runtime",
      })
    );
  };

  return (
    <div className={classes.picture}>
      <AddMovieModal show={openAddModal} hide={hideModal} />
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
              add();
            }}
          >
            + ADD MOVIE
          </button>
        </div>
        <div className={classes.title}>
          <h1>FIND YOUR MOVIE</h1>
        </div>
        <div className={classes.searchBar}>
          <input placeholder="What do you want to watch?"></input>
          <button className={classes.searchbutton} onClick={feccs}>
            SEARCH
          </button>
        </div>
      </div>
    </div>
  );
};
