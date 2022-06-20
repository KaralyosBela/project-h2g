import Card from './Card';
import Weather from './Weather.interface'

type Props = {
    weatherInfo: Weather
}
// const DailyWeather: React.FC<Props> = ({num}) => {

 const DailyWeather: React.FC<Props> = ({weatherInfo}) => {
    
    return <div>
        <Card day="Today">
        <div>
        <div>
        <img src = {`http://openweathermap.org/img/wn/${weatherInfo.icon}.png`} alt="hehe"/>
        </div>
        <div>
            <div><span>Temp</span> {weatherInfo.temperature}</div>
            <div><span>City</span> {weatherInfo.city}</div>
        </div>
        </div>
        </Card>
    </div>
}

export default DailyWeather;