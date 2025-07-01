import { AxiosInstance } from 'axios';

export function setup(http: AxiosInstance) {
  return {
    async create(data: {
      phone: string;
      firstName: string;
      lastName: string;
      email: string;
    }) {
      const res = await http.post('/customer', data);
      return res.data;
    },

    async getByPhone(phone: string) {
      const res = await http.get(`/customer/phone/${phone}`);
      return res.data;
    },

    // Add more endpoints...
  };
}
