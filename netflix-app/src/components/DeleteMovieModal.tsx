import classes from "./DeleteMovieModal.module.css";

export const DeleteMovieModal: React.FC = () => {
  return (
    <div>
      return{" "}
      <div className={classes.deleteModal}>
        <h1 className={classes.title}>DELETE MOVIE</h1>
        <div className={classes.subtitle}>
          Are you sure you want to delete this movie?
        </div>
        <button>CONFIRM</button>
        <div className={classes.close}>X</div>
      </div>
    </div>
  );
};
