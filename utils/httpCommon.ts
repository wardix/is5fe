import axios from 'axios';

const BASE_API_HOST = process.env.NEXT_PUBLIC_BASE_API;
const HTTP = axios.create({
  baseURL: BASE_API_HOST,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export { HTTP };
