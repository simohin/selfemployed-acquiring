import axios from "axios";
import {BASE_URL} from "../config";
import {store} from "../store/models";

const baseConfig = {
    baseURL: BASE_URL
}

export const baseClient = axios.create(baseConfig)
export const secureClient = axios.create(baseConfig)
secureClient.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${store.getState().auth.token}`
    return config
})
