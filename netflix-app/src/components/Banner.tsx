import { useState } from "react";
import { AddMovieModal } from "./AddMovieModal";
import classes from "./Banner.module.css";

export const Banner: React.FC = () => {
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);

  return (
    <div className={classes.picture}>
      {openAddModal && <AddMovieModal/>}
      <div className={classes.banner}>
        <div className={classes.upperBar}>
          <div>
            <h4 className={classes.upperBarTitle}>
              <span>netflix</span>Roulette
            </h4>
          </div>
          <button className={classes.addButton} onClick={()=> setOpenAddModal(!openAddModal)}>+ ADD MOVIE</button>
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
