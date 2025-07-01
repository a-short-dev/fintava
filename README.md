# Fintava Pay JavaScript SDK

> JavaScript SDK for integrating with [Fintava](https://fintava.com) — a Banking-as-a-Service (BaaS) platform that allows you to launch financial products quickly and securely.

---

## 🚀 Introduction

**Fintava** is a BaaS platform that helps you build and launch banking and payment products at record speed. Skip the regulatory headaches — Fintava lets you:

- Issue **NUBAN account numbers**
- Create **virtual and physical cards**
- Manage **wallets**, **transfers**, and **payments**
- Send **SMS**, handle **KYC**, and more

To use the SDK or Fintava API:

1. [Login to Fintava](https://fintava.com/login) or [Sign up](https://fintava.com/signup)
2. Get your **API keys** for both test and live environments from the dashboard

---

## 📦 Installation

Install with your preferred package manager:

```bash
npm install fintava-pay
# or
pnpm add fintava-pay
# or
yarn add fintava-pay
```

---

## 🧠 Usage

### ✅ In Node.js (Server-side)

```ts
import { Server } from 'fintava-pay';

const fintava = Server.init({
  secretKey: process.env.FINTAVA_SECRET_KEY!,
});

const customer = await fintava.customer.create({
  phone: "+2347012345678",
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
});
```

### ✅ In Browser (Client-side)

```ts
import { Client } from 'fintava-pay';

Client.renderPaymentWidget({
  publicKey: 'your-public-test-key',
  amount: 5000,
  currency: 'NGN',
  onSuccess: (response) => {
    console.log('Payment successful:', response);
  },
  onClose: () => {
    console.log('Widget closed');
  },
});
```

> The SDK will automatically detect the environment (browser or Node.js) and only expose relevant functionality.

---

## 📚 Features

- ✅ Create & manage customers
- ✅ Freeze/unfreeze wallets
- ✅ Wallet balance & transfers
- ✅ Bank transfer & NUBAN lookup
- ✅ Generate and manage virtual wallets
- ✅ Transaction lookup (by ID, reference)
- ✅ Generate & manage cards (virtual/physical)
- ✅ Send SMS (single & bulk)
- ✅ Verify BVN, selfie, phone number
- ✅ Buy airtime, data, electricity, and cable TV
- ✅ Webhook validation (secure event handling)

---

## 🌍 API Coverage

This SDK wraps the following Fintava API groups:

| API Group        | Supported Methods                     |
|------------------|----------------------------------------|
| Customer         | Create, Fetch, Freeze, Transactions    |
| Wallet           | Generate, Balance, Transfer            |
| Transfer         | Bank, Wallet, Inter-wallet             |
| Transactions     | View by ID, reference, card            |
| Merchant         | Transactions, Balance, Transfers       |
| Cards            | Create, Link, View, Reissue, Deactivate |
| SMS              | Send, Bulk, List                       |
| Compliance       | BVN, BVN + Selfie, Phone Verification  |
| Billing          | Airtime, Data, Cable, Electricity      |
| Webhooks         | Signature verification, Event handling |

> For full documentation, visit the [Fintava Developer Docs](https://fintava.com/docs) _(coming soon)_.

---

## ⚙️ Configuration

### Server SDK init

```ts
Server.init({
  secretKey: process.env.FINTAVA_SECRET_KEY,
  baseUrl: 'https://api.fintava.com/v1', // optional override
});
```

### Client Widget

```ts
Client.renderPaymentWidget({
  publicKey: 'your-public-key',
  amount: 10000,
  currency: 'NGN',
  metadata: {
    userId: 'abc123',
  },
});
```

---

## 🧪 Testing

To run all unit tests:

```bash
pnpm test
```

Uses [Jest](https://jestjs.io) and [`ts-jest`](https://github.com/kulshekhar/ts-jest).

---

## 🛠 Development

### Build SDK

```bash
pnpm build
```

### Dev Watch Mode

```bash
pnpm dev
```

### Lint & Format

```bash
pnpm lint
pnpm format
```

---

## 🚀 Versioning & Release

This project uses [Changesets](https://github.com/changesets/changesets) for versioning.

### Bump Versions

```bash
pnpm version:patch   # 1.0.0 -> 1.0.1
pnpm version:minor   # 1.0.0 -> 1.1.0
pnpm version:major   # 1.0.0 -> 2.0.0
```

### Publish

```bash
pnpm build
pnpm release
```

---

## 🤝 Contributing

We welcome contributions!

1. Fork the repo
2. Create a branch: `git checkout -b feat/your-feature`
3. Commit changes
4. Push and open a PR

Make sure to run:

```bash
pnpm lint
pnpm test
```

For guidelines, see [`CONTRIBUTING.md`](./CONTRIBUTING.md)

---

## 📄 License

This SDK is open-source and available under the [MIT License](./LICENSE).

---

## 🏁 What's Next

- [x] Add payment widget
- [x] Add server-side API methods
- [x] Add test coverage
- [ ] Add webhook event typings
- [ ] Add React wrapper component
- [ ] Add CDN bundle for browser usage
