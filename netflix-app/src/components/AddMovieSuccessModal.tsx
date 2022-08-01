import classes from "./AddMovieSuccessModal.module.css";
import {AiFillCheckCircle} from "react-icons/ai"
import {CgClose} from "react-icons/cg"

interface Props {
  close: () => void
}

export const AddMovieSuccessModal: React.FC<Props> = ({ close }) => {
  return (
    <>
      <div data-testid="overlay" className={classes.overlay} onClick={close} />
      <div className={classes.successModal}>
        <div className={classes.icon}><AiFillCheckCircle size={80}/></div>
        <h1 className={classes.title}>CONGRATULATIONS!</h1>
        <div className={classes.subtitle}>
          The movie has been added to the <br /> database successfully
        </div>
        <div className={classes.close} onClick={close}>              
        <CgClose size={30}/>
        </div>
      </div>
    </>
  );
};
