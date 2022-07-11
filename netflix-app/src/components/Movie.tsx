import { useState } from "react";
import { IMovies } from "../interfaces/movies.interface";
import { DeleteMovieModal } from "./DeleteMovieModal";
import { EditMovieModal } from "./EditMovieModal";
import classes from "./Movie.module.css";
import {deleteMovie} from "../features/moviesSlice";
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";

interface Props {
  movie: IMovies;
}

export const Movie: React.FC<Props> = ({ movie }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  }

  const hideModal = () => {
    setEditModalOpen(false);
    setDeleteModalOpen(false);
  }

  const delMovie = () => {
    dispatch(deleteMovie(movie))
    hideModal();
  }

  return (
    <div>
      <DeleteMovieModal hide={hideModal} show={deleteModalOpen} delMovie={delMovie}/>
      <EditMovieModal hide={hideModal} show={editModalOpen}/>
      <div className={classes.card}>
        <div className={classes.circle} onClick={toggleModal}>
          <div className={classes.firstDot}></div>
          <div className={classes.secondDot}></div>
          <div className={classes.thirdDot}></div>
        </div>
        {modalOpen && (
          <div className={classes.dropdownMenu}>
            <div className={classes.editModal} onClick={() => setEditModalOpen(!editModalOpen)}>Edit</div>
            <div className={classes.deleteModal} onClick={() => setDeleteModalOpen(!deleteModalOpen)}>Delete</div>
          </div>
        )}
        <img className={classes.image} src={movie.thumbnail} alt="alt"></img>
        <div className={classes.info}>
          <div className={classes.title}>{movie.title}</div>
          <div className={classes.year}>{movie.release_date}</div>
        </div>
        <div className={classes.genre}>{movie.genre}</div>
      </div>
    </div>
  );
};
