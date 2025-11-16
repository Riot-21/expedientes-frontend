import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL;

//creacion de instancia axios para endpoints pulbico
const expApi = axios.create({
    baseURL: API_URL
});

export { expApi }