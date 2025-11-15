import axios from 'axios'

const API_URL = "http://localhost:8080/api";

//creacion de instancia axios para endpoints pulbico
const expApi = axios.create({
    baseURL: API_URL
});

export { expApi }