// Core types for Fintava SDK

export interface FintavaConfig {
  secretKey?: string;
  publicKey?: string;
  baseUrl?: string;
  environment?: 'test' | 'live';
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  status_code: number;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}

// Customer types
export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  address?: Address;
  bvn?: string;
  nin?: string;
  status: 'active' | 'inactive' | 'suspended';
  tier: 1 | 2 | 3;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  address?: Partial<Address>;
  bvn?: string;
  nin?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
}

// Wallet types
export interface Wallet {
  id: string;
  customerId: string;
  accountNumber: string;
  accountName: string;
  bankName: string;
  bankCode: string;
  balance: number;
  currency: string;
  status: 'active' | 'inactive' | 'frozen';
  type: 'savings' | 'current';
  createdAt: string;
  updatedAt: string;
}

export interface CreateWalletData {
  customerId: string;
  currency?: string;
  type?: 'savings' | 'current';
}

// Transaction types
export interface Transaction {
  id: string;
  reference: string;
  amount: number;
  currency: string;
  type: 'credit' | 'debit';
  status: 'pending' | 'successful' | 'failed';
  description: string;
  walletId: string;
  customerId: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

// Transfer types
export interface Transfer {
  id: string;
  reference: string;
  amount: number;
  currency: string;
  sourceWalletId: string;
  destinationAccountNumber: string;
  destinationBankCode: string;
  destinationAccountName: string;
  narration: string;
  status: 'pending' | 'successful' | 'failed';
  fee: number;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransferData {
  amount: number;
  sourceWalletId: string;
  destinationAccountNumber: string;
  destinationBankCode: string;
  narration: string;
  reference?: string;
  metadata?: Record<string, any>;
}

// Card types
export interface Card {
  id: string;
  customerId: string;
  walletId: string;
  cardNumber: string;
  maskedCardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardType: 'virtual' | 'physical';
  brand: 'visa' | 'mastercard';
  status: 'active' | 'inactive' | 'blocked' | 'expired';
  spendingLimit: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCardData {
  customerId: string;
  walletId: string;
  cardType: 'virtual' | 'physical';
  spendingLimit?: number;
  currency?: string;
}

// Virtual Account types
export interface VirtualAccount {
  id: string;
  customerId: string;
  accountNumber: string;
  accountName: string;
  bankName: string;
  bankCode: string;
  currency: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface CreateVirtualAccountData {
  customerId: string;
  currency?: string;
  accountName?: string;
}

// Bank types
export interface Bank {
  code: string;
  name: string;
  slug: string;
  country: string;
  currency: string;
  type: 'commercial' | 'microfinance' | 'mortgage';
}

export interface AccountVerification {
  accountNumber: string;
  accountName: string;
  bankCode: string;
  bankName: string;
}

// Webhook types
export interface WebhookEvent {
  event: string;
  data: any;
  timestamp: string;
  signature: string;
}

// Error types
export interface FintavaError {
  message: string;
  code: string;
  statusCode: number;
  details?: any;
}

// Utility types
export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface DateRange {
  startDate?: string;
  endDate?: string;
}

export interface TransactionFilters extends PaginationOptions, DateRange {
  status?: 'pending' | 'successful' | 'failed';
  type?: 'credit' | 'debit';
  walletId?: string;
  customerId?: string;
}

// Payment types
export interface PaymentOptions {
  amount: number;
  currency: string;
  reference: string;
  customerEmail: string;
  customerName?: string;
  customerPhone?: string;
  description?: string;
  metadata?: Record<string, any>;
  callbackUrl?: string;
  cancelUrl?: string;
  onSuccess?: (response: PaymentResponse) => void;
  onError?: (error: any) => void;
  onClose?: () => void;
}

export interface PaymentResponse {
  success: boolean;
  reference: string;
  amount: number;
  currency: string;
  paidAt: string;
  channel: string;
  fees: number;
  customer: {
    email: string;
    name?: string;
    phone?: string;
  };
  metadata?: Record<string, any>;
  transactionId: string;
  gatewayResponse?: any;
}