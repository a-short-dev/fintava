// Basic usage examples for Fintava SDK

// Server-side example (Node.js)
const { Server } = require('fintava-pay');

// Initialize the SDK
const fintava = Server('your-secret-key');

async function serverExample() {
  try {
    // 1. Create a customer
    const customer = await fintava.customer.create({
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+2348012345678',
      dateOfBirth: '1990-01-01',
      address: {
        street: '123 Lagos Street',
        city: 'Lagos',
        state: 'Lagos',
        country: 'Nigeria'
      }
    });
    console.log('Customer created:', customer.data);

    // 2. Create a wallet for the customer
    const wallet = await fintava.wallet.create({
      customerId: customer.data.id,
      currency: 'NGN',
      label: 'Primary Wallet'
    });
    console.log('Wallet created:', wallet.data);

    // 3. Create a virtual account (NUBAN)
    const virtualAccount = await fintava.virtualAccount.create({
      customerId: customer.data.id,
      walletId: wallet.data.id,
      accountName: 'John Doe',
      bvn: '12345678901' // Customer's BVN
    });
    console.log('Virtual account created:', virtualAccount.data);

    // 4. Credit the wallet
    const credit = await fintava.wallet.credit(wallet.data.id, {
      amount: 50000, // ₦500.00 in kobo
      reference: `credit-${Date.now()}`,
      description: 'Initial wallet funding'
    });
    console.log('Wallet credited:', credit.data);

    // 5. Create a virtual card
    const card = await fintava.card.create({
      walletId: wallet.data.id,
      type: 'virtual',
      currency: 'NGN',
      spendingLimits: {
        daily: 50000,
        monthly: 200000,
        transaction: 10000
      }
    });
    console.log('Card created:', card.data);

    // 6. Make a bank transfer
    const transfer = await fintava.transfer.initiate({
      walletId: wallet.data.id,
      amount: 10000, // ₦100.00
      recipientBank: '044', // Access Bank
      recipientAccount: '1234567890',
      recipientName: 'Jane Smith',
      reference: `transfer-${Date.now()}`,
      description: 'Payment to supplier'
    });
    console.log('Transfer initiated:', transfer.data);

    // 7. Buy airtime
    const airtime = await fintava.utilities.buyAirtime({
      walletId: wallet.data.id,
      provider: 'MTN',
      phoneNumber: '+2348012345678',
      amount: 1000, // ₦10.00
      reference: `airtime-${Date.now()}`
    });
    console.log('Airtime purchased:', airtime.data);

    // 8. Setup webhook
    const webhook = await fintava.webhook.createEndpoint({
      url: 'https://yourapp.com/webhooks/fintava',
      events: [
        'customer.created',
        'wallet.credited',
        'transfer.successful',
        'card.transaction'
      ],
      description: 'Main webhook endpoint'
    });
    console.log('Webhook created:', webhook.data);

  } catch (error) {
    console.error('Error:', {
      code: error.code,
      message: error.message,
      statusCode: error.statusCode,
      details: error.details
    });
  }
}

// Run the server example
if (require.main === module) {
  serverExample();
}

module.exports = { serverExample };