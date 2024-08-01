import axios from 'axios';
import { API_LINK } from '../constants/constants';

const instance = axios.create({
  baseURL: API_LINK,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export default instance;
