
import axios from 'axios'
import { useAuthStore } from '../login/store/auth.store';

const API_URL = "http://localhost:8080/api";

const expApiJwt = axios.create({
    baseURL: API_URL,
});

expApiJwt.interceptors.request.use( (config) => {

    const token = useAuthStore.getState().token  
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

export { expApiJwt }