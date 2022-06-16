import Container from "../components/Container";
import WeeklyWeather from "../components/WeeklyWeather";
//import classes from './Custom.module.css';

function MainPage() {
  return (
    <Container>
      <div>
        <h1>This is the main page.</h1>
        <WeeklyWeather/>
      </div>
    </Container>
  );
}

export default MainPage;

//TODO: new page for weekly weather, add weekly weather data from different api call, add day names to the cards