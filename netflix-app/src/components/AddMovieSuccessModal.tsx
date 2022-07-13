import classes from "./AddMovieSuccessModal.module.css";

interface Props {
  close: () => void
}

export const AddMovieSuccessModal: React.FC<Props> = ({ close }) => {
  return (
    <>
      <div className={classes.overlay} onClick={close} />
      <div className={classes.successModal}>
        <div className={classes.icon}>(icon helye)</div>
        <h1 className={classes.title}>CONGRATULATIONS!</h1>
        <div className={classes.subtitle}>
          The movie has been added to the <br /> database successfully
        </div>
        <div className={classes.close} onClick={close}>              
        &times;
        </div>
      </div>
    </>
  );
};
