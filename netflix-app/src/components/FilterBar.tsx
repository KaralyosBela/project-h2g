import classes from "./FilterBar.module.css";
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import {filterByGenre} from "../features/moviesSlice";
interface Props {
  movieCount: number
}

export const FilterBar: React.FC<Props> = ({movieCount}) => {
  
  const dispatch = useDispatch<AppDispatch>();

  const filterBy = (filter: string) => {
    dispatch(filterByGenre(filter));
  }

  return (
    <div>
      <div className={classes.filterBar}>
        <div className={classes.categories}>
          <button onClick={() => {filterBy("all")}}>All</button>
          <button onClick={() => {filterBy("action")}}>Action</button>
          <button onClick={() => {filterBy("comedy")}}>Comedy</button>
          <button onClick={() => {filterBy("horror")}}>Horror</button>
          <button onClick={() => {filterBy("crime")}}>Crime</button>
        </div>
        <div className={classes.sortSection}>
          <div>Sort by</div>
          <select id="sortby">
            <option value="1">Release date</option>
            <option value="2">Release date</option>
          </select>
        </div>
      </div>
      <hr/>
      <div className={classes.movieCounter}>
        <span>{movieCount}</span> movies found
      </div>
    </div>
  );
};
