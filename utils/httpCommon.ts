import axios from 'axios';
import { NextRouter } from 'next/router';

const BASE_API_HOST = process.env.NEXT_PUBLIC_BASE_API;

const deafultHeadersWithoutToken = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

const getDefaultHeadersWithToken = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    return {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
  }
  return getDefaultHeadersWithToken;
};

const HTTP = axios.create({
  baseURL: BASE_API_HOST,
  headers: deafultHeadersWithoutToken.headers,
});

type InterceptorsType = {
  router: NextRouter;
  store?: any;
};

const runInterceptors = ({ router, store = null }: InterceptorsType) => {
  HTTP.interceptors.response.use(
    (response) => {
      if (response) {
        store.setAuthenticated(true);
      }
      return response;
    },
    (error) => {
      store.setAuthenticated(false);
      router.push('/login');
      return Promise.reject(error);
    }
  );
};

export {
  runInterceptors,
  HTTP,
  getDefaultHeadersWithToken,
  deafultHeadersWithoutToken,
};
