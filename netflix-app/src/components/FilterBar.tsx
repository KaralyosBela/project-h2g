import classes from "./FilterBar.module.css";

export const FilterBar: React.FC = () => {
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
      <div className={classes.movieCounter}>
        <span>50</span> movies found
      </div>
    </div>
  );
};
