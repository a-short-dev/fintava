import { AxiosInstance } from 'axios';
import { 
  Wallet, 
  CreateWalletData, 
  Transaction,
  ApiResponse, 
  PaginatedResponse,
  PaginationOptions,
  TransactionFilters
} from '../../types';

export function setup(http: AxiosInstance) {
  return {
    /**
     * Create a new wallet for a customer
     */
    async create(data: CreateWalletData): Promise<ApiResponse<Wallet>> {
      const response = await http.post<ApiResponse<Wallet>>('/wallets', data);
      return response.data;
    },

    /**
     * Get wallet by ID
     */
    async getById(walletId: string): Promise<ApiResponse<Wallet>> {
      const response = await http.get<ApiResponse<Wallet>>(`/wallets/${walletId}`);
      return response.data;
    },

    /**
     * Get wallets by customer ID
     */
    async getByCustomerId(customerId: string): Promise<ApiResponse<Wallet[]>> {
      const response = await http.get<ApiResponse<Wallet[]>>(`/customers/${customerId}/wallets`);
      return response.data;
    },

    /**
     * Get wallet balance
     */
    async getBalance(walletId: string): Promise<ApiResponse<{ balance: number; currency: string }>> {
      const response = await http.get<ApiResponse<{ balance: number; currency: string }>>(`/wallets/${walletId}/balance`);
      return response.data;
    },

    /**
     * Credit a wallet (add funds)
     */
    async credit(walletId: string, data: {
      amount: number;
      reference?: string;
      description?: string;
      metadata?: Record<string, any>;
    }): Promise<ApiResponse<Transaction>> {
      const response = await http.post<ApiResponse<Transaction>>(`/wallets/${walletId}/credit`, data);
      return response.data;
    },

    /**
     * Debit a wallet (remove funds)
     */
    async debit(walletId: string, data: {
      amount: number;
      reference?: string;
      description?: string;
      metadata?: Record<string, any>;
    }): Promise<ApiResponse<Transaction>> {
      const response = await http.post<ApiResponse<Transaction>>(`/wallets/${walletId}/debit`, data);
      return response.data;
    },

    /**
     * Get wallet transaction history
     */
    async getTransactions(walletId: string, filters: TransactionFilters = {}): Promise<PaginatedResponse<Transaction>> {
      const { page = 1, limit = 20, ...otherFilters } = filters;
      const response = await http.get<PaginatedResponse<Transaction>>(`/wallets/${walletId}/transactions`, {
        params: { page, limit, ...otherFilters }
      });
      return response.data;
    },

    /**
     * Freeze a wallet (prevent transactions)
     */
    async freeze(walletId: string, reason?: string): Promise<ApiResponse<Wallet>> {
      const response = await http.post<ApiResponse<Wallet>>(`/wallets/${walletId}/freeze`, {
        reason
      });
      return response.data;
    },

    /**
     * Unfreeze a wallet
     */
    async unfreeze(walletId: string): Promise<ApiResponse<Wallet>> {
      const response = await http.post<ApiResponse<Wallet>>(`/wallets/${walletId}/unfreeze`);
      return response.data;
    },

    /**
     * Close a wallet
     */
    async close(walletId: string): Promise<ApiResponse<{ closed: boolean }>> {
      const response = await http.post<ApiResponse<{ closed: boolean }>>(`/wallets/${walletId}/close`);
      return response.data;
    },

    /**
     * List all wallets with pagination
     */
    async list(options: PaginationOptions & {
      customerId?: string;
      status?: 'active' | 'inactive' | 'frozen';
      currency?: string;
    } = {}): Promise<PaginatedResponse<Wallet>> {
      const { page = 1, limit = 20, ...filters } = options;
      const response = await http.get<PaginatedResponse<Wallet>>('/wallets', {
        params: { page, limit, ...filters }
      });
      return response.data;
    },

    /**
     * Get wallet statement for a date range
     */
    async getStatement(walletId: string, options: {
      startDate: string;
      endDate: string;
      format?: 'json' | 'pdf' | 'csv';
    }): Promise<ApiResponse<Transaction[]> | Blob> {
      const { format = 'json', ...dateRange } = options;
      
      if (format === 'json') {
        const response = await http.get<ApiResponse<Transaction[]>>(`/wallets/${walletId}/statement`, {
          params: { ...dateRange, format }
        });
        return response.data;
      } else {
        const response = await http.get(`/wallets/${walletId}/statement`, {
          params: { ...dateRange, format },
          responseType: 'blob'
        });
        return response.data;
      }
    }
  };
}