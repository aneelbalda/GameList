import axios from 'axios';
import config from '../Config/Config'

const gameApiClient = axios.create({baseURL : config.apiUrl});

export function fetchGameList(){
    return gameApiClient.get();
}