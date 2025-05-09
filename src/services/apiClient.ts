import axios from 'axios';
import { API_ENDPOINTS, API_HEADERS, API_TIMEOUT } from '../config/apiConfig';
import Logger from '../utils/logger';

const apiClient = axios.create({
  baseURL: API_ENDPOINTS.BASE_URL,
  headers: {
    ...API_HEADERS,
    'Content-Type': 'application/json',
  },
  timeout: API_TIMEOUT,
});

apiClient.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    Logger.error('API Request Error', error);
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const url = error.config?.url;
    const status = error.response?.status;
    const message = error.message;

    Logger.debug('API Response Error', {
      url,
      status,
      message,
    });

    return Promise.reject(error);
  },
);

export default apiClient;
