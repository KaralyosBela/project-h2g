import classes from './DailyWeather.module.css';
import Card from './Card';

function DailyWeather(props) {

    const {temperature, city, icon} = props.weatherInfo;

    return <div>
        <Card>
        <div className={classes.outer}>
        <div>
        <img src = {`http://openweathermap.org/img/wn/${icon}.png`} alt="hehe"/>
        </div>
        <div className={classes.inner}>
            <div>Temp {temperature}</div>
            <div>City {city}</div>
        </div>
        </div>
        </Card>
    </div>
}

export default DailyWeather;