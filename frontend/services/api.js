import axios from "axios"

axios.defaults.baseURL = "http://localhost:5000/api/v1"

export const get = (url, configs = {}) => {
    return axios.get(url, configs)
}

export const post = (url, params, configs = {}) => {
    return axios.post(url, params, configs)
}