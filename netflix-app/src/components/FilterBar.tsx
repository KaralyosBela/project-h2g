import classes from "./FilterBar.module.css";

interface Props {
  movieCount: number
}

export const FilterBar: React.FC<Props> = ({movieCount}) => {
  return (
    <div>
      <div className={classes.filterBar}>
        <ul className={classes.categories}>
          <li>All</li>
          <li>Documentary</li>
          <li>Comedy</li>
          <li>Horror</li>
          <li>Crime</li>
        </ul>
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
