import Card from './Card';
import Weather from './Weather.interface'

const DailyWeatherTS: React.FC<Weather> = ({temperature, city, icon}) => {
    
    return <div>
        <Card day="Today">
        <div>
        <div>
        <img src = {`http://openweathermap.org/img/wn/${icon}.png`} alt="hehe"/>
        </div>
        <div>
            <div><span>Temp</span> {temperature}</div>
            <div><span>City</span> {city}</div>
        </div>
        </div>
        </Card>
    </div>
}

export default DailyWeatherTS;