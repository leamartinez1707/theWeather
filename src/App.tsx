import styles from './App.module.css'
import { Alert } from './components/Alert/Alert'
import Form from './components/Form/Form'
import { Loading } from './components/Loading'
import { WeatherDetail } from './components/WeatherDetail/WeatherDetail'
import useWeather from './hooks/useWeather'

function App() {

  const { weather, fetchWeather, notFound, hasWeatherData, loading } = useWeather()
  return (
    <>
      <h1 className={styles.title}>Consultar el clima</h1>
      <div className={styles.container}>
        <Form
          fetchWeather={fetchWeather}
        />
        {loading
          && <Loading />
        }
        {hasWeatherData && !loading &&
          <WeatherDetail weather={weather} />
        }
        {notFound &&
          <Alert>No se encontró la ciudad</Alert>
        }
      </div>
    </>
  )
}

export default App
