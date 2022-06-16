import classes from './WeeklyWeather.module.css';
import Card from './Card';

function WeeklyWeather(props) {

    return <div>
        <div className={classes.weekly}>
        <Card>
        <div className={classes.outer}>
        <div>
        <img src = {`http://openweathermap.org/img/wn/10d.png`} alt="hehe"/>
        </div>
        <div className={classes.inner}>
            <div><span>Temp</span>temp</div>
            <div><span>City</span>city</div>
        </div>
        </div>
        </Card>
        <Card>
        <div className={classes.outer}>
        <div>
        <img src = {`http://openweathermap.org/img/wn/10d.png`} alt="hehe"/>
        </div>
        <div className={classes.inner}>
            <div><span>Temp</span>temp</div>
            <div><span>City</span>city</div>
        </div>
        </div>
        </Card>
        <Card>
        <div className={classes.outer}>
        <div>
        <img src = {`http://openweathermap.org/img/wn/10d.png`} alt="hehe"/>
        </div>
        <div className={classes.inner}>
            <div><span>Temp</span>temp</div>
            <div><span>City</span>city</div>
        </div>
        </div>
        </Card>
        </div>
    </div>
}

export default WeeklyWeather;