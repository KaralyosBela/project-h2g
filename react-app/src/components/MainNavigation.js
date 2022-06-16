import { Link } from "react-router-dom";

function MainNavigation() {
  return (
    <header>
      <div>App</div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/weather">Weather</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
