import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { ApiResponse, FintavaError } from '../types';

export function createHttpClient(secretKey: string, baseURL: string = 'https://api.fintava.com/v1'): AxiosInstance {
  const client = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/json',
      'User-Agent': 'fintava-pay-sdk/1.0.3',
    },
    timeout: 30000, // 30 seconds
  });

  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      // Add timestamp for request duration tracking
      (config as any).metadata = { startTime: new Date() };
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  client.interceptors.response.use(
    (response) => {
      // Calculate request duration
      const startTime = (response.config as any).metadata?.startTime;
      if (startTime) {
        const duration = new Date().getTime() - startTime.getTime();
        console.debug(`Request to ${response.config.url} took ${duration}ms`);
      }
      return response;
    },
    (error) => {
      const fintavaError: FintavaError = {
        message: 'An error occurred',
        code: 'UNKNOWN_ERROR',
        statusCode: 0,
        details: null
      };

      if (error.response) {
        // Server responded with error status
        const { status, data } = error.response;
        fintavaError.statusCode = status;
        fintavaError.message = data?.message || `HTTP ${status} Error`;
        fintavaError.code = (data as any)?.code || 'API_ERROR';
        fintavaError.details = data;
      } else if (error.request) {
        // Network error
        fintavaError.message = 'Network error - please check your connection';
        fintavaError.code = 'NETWORK_ERROR';
      } else {
        // Request setup error
        fintavaError.message = error.message || 'Request configuration error';
        fintavaError.code = 'REQUEST_ERROR';
      }

      return Promise.reject(fintavaError);
    }
  );

  return client;
}

export function createPublicHttpClient(publicKey: string, baseUrl: string = 'https://api.fintava.com/v1'): AxiosInstance {
  const client = axios.create({
    baseURL: baseUrl,
    timeout: 30000,
    headers: {
      'Authorization': `Bearer ${publicKey}`,
      'Content-Type': 'application/json',
      'User-Agent': 'Fintava-JS-SDK/1.0.3'
    }
  });

  // Add similar interceptors for public client
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      const fintavaError: FintavaError = {
        message: 'An error occurred',
        code: 'UNKNOWN_ERROR',
        statusCode: 0,
        details: null
      };

      if (error.response) {
        const { status, data } = error.response;
        fintavaError.statusCode = status;
        fintavaError.message = data?.message || `HTTP ${status} Error`;
        fintavaError.code = (data as any)?.code || 'API_ERROR';
        fintavaError.details = data;
      } else if (error.request) {
        fintavaError.message = 'Network error - please check your connection';
        fintavaError.code = 'NETWORK_ERROR';
      } else {
        fintavaError.message = error.message || 'Request configuration error';
        fintavaError.code = 'REQUEST_ERROR';
      }

      return Promise.reject(fintavaError);
    }
  );

  return client;
}
