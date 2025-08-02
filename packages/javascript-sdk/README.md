# Fintava JavaScript/TypeScript SDK

Community JavaScript SDK for Fintava Pay - authorized client and server integration.

## Installation

```bash
npm install @fintava/javascript-sdk
# or
yarn add @fintava/javascript-sdk
# or
pnpm add @fintava/javascript-sdk
```

## Quick Start

### Client-side Usage

```javascript
import { FintavaClient } from '@fintava/javascript-sdk';

const fintava = new FintavaClient({
  publicKey: 'your-public-key',
  environment: 'sandbox' // or 'production'
});

// Initialize payment
fintava.payment.initialize({
  amount: 10000, // Amount in kobo
  email: 'customer@example.com',
  reference: 'unique-reference',
  onSuccess: (response) => {
    console.log('Payment successful:', response);
  },
  onError: (error) => {
    console.error('Payment failed:', error);
  }
});
```

### Server-side Usage

```javascript
import { FintavaServer } from '@fintava/javascript-sdk';

const fintava = new FintavaServer({
  secretKey: 'your-secret-key',
  environment: 'sandbox'
});

// Verify payment
const verification = await fintava.payment.verify('payment-reference');
console.log('Payment status:', verification.status);
```

## Features

- ✅ **Payment Processing**: Initialize and verify payments
- ✅ **Customer Management**: Create and manage customers
- ✅ **Wallet Operations**: Wallet creation and management
- ✅ **Transfer Operations**: Bank and internal transfers
- ✅ **Card Management**: Virtual and physical card operations
- ✅ **Bill Payments**: Utility bills and airtime/data purchases
- ✅ **Webhook Handling**: Secure webhook verification
- ✅ **TypeScript Support**: Full type definitions included
- ✅ **Dual Environment**: Works in both browser and Node.js

## Documentation

For detailed documentation, examples, and API reference, see the [main repository README](../../README.md).

## Development

```bash
# Install dependencies
pnpm install

# Start development mode
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

## License

MIT License - see the [LICENSE](../../LICENSE) file for details.