import { AxiosInstance } from 'axios';
import { 
  Transfer, 
  CreateTransferData, 
  Bank,
  AccountVerification,
  ApiResponse, 
  PaginatedResponse,
  PaginationOptions,
  DateRange
} from '../../types';

export function setup(http: AxiosInstance) {
  return {
    /**
     * Initiate a transfer to another bank account
     */
    async create(data: CreateTransferData): Promise<ApiResponse<Transfer>> {
      const response = await http.post<ApiResponse<Transfer>>('/transfers', data);
      return response.data;
    },

    /**
     * Get transfer by ID
     */
    async getById(transferId: string): Promise<ApiResponse<Transfer>> {
      const response = await http.get<ApiResponse<Transfer>>(`/transfers/${transferId}`);
      return response.data;
    },

    /**
     * Get transfer by reference
     */
    async getByReference(reference: string): Promise<ApiResponse<Transfer>> {
      const response = await http.get<ApiResponse<Transfer>>(`/transfers/reference/${reference}`);
      return response.data;
    },

    /**
     * List transfers with filters
     */
    async list(options: PaginationOptions & DateRange & {
      walletId?: string;
      customerId?: string;
      status?: 'pending' | 'successful' | 'failed';
      minAmount?: number;
      maxAmount?: number;
    } = {}): Promise<PaginatedResponse<Transfer>> {
      const { page = 1, limit = 20, ...filters } = options;
      const response = await http.get<PaginatedResponse<Transfer>>('/transfers', {
        params: { page, limit, ...filters }
      });
      return response.data;
    },

    /**
     * Verify bank account details before transfer
     */
    async verifyAccount(data: {
      accountNumber: string;
      bankCode: string;
    }): Promise<ApiResponse<AccountVerification>> {
      const response = await http.post<ApiResponse<AccountVerification>>('/transfers/verify-account', data);
      return response.data;
    },

    /**
     * Get list of supported banks
     */
    async getBanks(country: string = 'NG'): Promise<ApiResponse<Bank[]>> {
      const response = await http.get<ApiResponse<Bank[]>>('/transfers/banks', {
        params: { country }
      });
      return response.data;
    },

    /**
     * Get bank by code
     */
    async getBankByCode(bankCode: string): Promise<ApiResponse<Bank>> {
      const response = await http.get<ApiResponse<Bank>>(`/transfers/banks/${bankCode}`);
      return response.data;
    },

    /**
     * Cancel a pending transfer
     */
    async cancel(transferId: string, reason?: string): Promise<ApiResponse<Transfer>> {
      const response = await http.post<ApiResponse<Transfer>>(`/transfers/${transferId}/cancel`, {
        reason
      });
      return response.data;
    },

    /**
     * Retry a failed transfer
     */
    async retry(transferId: string): Promise<ApiResponse<Transfer>> {
      const response = await http.post<ApiResponse<Transfer>>(`/transfers/${transferId}/retry`);
      return response.data;
    },

    /**
     * Get transfer fees for a specific amount and destination
     */
    async getFees(data: {
      amount: number;
      currency: string;
      destinationBankCode: string;
      transferType?: 'instant' | 'standard';
    }): Promise<ApiResponse<{
      fee: number;
      totalAmount: number;
      currency: string;
      transferType: string;
    }>> {
      const response = await http.post<ApiResponse<{
        fee: number;
        totalAmount: number;
        currency: string;
        transferType: string;
      }>>('/transfers/fees', data);
      return response.data;
    },

    /**
     * Bulk transfer to multiple recipients
     */
    async bulkTransfer(data: {
      sourceWalletId: string;
      transfers: Array<{
        amount: number;
        destinationAccountNumber: string;
        destinationBankCode: string;
        narration: string;
        reference?: string;
        metadata?: Record<string, any>;
      }>;
      batchReference?: string;
    }): Promise<ApiResponse<{
      batchId: string;
      totalAmount: number;
      totalFees: number;
      transfers: Transfer[];
    }>> {
      const response = await http.post<ApiResponse<{
        batchId: string;
        totalAmount: number;
        totalFees: number;
        transfers: Transfer[];
      }>>('/transfers/bulk', data);
      return response.data;
    },

    /**
     * Get bulk transfer status
     */
    async getBulkTransferStatus(batchId: string): Promise<ApiResponse<{
      batchId: string;
      status: 'pending' | 'processing' | 'completed' | 'failed';
      totalTransfers: number;
      successfulTransfers: number;
      failedTransfers: number;
      transfers: Transfer[];
    }>> {
      const response = await http.get<ApiResponse<{
        batchId: string;
        status: 'pending' | 'processing' | 'completed' | 'failed';
        totalTransfers: number;
        successfulTransfers: number;
        failedTransfers: number;
        transfers: Transfer[];
      }>>(`/transfers/bulk/${batchId}`);
      return response.data;
    },

    /**
     * Transfer between wallets within the same platform
     */
    async internalTransfer(data: {
      sourceWalletId: string;
      destinationWalletId: string;
      amount: number;
      narration: string;
      reference?: string;
      metadata?: Record<string, any>;
    }): Promise<ApiResponse<{
      sourceTransaction: any;
      destinationTransaction: any;
      reference: string;
    }>> {
      const response = await http.post<ApiResponse<{
        sourceTransaction: any;
        destinationTransaction: any;
        reference: string;
      }>>('/transfers/internal', data);
      return response.data;
    }
  };
}