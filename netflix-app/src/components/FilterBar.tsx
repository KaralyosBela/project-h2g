import classes from "./FilterBar.module.css";
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { setGenreFilter, setSortParams } from "../features/moviesSlice";
import { useState } from "react";
interface Props {
  movieCount: number
}

export const FilterBar: React.FC<Props> = ({ movieCount }) => {
  const [active, setActive] = useState<number>(1);

  const dispatch = useDispatch<AppDispatch>();

  const sortOptions = [
    {
      label: "Release date asc",
      value: "releaseDate_ascending",
    },
    {
      label: "Release date desc",
      value: "releaseDate_descending",
    },
    {
      label: "Length asc",
      value: "length_ascending",
    },
    {
      label: "Length desc",
      value: "length_descending",
    },
    {
      label: "Rating asc",
      value: "rating_ascending",
    },
    {
      label: "Rating desc",
      value: "rating_descending",
    },
  ]

  const filterBy = (activeTab: number, filter: string) => {
    setActive(activeTab);
    dispatch(setGenreFilter(filter));
  }

  const sort = (sort: string) => {
    dispatch(setSortParams({
      key: sort.split("_")[0],
      order: sort.split("_")[1]
    }))
  }

  return (
    <div>
      <div className={classes.filterBar}>
        <div className={classes.categories}>
          <button className={active === 1 ? classes.active : ""} onClick={() => { filterBy(1, "") }}>All</button>
          <button className={active === 2 ? classes.active : ""} onClick={() => { filterBy(2, "action") }}>Action</button>
          <button className={active === 3 ? classes.active : ""} onClick={() => { filterBy(3, "comedy") }}>Comedy</button>
          <button className={active === 4 ? classes.active : ""} onClick={() => { filterBy(4, "horror") }}>Horror</button>
          <button className={active === 5 ? classes.active : ""} onClick={() => { filterBy(5, "crime") }}>Crime</button>
        </div>
        <div className={classes.sortSection}>
          <div>Sort by</div>
          <select onChange={(e) => { sort(e.target.value) }}>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
      <hr />
      <div className={classes.movieCounter}>
        <span>{movieCount}</span> movies found
      </div>
    </div>
  );
};
