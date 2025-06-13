import axios from 'axios'

const BASE_URL = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
    return axios
            .get(BASE_URL)
            .then(res => res.data)
}

export default { getAll }