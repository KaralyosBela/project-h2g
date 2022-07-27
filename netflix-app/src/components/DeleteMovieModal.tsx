import classes from "./DeleteMovieModal.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { useAppSelector } from "../app/hooks";
import { deleteMovie } from "../features/moviesSlice";
import { CgClose } from "react-icons/cg";

interface Props {
  hide: () => void;
}
export const DeleteMovieModal: React.FC<Props> = ({ hide }) => {
  const dispatch = useDispatch<AppDispatch>();

  //Get the current selected movie from the store
  const selectedMovie = useAppSelector((state) => state.movies.movie);

  const delMovie = () => {
    dispatch(deleteMovie(selectedMovie));
    hide();
  };

  return (
    <>
      <div data-testid="overlay" className={classes.overlay} onClick={hide} />
      <div className={classes.deleteModal}>
        <h1 className={classes.title}>DELETE MOVIE</h1>
        <div className={classes.subtitle}>
          Are you sure you want to delete this movie?
        </div>
        <button onClick={delMovie}>CONFIRM</button>
        <div className={classes.close} onClick={hide}>
          <CgClose size={30} />
        </div>
      </div>
    </>
  );
};
