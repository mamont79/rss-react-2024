import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon/',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export default instance;
