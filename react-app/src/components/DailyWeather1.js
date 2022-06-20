import classes from './DailyWeather.module.css';
import Card from './Card';

function DailyWeather(props) {

    const {temperature, city, icon} = props.weatherInfo;

    return <div>
        <Card day="Today">
        <div className={classes.outer}>
        <div>
        <img src = {`http://openweathermap.org/img/wn/${icon}.png`} alt="hehe"/>
        </div>
        <div className={classes.inner}>
            <div><span>Temp</span> {temperature}</div>
            <div><span>City</span> {city}</div>
        </div>
        </div>
        </Card>
    </div>
}

export default DailyWeather;