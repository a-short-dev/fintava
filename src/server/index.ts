import { createHttpClient } from '../utils/http';
import * as customer from './modules/customer';

export function init({ secretKey, baseUrl = 'https://api.fintava.com/v1' }: { secretKey: string; baseUrl?: string }) {
  const http = createHttpClient(baseUrl, secretKey);

  return {
    customer: customer.setup(http),
    // Add others like wallet, transfer...
  };
}
