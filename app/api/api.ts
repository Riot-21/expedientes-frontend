import axios from 'axios'

const API_URL = "http://localhost:8080/api";
const expApi = axios.create({
    baseURL: API_URL
});

export { expApi }