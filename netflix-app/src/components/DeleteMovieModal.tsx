import classes from "./DeleteMovieModal.module.css";

interface Props {
  hide: () => void;
  show: boolean;
}

export const DeleteMovieModal: React.FC<Props> = ({ hide, show }) => {
  return (
    <div>
      {show && (
        <>
          <div className={classes.overlay} onClick={hide} />
          <div className={classes.deleteModal}>
            <h1 className={classes.title}>DELETE MOVIE</h1>
            <div className={classes.subtitle}>
              Are you sure you want to delete this movie?
            </div>
            <button>CONFIRM</button>
            <div className={classes.close} onClick={hide}>
              X
            </div>
          </div>
        </>
      )}
    </div>
  );
};
