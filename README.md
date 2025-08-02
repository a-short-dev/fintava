# Fintava Pay SDKs (Community)

Multi-platform SDKs for Fintava Pay - authorized community-driven integration libraries.

## Available SDKs

| Platform | Status | Package | Documentation |
|----------|--------|---------|---------------|
| JavaScript/TypeScript | ✅ **Stable** | [`fintava`](./packages/javascript-sdk) | [JS/TS Docs](./packages/javascript-sdk/README.md) |
| Android (Kotlin) | 🚧 **Coming Soon** | `@fintava/kotlin-sdk` | [Kotlin Docs](./packages/kotlin-sdk/README.md) |
| iOS/macOS (Swift) | 🚧 **Coming Soon** | `@fintava/swift-sdk` | [Swift Docs](./packages/swift-sdk/README.md) |

✅ **AUTHORIZED PROJECT**: This is a **community-built** multi-platform SDK collection for integrating with Fintava's Banking as a Service (BaaS) platform, developed with **authorization from the FintavaPay team**.

A comprehensive collection of SDKs for integrating with Fintava's Banking as a Service (BaaS) platform across multiple platforms and programming languages.

## Features

Fintava provides a complete banking infrastructure that enables you to:

- **Customer Management**: Create and manage customer profiles with KYC
- **NUBAN Virtual Accounts**: Create and manage Nigerian bank accounts
- **Wallets**: Multi-currency wallet management with transactions
- **Virtual & Physical Cards**: Issue and manage debit cards
- **Transfers**: Domestic and international money transfers
- **Bill Payments**: Airtime, data, electricity, cable TV, and internet services
- **Webhooks**: Real-time event notifications
- **Payment Processing**: Accept payments via multiple channels

## Installation

### JavaScript/TypeScript

```bash
npm install fintava
# or
yarn add fintava
# or
pnpm add fintava
```

### Android (Kotlin) - Coming Soon

```kotlin
// Gradle (Kotlin DSL)
dependencies {
    implementation("com.fintava:kotlin-sdk:1.0.0")
}
```

### iOS/macOS (Swift) - Coming Soon

```swift
// Swift Package Manager
dependencies: [
    .package(url: "https://github.com/a-short-dev/fintava.git", from: "1.0.0")
]
```

## Authentication

To use the Fintava API, you'll need API keys from your Fintava dashboard:

- **Secret Key**: For server-side operations (never expose in client-side code)
- **Public Key**: For client-side operations (safe to expose in frontend code)

## Quick Start

### Server-side (Node.js)

```javascript
const { Server } = require('fintava');

// Initialize with your secret key
const fintava = Server('your-secret-key');

// Create a customer
const customer = await fintava.customer.create({
  email: 'customer@example.com',
  firstName: 'John',
  lastName: 'Doe',
  phone: '+2348012345678',
  dateOfBirth: '1990-01-01',
  address: {
    street: '123 Main St',
    city: 'Lagos',
    state: 'Lagos',
    country: 'Nigeria'
  }
});

// Create a wallet for the customer
const wallet = await fintava.wallet.create({
  customerId: customer.data.id,
  currency: 'NGN',
  label: 'Primary Wallet'
});

// Create a virtual account
const virtualAccount = await fintava.virtualAccount.create({
  customerId: customer.data.id,
  walletId: wallet.data.id,
  accountName: 'John Doe',
  bvn: '12345678901'
});

console.log('Setup complete:', { customer, wallet, virtualAccount });
```

### Client-side (Browser)

```javascript
import { Client } from 'fintava';

// Initialize checkout
const checkout = Client({
  publicKey: 'your-public-key',
  theme: {
    primaryColor: '#007bff',
    borderRadius: '8px'
  }
});

// Open payment modal
checkout.open({
  amount: 10000, // Amount in kobo (₦100.00)
  currency: 'NGN',
  reference: 'unique-transaction-ref',
  customerEmail: 'customer@example.com',
  customerName: 'John Doe',
  description: 'Payment for services',
  onSuccess: (response) => {
    console.log('Payment successful:', response);
    // Verify payment on your backend
  },
  onError: (error) => {
    console.error('Payment failed:', error);
  },
  onClose: () => {
    console.log('Payment modal closed');
  }
});
```

## API Reference

### Customer Management

