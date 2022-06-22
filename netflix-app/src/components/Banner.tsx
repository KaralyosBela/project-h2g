import classes from "./Banner.module.css";

export const Banner: React.FC = () => {
  return (
    <div className={classes.picture}>
      <div className={classes.banner}>
        <div className={classes.upperBar}>
          <div>
            <h4 className={classes.upperBarTitle}>
              <span>netflix</span>Roulette
            </h4>
          </div>
          <button className={classes.addButton}>+ ADD MOVIE</button>
        </div>
        <div className={classes.title}>
          <h1>FIND YOUR MOVIE</h1>
        </div>
        <div className={classes.searchBar}>
          <input placeholder="What do you want to watch?"></input>
          <button className={classes.searchbutton}>SEARCH</button>
        </div>
      </div>
    </div>
  );
};
