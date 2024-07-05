import axios from 'axios';
import { apiLink } from '../constants/constants';

const instance = axios.create({
  baseURL: apiLink,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export default instance;
