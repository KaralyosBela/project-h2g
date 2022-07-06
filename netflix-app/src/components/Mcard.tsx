import classes from "./Mcard.module.css";

export const Mcard: React.FC = () => {
    return <div>
        <div>
        <div className={classes.card}>
          <div className={classes.circle}>
            <div className={classes.firstDot}></div>
            <div className={classes.secondDot}></div>
            <div className={classes.thirdDot}></div>
          </div>
          <img className={classes.image} src="https://m.media-amazon.com/images/M/MV5BOGE4NzU1YTAtNzA3Mi00ZTA2LTg2YmYtMDJmMThiMjlkYjg2XkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg" alt="alt"></img>
          <div className={classes.info}>
            <div className={classes.title}>cim</div>
            <div className={classes.year}>1995</div>
          </div>
          <div className={classes.genre}>action</div>
        </div>
      </div>
    </div>;
  };