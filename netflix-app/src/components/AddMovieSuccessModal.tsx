import classes from "./AddMovieSuccessModal.module.css";
import { ModalHolder } from "./ModalHolder";

export const AddMovieSuccessModal: React.FC = () => {
  return (
    <div className={classes.successModal}>
      <div className={classes.icon}>(icon helye)</div>
      <h1 className={classes.title}>CONGRATULATIONS!</h1>
      <div className={classes.subtitle}>
        The movie has been added to the <br /> database successfully
      </div>
      <div className={classes.close}>X</div>
    </div>
  );
};
