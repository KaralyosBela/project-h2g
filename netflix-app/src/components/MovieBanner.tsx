import classes from "./MovieBanner.module.css";

export const MovieBanner = () => {
  return (
    <div className={classes.movieBanner}>
      <div className={classes.titleBar}>
        <div className={classes.title}>netflixroulette</div>
        <div className={classes.searchIcon}>search icon</div>
      </div>
      <div className={classes.infoPart}>
        <div className={classes.thumbnai}>kép</div>
        <div className={classes.movieInfo}>
          <div>Pulp fiction 8.9</div>
          <div>Action adventure</div>
          <div>1994 2h34m</div>
          <div>
            blabla blablablablablablablablablabla blabla
            blablablablablablablablablablablablablablablablablablablablablabla
          </div>
        </div>
      </div>
    </div>
  );
};
