import axios from "axios"

axios.defaults.baseURL = "https://shop-seven-mocha.vercel.app/api/v1"

export const get = (url, configs = {}) => {
    return axios.get(url, configs)
}

export const post = (url, params, configs = {}) => {
    return axios.post(url, params, configs)
}
