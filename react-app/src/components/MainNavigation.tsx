import { Link } from "react-router-dom";
import classes from "../styles/MainNavigation.module.css";

export const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Weather application</div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/daily-weather">Todays Weather</Link>
          </li>
          <li>
            <Link to="/weekly-weather">Weekly Weather</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}