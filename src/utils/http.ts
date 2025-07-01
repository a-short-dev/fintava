import axios from 'axios';

export function createHttpClient(baseURL: string, secretKey: string) {
  return axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/json',
    },
  });
}