```javascript
// Create customer
const customer = await fintava.customer.create({
  email: 'customer@example.com',
  firstName: 'John',
  lastName: 'Doe',
  phone: '+2348012345678',
  dateOfBirth: '1990-01-01',
  address: {
    street: '123 Main St',
    city: 'Lagos',
    state: 'Lagos',
    country: 'Nigeria'
  }
});

// Get customer
const customer = await fintava.customer.getById('customer-id');
const customer = await fintava.customer.getByPhone('+2348012345678');
const customer = await fintava.customer.getByEmail('customer@example.com');

// Update customer
const updated = await fintava.customer.update('customer-id', {
  firstName: 'Jane'
});

// List customers with pagination
const customers = await fintava.customer.list({ page: 1, limit: 20 });
```

### Wallet Management

```javascript
// Create wallet
const wallet = await fintava.wallet.create({
  customerId: 'customer-id',
  currency: 'NGN',
  label: 'Primary Wallet'
});

// Get wallet balance
const balance = await fintava.wallet.getBalance('wallet-id');

// Credit wallet
const credit = await fintava.wallet.credit('wallet-id', {
  amount: 10000,
  reference: 'credit-ref',
  description: 'Wallet funding'
});

// Debit wallet
const debit = await fintava.wallet.debit('wallet-id', {
  amount: 5000,
  reference: 'debit-ref',
  description: 'Payment'
});

// Get transaction history
const transactions = await fintava.wallet.getTransactions('wallet-id', {
  page: 1,
  limit: 20,
  startDate: '2024-01-01',
  endDate: '2024-12-31'
});
```

### Virtual Accounts (NUBAN)

```javascript
// Create virtual account
const account = await fintava.virtualAccount.create({
  customerId: 'customer-id',
  walletId: 'wallet-id',
  accountName: 'John Doe',
  bvn: '12345678901'
});

// Get account details
const account = await fintava.virtualAccount.getById('account-id');
const account = await fintava.virtualAccount.getByAccountNumber('1234567890');

// Get account transactions
const transactions = await fintava.virtualAccount.getTransactions('account-id');

// Setup auto-sweep
const autoSweep = await fintava.virtualAccount.setupAutoSweep('account-id', {
  targetWalletId: 'wallet-id',
  minimumAmount: 1000,
  isEnabled: true
});
```

### Transfers

```javascript
// Bank transfer
const transfer = await fintava.transfer.initiate({
  walletId: 'wallet-id',
  amount: 10000,
  recipientBank: '044',
  recipientAccount: '1234567890',
  recipientName: 'Jane Doe',
  reference: 'transfer-ref',
  description: 'Payment to supplier'
});

// Internal transfer (between wallets)
const internal = await fintava.transfer.internal({
  fromWalletId: 'wallet-1',
  toWalletId: 'wallet-2',
  amount: 5000,
  reference: 'internal-ref',
  description: 'Internal transfer'
});

// Verify bank account
const verification = await fintava.transfer.verifyAccount({
  bankCode: '044',
  accountNumber: '1234567890'
});

// Get supported banks
const banks = await fintava.transfer.getBanks();

// Get transfer status
const status = await fintava.transfer.getById('transfer-id');
```

### Card Management

```javascript
// Create virtual card
const card = await fintava.card.create({
  walletId: 'wallet-id',
  type: 'virtual',
  currency: 'NGN',
  spendingLimits: {
    daily: 50000,
    monthly: 200000,
    transaction: 10000
  }
});

// Get card details
const card = await fintava.card.getById('card-id');
const sensitiveData = await fintava.card.getSensitiveDetails('card-id');

// Activate/Deactivate card
const activated = await fintava.card.activate('card-id');
const deactivated = await fintava.card.deactivate('card-id');

// Block/Unblock card
const blocked = await fintava.card.block('card-id', 'Suspicious activity');
const unblocked = await fintava.card.unblock('card-id');

// Update spending limits
const updated = await fintava.card.updateSpendingLimits('card-id', {
  daily: 100000,
  monthly: 500000
});

// Get card transactions
const transactions = await fintava.card.getTransactions('card-id');
```

### Bill Payments & Utilities

