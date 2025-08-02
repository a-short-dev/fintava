// Export types
export * from './types';

// Export specific types from modules to avoid conflicts
export type { BillPayment, BillProvider, DataPlan, CablePlan } from './server/modules/utilities';
export type { WebhookEndpoint, WebhookDelivery } from './server/modules/webhook';

// Export client functions
export { renderPaymentWidget, verifyPayment, getPaymentStatus } from './client';

// Named exports for explicit imports
export { init as Server } from './server';
export { init as Client } from './client';

// Default export
import { init as serverInit } from './server';
import { init as clientInit, renderPaymentWidget, verifyPayment, getPaymentStatus } from './client';

const Fintava = {
  Server: serverInit,
  Client: clientInit,
  renderPaymentWidget,
  verifyPayment,
  getPaymentStatus
};

export default Fintava;