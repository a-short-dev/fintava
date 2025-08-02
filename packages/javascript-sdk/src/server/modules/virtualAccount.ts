import { AxiosInstance } from 'axios';
import { 
  VirtualAccount, 
  CreateVirtualAccountData, 
  Transaction,
  ApiResponse, 
  PaginatedResponse,
  PaginationOptions,
  DateRange
} from '../../types';

export function setup(http: AxiosInstance) {
  return {
    /**
     * Create a new virtual account (NUBAN)
     */
    async create(data: CreateVirtualAccountData): Promise<ApiResponse<VirtualAccount>> {
      const response = await http.post<ApiResponse<VirtualAccount>>('/virtual-accounts', data);
      return response.data;
    },

    /**
     * Get virtual account by ID
     */
    async getById(virtualAccountId: string): Promise<ApiResponse<VirtualAccount>> {
      const response = await http.get<ApiResponse<VirtualAccount>>(`/virtual-accounts/${virtualAccountId}`);
      return response.data;
    },

    /**
     * Get virtual accounts by customer ID
     */
    async getByCustomerId(customerId: string): Promise<ApiResponse<VirtualAccount[]>> {
      const response = await http.get<ApiResponse<VirtualAccount[]>>(`/customers/${customerId}/virtual-accounts`);
      return response.data;
    },

    /**
     * Get virtual account by account number
     */
    async getByAccountNumber(accountNumber: string): Promise<ApiResponse<VirtualAccount>> {
      const response = await http.get<ApiResponse<VirtualAccount>>(`/virtual-accounts/account/${accountNumber}`);
      return response.data;
    },

    /**
     * List all virtual accounts with filters
     */
    async list(options: PaginationOptions & {
      customerId?: string;
      status?: 'active' | 'inactive';
      currency?: string;
      bankCode?: string;
    } = {}): Promise<PaginatedResponse<VirtualAccount>> {
      const { page = 1, limit = 20, ...filters } = options;
      const response = await http.get<PaginatedResponse<VirtualAccount>>('/virtual-accounts', {
        params: { page, limit, ...filters }
      });
      return response.data;
    },

    /**
     * Update virtual account details
     */
    async update(virtualAccountId: string, data: {
      accountName?: string;
      status?: 'active' | 'inactive';
    }): Promise<ApiResponse<VirtualAccount>> {
      const response = await http.put<ApiResponse<VirtualAccount>>(`/virtual-accounts/${virtualAccountId}`, data);
      return response.data;
    },

    /**
     * Deactivate a virtual account
     */
    async deactivate(virtualAccountId: string, reason?: string): Promise<ApiResponse<VirtualAccount>> {
      const response = await http.post<ApiResponse<VirtualAccount>>(`/virtual-accounts/${virtualAccountId}/deactivate`, {
        reason
      });
      return response.data;
    },

    /**
     * Reactivate a virtual account
     */
    async reactivate(virtualAccountId: string): Promise<ApiResponse<VirtualAccount>> {
      const response = await http.post<ApiResponse<VirtualAccount>>(`/virtual-accounts/${virtualAccountId}/reactivate`);
      return response.data;
    },

    /**
     * Get virtual account transactions
     */
    async getTransactions(virtualAccountId: string, filters: PaginationOptions & DateRange & {
      type?: 'credit' | 'debit';
      status?: 'pending' | 'successful' | 'failed';
      minAmount?: number;
      maxAmount?: number;
    } = {}): Promise<PaginatedResponse<Transaction>> {
      const { page = 1, limit = 20, ...otherFilters } = filters;
      const response = await http.get<PaginatedResponse<Transaction>>(`/virtual-accounts/${virtualAccountId}/transactions`, {
        params: { page, limit, ...otherFilters }
      });
      return response.data;
    },

    /**
     * Get virtual account balance
     */
    async getBalance(virtualAccountId: string): Promise<ApiResponse<{
      balance: number;
      currency: string;
      availableBalance: number;
      pendingBalance: number;
    }>> {
      const response = await http.get<ApiResponse<{
        balance: number;
        currency: string;
        availableBalance: number;
        pendingBalance: number;
      }>>(`/virtual-accounts/${virtualAccountId}/balance`);
      return response.data;
    },

    /**
     * Set up automatic sweep configuration
     * (Automatically transfer funds to a main wallet when received)
     */
    async setupAutoSweep(virtualAccountId: string, config: {
      enabled: boolean;
      destinationWalletId: string;
      minimumAmount?: number;
      sweepPercentage?: number; // 0-100
      sweepDelay?: number; // minutes
    }): Promise<ApiResponse<{
      autoSweepId: string;
      config: any;
    }>> {
      const response = await http.post<ApiResponse<{
        autoSweepId: string;
        config: any;
      }>>(`/virtual-accounts/${virtualAccountId}/auto-sweep`, config);
      return response.data;
    },

    /**
     * Get auto sweep configuration
     */
    async getAutoSweepConfig(virtualAccountId: string): Promise<ApiResponse<{
      enabled: boolean;
      destinationWalletId: string;
      minimumAmount: number;
      sweepPercentage: number;
      sweepDelay: number;
      lastSweepAt?: string;
    }>> {
      const response = await http.get<ApiResponse<{
        enabled: boolean;
        destinationWalletId: string;
        minimumAmount: number;
        sweepPercentage: number;
        sweepDelay: number;
        lastSweepAt?: string;
      }>>(`/virtual-accounts/${virtualAccountId}/auto-sweep`);
      return response.data;
    },

    /**
     * Disable auto sweep
     */
    async disableAutoSweep(virtualAccountId: string): Promise<ApiResponse<{ disabled: boolean }>> {
      const response = await http.delete<ApiResponse<{ disabled: boolean }>>(`/virtual-accounts/${virtualAccountId}/auto-sweep`);
      return response.data;
    },

    /**
     * Generate QR code for virtual account
     */
    async generateQRCode(virtualAccountId: string, options: {
      amount?: number;
      description?: string;
      format?: 'png' | 'svg';
      size?: number;
    } = {}): Promise<ApiResponse<{
      qrCodeData: string;
      qrCodeUrl: string;
    }>> {
      const response = await http.post<ApiResponse<{
        qrCodeData: string;
        qrCodeUrl: string;
      }>>(`/virtual-accounts/${virtualAccountId}/qr-code`, options);
      return response.data;
    },

    /**
     * Get virtual account statement
     */
    async getStatement(virtualAccountId: string, options: {
      startDate: string;
      endDate: string;
      format?: 'json' | 'pdf' | 'csv';
    }): Promise<ApiResponse<Transaction[]> | Blob> {
      const { format = 'json', ...dateRange } = options;
      
      if (format === 'json') {
        const response = await http.get<ApiResponse<Transaction[]>>(`/virtual-accounts/${virtualAccountId}/statement`, {
          params: { ...dateRange, format }
        });
        return response.data;
      } else {
        const response = await http.get(`/virtual-accounts/${virtualAccountId}/statement`, {
          params: { ...dateRange, format },
          responseType: 'blob'
        });
        return response.data;
      }
    },

    /**
     * Set webhook URL for virtual account events
     */
    async setWebhook(virtualAccountId: string, webhookUrl: string, events: string[] = ['credit', 'debit']): Promise<ApiResponse<{
      webhookId: string;
      url: string;
      events: string[];
    }>> {
      const response = await http.post<ApiResponse<{
        webhookId: string;
        url: string;
        events: string[];
      }>>(`/virtual-accounts/${virtualAccountId}/webhook`, {
        url: webhookUrl,
        events
      });
      return response.data;
    },

    /**
     * Remove webhook from virtual account
     */
    async removeWebhook(virtualAccountId: string): Promise<ApiResponse<{ removed: boolean }>> {
      const response = await http.delete<ApiResponse<{ removed: boolean }>>(`/virtual-accounts/${virtualAccountId}/webhook`);
      return response.data;
    }
  };
}