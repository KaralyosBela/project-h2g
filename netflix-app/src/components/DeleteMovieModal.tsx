import classes from "./DeleteMovieModal.module.css";
import { ModalHolder } from "./ModalHolder";

export const DeleteMovieModal: React.FC = () => {
  return (
    <ModalHolder>
    <div>
      <div className={classes.deleteModal}>
        <h1 className={classes.title}>DELETE MOVIE</h1>
        <div className={classes.subtitle}>
          Are you sure you want to delete this movie?
        </div>
        <button>CONFIRM</button>
        <div className={classes.close}>X</div>
      </div>
    </div>
    </ModalHolder>
  );
};
