import { AxiosInstance } from 'axios';
import { 
  Customer, 
  CreateCustomerData, 
  ApiResponse, 
  PaginatedResponse,
  PaginationOptions 
} from '../../types';

export function setup(http: AxiosInstance) {
  return {
    /**
     * Create a new customer
     */
    async create(data: CreateCustomerData): Promise<ApiResponse<Customer>> {
      const response = await http.post<ApiResponse<Customer>>('/customers', data);
      return response.data;
    },

    /**
     * Get customer by ID
     */
    async getById(customerId: string): Promise<ApiResponse<Customer>> {
      const response = await http.get<ApiResponse<Customer>>(`/customers/${customerId}`);
      return response.data;
    },

    /**
     * Get customer by phone number
     */
    async getByPhone(phone: string): Promise<ApiResponse<Customer>> {
      const response = await http.get<ApiResponse<Customer>>(`/customers/phone/${phone}`);
      return response.data;
    },

    /**
     * Get customer by email
     */
    async getByEmail(email: string): Promise<ApiResponse<Customer>> {
      const response = await http.get<ApiResponse<Customer>>(`/customers/email/${email}`);
      return response.data;
    },

    /**
     * Update customer information
     */
    async update(customerId: string, data: Partial<CreateCustomerData>): Promise<ApiResponse<Customer>> {
      const response = await http.put<ApiResponse<Customer>>(`/customers/${customerId}`, data);
      return response.data;
    },

    /**
     * List all customers with pagination
     */
    async list(options: PaginationOptions = {}): Promise<PaginatedResponse<Customer>> {
      const { page = 1, limit = 20 } = options;
      const response = await http.get<PaginatedResponse<Customer>>('/customers', {
        params: { page, limit }
      });
      return response.data;
    },

    /**
     * Upgrade customer tier (KYC level)
     */
    async upgradeTier(customerId: string, tier: 2 | 3, documents?: {
      bvn?: string;
      nin?: string;
      idDocument?: string;
      proofOfAddress?: string;
    }): Promise<ApiResponse<Customer>> {
      const response = await http.post<ApiResponse<Customer>>(`/customers/${customerId}/upgrade-tier`, {
        tier,
        ...documents
      });
      return response.data;
    },

    /**
     * Suspend a customer account
     */
    async suspend(customerId: string, reason?: string): Promise<ApiResponse<Customer>> {
      const response = await http.post<ApiResponse<Customer>>(`/customers/${customerId}/suspend`, {
        reason
      });
      return response.data;
    },

    /**
     * Reactivate a suspended customer account
     */
    async reactivate(customerId: string): Promise<ApiResponse<Customer>> {
      const response = await http.post<ApiResponse<Customer>>(`/customers/${customerId}/reactivate`);
      return response.data;
    },

    /**
     * Delete a customer (soft delete)
     */
    async delete(customerId: string): Promise<ApiResponse<{ deleted: boolean }>> {
      const response = await http.delete<ApiResponse<{ deleted: boolean }>>(`/customers/${customerId}`);
      return response.data;
    }
  };
}
