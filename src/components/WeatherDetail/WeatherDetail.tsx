import { Weather } from "../../hooks/useWeather"
import styles from './Weather.module.css'


type WeatherDetailProps = {
    weather: Weather
}

export const WeatherDetail = ({ weather }: WeatherDetailProps) => {
    return (

        <div className={styles.container}>
            {weather.main.temp > 20 ? <img src="/sun.ico" /> : <img src="/cold.ico" />}
            <h2 className={styles.name}>{weather.name}</h2>
            <p className={styles.current}>{Math.round(weather.main.temp)}°C</p>
            <div className={styles.weather}>
                <p>Min: {Math.round(weather.main.temp_min)}°C</p>
                <p>Máx: {Math.round(weather.main.temp_max)}°C</p>
            </div>
        </div>
    )
}
