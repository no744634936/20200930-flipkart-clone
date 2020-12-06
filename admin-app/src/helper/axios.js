import axios from "axios"
import {backend_base_url} from "./backendBaseUrl.js"

const token = localStorage.getItem('token');

const axiosInstance = axios.create({
    baseURL:backend_base_url,
    headers: {
        'Authorization': token ? `${token}` : ''
    }
})

export default axiosInstance