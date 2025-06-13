import axios from 'axios'

const BASE_URL = `http://api.weatherapi.com/v1`

const getCurrent = name => {
    const url = `${BASE_URL}/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${name}`
    return axios
            .get(url)
            .then(res => res.data)
}

export default { getCurrent }