import { Server, Client } from '../src/index';

describe('Fintava SDK', () => {
  describe('Server SDK', () => {
    it('should initialize server SDK with secret key', () => {
      const sdk = Server('test_secret_key');
      expect(sdk).toBeDefined();
      expect(sdk.customer).toBeDefined();
      expect(sdk.wallet).toBeDefined();
      expect(sdk.transfer).toBeDefined();
      expect(sdk.card).toBeDefined();
      expect(sdk.virtualAccount).toBeDefined();
      expect(sdk.utilities).toBeDefined();
      expect(sdk.webhook).toBeDefined();
    });
  });

  describe('Client SDK', () => {
    it('should initialize client SDK with config', () => {
      const config = {
        publicKey: 'test_public_key',
        amount: 1000,
        currency: 'NGN',
        email: 'test@example.com'
      };
      const sdk = Client(config);
      expect(sdk).toBeDefined();
      expect(sdk.open).toBeDefined();
      expect(sdk.close).toBeDefined();
    });
  });

  describe('Standalone Functions', () => {
    it('should export standalone payment functions', async () => {
      const { renderPaymentWidget, verifyPayment, getPaymentStatus } = await import('../src/index');
      expect(renderPaymentWidget).toBeDefined();
      expect(verifyPayment).toBeDefined();
      expect(getPaymentStatus).toBeDefined();
    });
  });

  describe('Types', () => {
    it('should export required types', async () => {
      const types = await import('../src/types');
      expect(types).toBeDefined();
    });
  });
});