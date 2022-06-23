import classes from "./Movie.module.css";

export const Movie: React.FC = () => {
  return (
    <div>
      <div className={classes.card}>
        <div className={classes.image}></div>
        <div className={classes.info}>
          <div className={classes.title}>Pulp fiction</div>
          <div className={classes.year}>2004</div>
        </div>
        <div className={classes.genre}>Action & Adventure</div>
      </div>
    </div>
  );
};