```javascript
// Get airtime providers
const providers = await fintava.utilities.getAirtimeProviders();

// Buy airtime
const airtime = await fintava.utilities.buyAirtime({
  walletId: 'wallet-id',
  provider: 'MTN',
  phoneNumber: '+2348012345678',
  amount: 1000,
  reference: 'airtime-ref'
});

// Get data plans
const plans = await fintava.utilities.getDataPlans('MTN');

// Buy data
const data = await fintava.utilities.buyData({
  walletId: 'wallet-id',
  provider: 'MTN',
  phoneNumber: '+2348012345678',
  planId: 'plan-id',
  reference: 'data-ref'
});

// Pay electricity bill
const electricity = await fintava.utilities.payElectricity({
  walletId: 'wallet-id',
  provider: 'EKEDC',
  meterNumber: '12345678901',
  amount: 5000,
  reference: 'electricity-ref'
});

// Get cable TV packages
const packages = await fintava.utilities.getCableTVPackages('DSTV');

// Pay cable TV
const cableTV = await fintava.utilities.payCableTV({
  walletId: 'wallet-id',
  provider: 'DSTV',
  smartCardNumber: '1234567890',
  packageId: 'package-id',
  reference: 'cabletv-ref'
});
```

### Webhooks

```javascript
// Create webhook endpoint
const webhook = await fintava.webhook.createEndpoint({
  url: 'https://yourapp.com/webhooks/fintava',
  events: ['customer.created', 'wallet.credited', 'transfer.successful'],
  description: 'Main webhook endpoint'
});

// List webhook endpoints
const endpoints = await fintava.webhook.listEndpoints();

// Update webhook
const updated = await fintava.webhook.updateEndpoint('webhook-id', {
  events: ['customer.created', 'wallet.credited']
});

// Test webhook
const test = await fintava.webhook.testEndpoint('webhook-id');

// Verify webhook signature (in your webhook handler)
const isValid = fintava.webhook.verifySignature(
  requestBody,
  signature,
  webhookSecret
);

// Parse webhook event
const event = fintava.webhook.parseEvent(
  requestBody,
  signature,
  webhookSecret
);

if (event) {
  switch (event.event) {
    case 'customer.created':
      console.log('New customer:', event.data);
      break;
    case 'wallet.credited':
      console.log('Wallet credited:', event.data);
      break;
    // Handle other events...
  }
}
```

## Client-side Payment Verification

```javascript
import { verifyPayment, getPaymentStatus } from 'fintava';

// Verify payment after successful transaction
const verification = await verifyPayment('transaction-reference', 'your-public-key');

if (verification.success) {
  console.log('Payment verified:', verification);
} else {
  console.log('Payment verification failed');
}

// Get payment status
const status = await getPaymentStatus('transaction-reference', 'your-public-key');
console.log('Payment status:', status.status); // 'pending', 'successful', 'failed', 'cancelled'
```

## Error Handling

The SDK provides structured error handling:

```javascript
try {
  const customer = await fintava.customer.create(customerData);
} catch (error) {
  console.error('Error details:', {
    code: error.code,
    message: error.message,
    statusCode: error.statusCode,
    details: error.details
  });
  
  switch (error.code) {
    case 'VALIDATION_ERROR':
      // Handle validation errors
      break;
    case 'INSUFFICIENT_FUNDS':
      // Handle insufficient funds
      break;
    case 'NETWORK_ERROR':
      // Handle network issues
      break;
    default:
      // Handle other errors
      break;
  }
}
```

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import { 
  Server, 
  Customer, 
  Wallet, 
  VirtualAccount,
  Transfer,
  Card,
  ApiResponse,
  PaginatedResponse 
} from 'fintava';

const fintava = Server('your-secret-key');

const customer: ApiResponse<Customer> = await fintava.customer.create({
  email: 'customer@example.com',
  firstName: 'John',
  lastName: 'Doe',
  phone: '+2348012345678',
  dateOfBirth: '1990-01-01',
  address: {
    street: '123 Main St',
    city: 'Lagos',
    state: 'Lagos',
    country: 'Nigeria'
  }
});

const wallets: PaginatedResponse<Wallet> = await fintava.wallet.list({
  customerId: customer.data.id,
  page: 1,
  limit: 10
});
```

## Environment Configuration

```javascript
// Development
const fintava = Server('sk_test_...', 'https://api-sandbox.fintava.com/v1');

// Production
const fintava = Server('sk_live_...', 'https://api.fintava.com/v1');

