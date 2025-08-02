import { createHttpClient } from '../utils/http';
import { setup as setupCustomer } from './modules/customer';
import { setup as setupWallet } from './modules/wallet';
import { setup as setupTransfer } from './modules/transfer';
import { setup as setupCard } from './modules/card';
import { setup as setupVirtualAccount } from './modules/virtualAccount';
import { setup as setupUtilities } from './modules/utilities';
import { setup as setupWebhook } from './modules/webhook';

export function init(secretKey: string, baseUrl?: string) {
  const http = createHttpClient(secretKey, baseUrl);
  
  return {
    customer: setupCustomer(http),
    wallet: setupWallet(http),
    transfer: setupTransfer(http),
    card: setupCard(http),
    virtualAccount: setupVirtualAccount(http),
    utilities: setupUtilities(http),
    webhook: setupWebhook(http)
  };
}
