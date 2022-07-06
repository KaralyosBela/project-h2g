import classes from "./AddMovieModal.module.css";

interface Props {
  show: boolean;
  hide: () => void;
}

export const AddMovieModal: React.FC<Props> = ({ show, hide }) => {
  return (
    <div>
      {show && (
        <div>
          <div className={classes.overlay} onClick={hide}/>
          <div className={classes.modal}>
            <h1>ADD MOVIE</h1>
            <form>
              <div className={classes.modalbody}>
                <div className={classes.leftside}>
                  <label htmlFor="title">TITLE</label>
                  <input type="text" id="title"></input>
                  <label htmlFor="url">MOVIE URL</label>
                  <input type="text" id="url"></input>
                  <label htmlFor="genre">GENRE</label>
                  <select name="genre" id="genre">
                    <option value="Horror">Volvo</option>
                    <option value="Comedy">Saab</option>
                    <option value="Action">Mercedes</option>
                  </select>
                </div>

                <div className={classes.rightside}>
                  <label htmlFor="releasedate">RELEASE DATE</label>
                  <input type="date" id="releasedate"></input>
                  <label htmlFor="rating">RATING</label>
                  <input type="text" id="rating"></input>
                  <label htmlFor="runtime">RUNTIME</label>
                  <input type="text" id="runtime"></input>
                </div>
              </div>

              <div className={classes.overview}>
                <label htmlFor="overview">OVERVIEW</label>
                <textarea id="overview"></textarea>
              </div>

              <div className={classes.action}>
                <button className={classes.resetBtn}>RESET</button>
                <button className={classes.submitBtn}>SUBMIT</button>
              </div>
            </form>
            <div className={classes.close} onClick={hide}>
              X
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