// Client-side
const checkout = Client({
  publicKey: process.env.NODE_ENV === 'production' ? 'pk_live_...' : 'pk_test_...',
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://checkout.fintava.com'
    : 'https://checkout-sandbox.fintava.com'
});
```

## Webhook Events

Available webhook events:

- `customer.created`, `customer.updated`, `customer.suspended`, `customer.reactivated`
- `wallet.created`, `wallet.credited`, `wallet.debited`, `wallet.frozen`, `wallet.unfrozen`
- `transfer.initiated`, `transfer.successful`, `transfer.failed`, `transfer.cancelled`
- `card.created`, `card.activated`, `card.blocked`, `card.transaction`
- `virtual_account.created`, `virtual_account.credited`
- `bill_payment.successful`, `bill_payment.failed`
- `system.maintenance`, `system.alert`

## Important Notice

### Authorized Community Project
This SDK is a **community-driven project** created by independent developers with **authorization from the FintavaPay team**. While authorized, this is maintained by the community and not directly by Fintava.

### Official Resources
For official documentation, support, and resources, please visit:
- [Fintava Official Website](https://fintava.com)
- [Fintava Official Documentation](https://docs.fintava.com)
- [Fintava Official Support](https://support.fintava.com)

### Best Practices
While this SDK is authorized and aims to provide reliable integration with Fintava's services, users should:
- Test thoroughly in development environments
- Verify all functionality with official Fintava documentation
- Report issues to this repository for community support
- Refer to official Fintava support for platform-specific questions

## Development

### Quick Start for Contributors

```bash
# Clone the repository
git clone https://github.com/a-short-dev/fintava.git
cd fintava

# Install dependencies for all packages
pnpm install

# Start development mode for all packages
pnpm dev

# Or work on specific SDK
pnpm js:dev    # JavaScript/TypeScript SDK only

# Run tests
pnpm test      # All packages
pnpm js:test   # JavaScript SDK only
```

### Available Scripts

```bash
# Development (All Packages)
pnpm dev              # Watch mode compilation for all packages
pnpm build            # Build all packages for production
pnpm clean            # Clean build directories
pnpm clean:all        # Clean all node_modules and build dirs

# Development (JavaScript SDK)
pnpm js:dev           # JavaScript SDK development mode
pnpm js:build         # Build JavaScript SDK only
pnpm js:test          # Test JavaScript SDK only

# Testing (All Packages)
pnpm test             # Run tests for all packages
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Run tests with coverage

# Code Quality (All Packages)
pnpm lint             # Check code style for all packages
pnpm lint:fix         # Fix linting issues
pnpm format           # Format code
pnpm format:check     # Check formatting
pnpm type-check       # TypeScript type checking

# Versioning & Release
pnpm changeset        # Create a changeset
pnpm release:patch    # Release patch version
pnpm release:minor    # Release minor version
pnpm release:major    # Release major version
```

### Version Management

We use [Changesets](https://github.com/changesets/changesets) for semantic versioning:

- **Patch** (1.0.0 → 1.0.1): Bug fixes, documentation
- **Minor** (1.0.0 → 1.1.0): New features, backwards compatible
- **Major** (1.0.0 → 2.0.0): Breaking changes

```bash
# When making changes, create a changeset
pnpm changeset

# Follow prompts to describe your changes
# Commit the changeset file with your changes
```

### Automated Releases

Releases are automated via GitHub Actions when changesets are merged to the main branch. The workflow:

1. **Create changeset** during development
2. **Merge PR** with changeset to main
3. **Automated release** publishes to npm
4. **CHANGELOG** is automatically updated

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for detailed information about:

- Setting up the development environment
- Code standards and guidelines
- Testing requirements
- Pull request process
- Version management

For newcomers, check out our [Development Guide](DEVELOPMENT.md) for comprehensive project architecture and workflow information.

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@fintava.com or visit our [documentation](https://fintava.readme.io).

## Changelog

### v1.0.3
- Complete SDK implementation with all major modules
- Enhanced client-side payment widget with modal interface
- Comprehensive webhook management
- Full TypeScript support
- Improved error handling and validation
- Added utilities for bill payments and airtime/data purchases
- Card management with spending limits and controls
- Virtual account management with auto-sweep functionality
- Transfer capabilities including bank transfers and internal transfers
- Wallet management with transaction history
- Customer management with KYC support
