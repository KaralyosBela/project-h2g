import { useState } from "react";
import { IMovie } from "../interfaces/movies.interface";
import { DeleteMovieModal } from "./DeleteMovieModal";
import { EditMovieModal } from "./EditMovieModal";
import classes from "./Movie.module.css";
import { setChoosenMovie, setMovieBannerStatus } from "../features/moviesSlice";
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";

interface Props {
  movie: IMovie;
}

export const Movie: React.FC<Props> = ({ movie }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  //Toggle small edit/delete circle modal on card
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  //Hide edit/delete modal (passed down to edit and delete modal)
  const hideModal = () => {
    setEditModalOpen(false);
    setDeleteModalOpen(false);
  };

  const editModalEvent = () => {
    dispatch(setChoosenMovie(movie));
    setEditModalOpen(!editModalOpen);
    toggleModal();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteModalEvent = () => {
    dispatch(setChoosenMovie(movie));
    setDeleteModalOpen(!deleteModalOpen);
    toggleModal();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const infoModalEvent = () => {
    dispatch(setMovieBannerStatus(true));
    dispatch(setChoosenMovie(movie));
    toggleModal();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const onMouseLeaveToggle = () => {
    if (modalOpen) {
      setModalOpen(false);
    }
  };

  return (
    <div>
      {editModalOpen && <EditMovieModal hide={hideModal} />}
      {deleteModalOpen && <DeleteMovieModal hide={hideModal} />}
      <div data-testid="card" className={classes.card} onClick={toggleModal} onMouseLeave={onMouseLeaveToggle}>
        <div data-testid="circle" className={classes.circle} onClick={toggleModal}>
          <div className={classes.firstDot}></div>
          <div className={classes.secondDot}></div>
          <div className={classes.thirdDot}></div>
        </div>
        {modalOpen && (
          <div className={classes.dropdownMenu}>
            <div className={classes.infoModal} onClick={infoModalEvent}>
              Info
            </div>
            <div className={classes.editModal} onClick={editModalEvent}>
              Edit
            </div>
            <div className={classes.deleteModal} onClick={deleteModalEvent}>
              Delete
            </div>
          </div>
        )}
        <img className={classes.image} src={movie.poster_path} alt="Not found"></img>
        <div className={classes.info}>
          <div className={classes.title}>{movie.title}</div>
          <div className={classes.year}>{movie.release_date}</div>
        </div>
        <div className={classes.genre}>{movie.genres.join(", ")}</div>
      </div>
    </div>
  );
};
