import axios from "axios"
import { z } from 'zod'
import { SearchType } from "../types"
import { useMemo, useState } from "react"

// TYPE GUARDS
// const isWeatherResponse = (weather: unknown): weather is Weather => {

//     return (
//         Boolean(weather) &&
//         typeof weather === 'object' &&
//         typeof (weather as Weather).name === 'string' &&
//         typeof (weather as Weather).main.temp === 'number' &&
//         typeof (weather as Weather).main.temp_max === 'number' &&
//         typeof (weather as Weather).main.temp_min === 'number'
//     )
// }

// ZOD
const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number()
    })
})
export type Weather = z.infer<typeof Weather>

// VALIBOT
// const WeatherSchema = object({
//     name: string(),
//     main: object({
//         temp: number(),
//         temp_max: number(),
//         temp_min: number()
//     })
// })
// type Weather = Output<typeof WeatherSchema>

export default function useWeather() {

    const initialState = {
        name: '',
        main: {
            temp: 0,
            temp_max: 0,
            temp_min: 0
        }
    }
    const [weather, setWeather] = useState<Weather>(initialState)
    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)


    const fetchWeather = async (search: SearchType) => {
        const appId = import.meta.env.VITE_WEATHER_API
        setLoading(true)
        setWeather(initialState)
        setNotFound(false)
        try {
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

            const { data } = await axios.get(geoUrl)

            if (!data[0]) {
                setNotFound(true)
                return;
            }
            const lat = data[0].lat
            const lon = data[0].lon

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${appId}`

            // Type Guards
            // const { data: weatherData } = await axios.get(weatherUrl)
            // const result = isWeatherResponse(weatherData)
            // if (result) {
            //     console.log(weatherData)
            // } else {
            //     console.error('Error al consultar el clima')

            // }

            // ZOD
            const { data: weatherData } = await axios.get(weatherUrl)
            const result = Weather.safeParse(weatherData)
            if (result.success) {
                setWeather(result.data)
                setNotFound(false)
            }

            // VALIBOT
            // const { data: weatherData } = await axios.get(weatherUrl)
            // const result = parse(WeatherSchema, weatherData)
            // if (result) {
            //     console.log(result.name)
            //     console.log(result.main)
            // }
            // Si el tipo no coincide, pasa directo al catch

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    const hasWeatherData = useMemo(() => weather.name, [weather])
    return {
        weather,
        notFound,
        loading,
        fetchWeather,
        hasWeatherData
    }

}