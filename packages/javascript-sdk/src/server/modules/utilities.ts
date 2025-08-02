import { AxiosInstance } from 'axios';
import { ApiResponse, PaginatedResponse, PaginationOptions } from '../../types';

// Export utility types
export interface BillPayment {
  id: string;
  reference: string;
  amount: number;
  fee: number;
  status: 'pending' | 'successful' | 'failed';
  provider: string;
  category: string;
  customerIdentifier: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface BillProvider {
  id: string;
  name: string;
  category: string;
  code: string;
  isActive: boolean;
  fee: number;
  minimumAmount?: number;
  maximumAmount?: number;
}

export interface DataPlan {
  id: string;
  name: string;
  code: string;
  amount: number;
  validity: string;
  provider: string;
}

export interface CablePlan {
  id: string;
  name: string;
  code: string;
  amount: number;
  provider: string;
  validity?: string;
}

// Additional utility-specific types for internal use
interface BillCategory {
  id: string;
  name: string;
  code: string;
  description: string;
}

interface ValidationResult {
  isValid: boolean;
  customerName?: string;
  customerAddress?: string;
  metadata?: Record<string, any>;
}

export function setup(http: AxiosInstance) {
  return {
    /**
     * Get all available bill categories
     */
    async getCategories(): Promise<ApiResponse<Array<{
      id: string;
      name: string;
      description: string;
      icon?: string;
    }>>> {
      const response = await http.get<ApiResponse<Array<{
        id: string;
        name: string;
        description: string;
        icon?: string;
      }>>>('/utilities/categories');
      return response.data;
    },

    /**
     * Get bill providers by category
     */
    async getProviders(category: string, country: string = 'NG'): Promise<ApiResponse<BillProvider[]>> {
      const response = await http.get<ApiResponse<BillProvider[]>>('/utilities/providers', {
        params: { category, country }
      });
      return response.data;
    },

    /**
     * Get provider by ID
     */
    async getProvider(providerId: string): Promise<ApiResponse<BillProvider>> {
      const response = await http.get<ApiResponse<BillProvider>>(`/utilities/providers/${providerId}`);
      return response.data;
    },

    /**
     * Validate customer identifier (meter number, phone, etc.)
     */
    async validateCustomer(data: {
      providerId: string;
      customerIdentifier: string;
    }): Promise<ApiResponse<{
      isValid: boolean;
      customerName?: string;
      customerAddress?: string;
      outstandingBalance?: number;
      additionalInfo?: Record<string, any>;
    }>> {
      const response = await http.post<ApiResponse<{
        isValid: boolean;
        customerName?: string;
        customerAddress?: string;
        outstandingBalance?: number;
        additionalInfo?: Record<string, any>;
      }>>('/utilities/validate-customer', data);
      return response.data;
    },

    /**
     * Pay a bill
     */
    async payBill(data: {
      walletId: string;
      providerId: string;
      customerIdentifier: string;
      amount: number;
      reference?: string;
      metadata?: Record<string, any>;
    }): Promise<ApiResponse<BillPayment>> {
      const response = await http.post<ApiResponse<BillPayment>>('/utilities/pay-bill', data);
      return response.data;
    },

    /**
     * Get bill payment by ID
     */
    async getBillPayment(paymentId: string): Promise<ApiResponse<BillPayment>> {
      const response = await http.get<ApiResponse<BillPayment>>(`/utilities/payments/${paymentId}`);
      return response.data;
    },

    /**
     * Get bill payment by reference
     */
    async getBillPaymentByReference(reference: string): Promise<ApiResponse<BillPayment>> {
      const response = await http.get<ApiResponse<BillPayment>>(`/utilities/payments/reference/${reference}`);
      return response.data;
    },

    /**
     * List bill payments with filters
     */
    async listBillPayments(options: PaginationOptions & {
      walletId?: string;
      customerId?: string;
      category?: string;
      providerId?: string;
      status?: 'pending' | 'successful' | 'failed';
      startDate?: string;
      endDate?: string;
    } = {}): Promise<PaginatedResponse<BillPayment>> {
      const { page = 1, limit = 20, ...filters } = options;
      const response = await http.get<PaginatedResponse<BillPayment>>('/utilities/payments', {
        params: { page, limit, ...filters }
      });
      return response.data;
    },

    // Airtime specific methods
    airtime: {
      /**
       * Get airtime providers (telecom networks)
       */
      async getProviders(country: string = 'NG'): Promise<ApiResponse<BillProvider[]>> {
        const response = await http.get<ApiResponse<BillProvider[]>>('/utilities/airtime/providers', {
          params: { country }
        });
        return response.data;
      },

      /**
       * Purchase airtime
       */
      async purchase(data: {
        walletId: string;
        providerId: string;
        phoneNumber: string;
        amount: number;
        reference?: string;
      }): Promise<ApiResponse<BillPayment>> {
        const response = await http.post<ApiResponse<BillPayment>>('/utilities/airtime/purchase', data);
        return response.data;
      }
    },

    // Data bundle specific methods
    data: {
      /**
       * Get data providers
       */
      async getProviders(country: string = 'NG'): Promise<ApiResponse<BillProvider[]>> {
        const response = await http.get<ApiResponse<BillProvider[]>>('/utilities/data/providers', {
          params: { country }
        });
        return response.data;
      },

      /**
       * Get data plans for a provider
       */
      async getPlans(providerId: string): Promise<ApiResponse<DataPlan[]>> {
        const response = await http.get<ApiResponse<DataPlan[]>>(`/utilities/data/providers/${providerId}/plans`);
        return response.data;
      },

      /**
       * Purchase data bundle
       */
      async purchase(data: {
        walletId: string;
        providerId: string;
        planId: string;
        phoneNumber: string;
        reference?: string;
      }): Promise<ApiResponse<BillPayment>> {
        const response = await http.post<ApiResponse<BillPayment>>('/utilities/data/purchase', data);
        return response.data;
      }
    },

    // Electricity specific methods
    electricity: {
      /**
       * Get electricity providers (DISCOs)
       */
      async getProviders(country: string = 'NG'): Promise<ApiResponse<BillProvider[]>> {
        const response = await http.get<ApiResponse<BillProvider[]>>('/utilities/electricity/providers', {
          params: { country }
        });
        return response.data;
      },

      /**
       * Validate meter number
       */
      async validateMeter(data: {
        providerId: string;
        meterNumber: string;
        meterType: 'prepaid' | 'postpaid';
      }): Promise<ApiResponse<{
        isValid: boolean;
        customerName?: string;
        customerAddress?: string;
        outstandingBalance?: number;
      }>> {
        const response = await http.post<ApiResponse<{
          isValid: boolean;
          customerName?: string;
          customerAddress?: string;
          outstandingBalance?: number;
        }>>('/utilities/electricity/validate-meter', data);
        return response.data;
      },

      /**
       * Purchase electricity units
       */
      async purchase(data: {
        walletId: string;
        providerId: string;
        meterNumber: string;
        meterType: 'prepaid' | 'postpaid';
        amount: number;
        reference?: string;
      }): Promise<ApiResponse<BillPayment & {
        token?: string; // For prepaid meters
        units?: number;
      }>> {
        const response = await http.post<ApiResponse<BillPayment & {
          token?: string;
          units?: number;
        }>>('/utilities/electricity/purchase', data);
        return response.data;
      }
    },

    // Cable TV specific methods
    cable: {
      /**
       * Get cable TV providers
       */
      async getProviders(country: string = 'NG'): Promise<ApiResponse<BillProvider[]>> {
        const response = await http.get<ApiResponse<BillProvider[]>>('/utilities/cable/providers', {
          params: { country }
        });
        return response.data;
      },

      /**
       * Get cable TV plans for a provider
       */
      async getPlans(providerId: string): Promise<ApiResponse<CablePlan[]>> {
        const response = await http.get<ApiResponse<CablePlan[]>>(`/utilities/cable/providers/${providerId}/plans`);
        return response.data;
      },

      /**
       * Validate smart card number
       */
      async validateSmartCard(data: {
        providerId: string;
        smartCardNumber: string;
      }): Promise<ApiResponse<{
        isValid: boolean;
        customerName?: string;
        currentPlan?: string;
        expiryDate?: string;
      }>> {
        const response = await http.post<ApiResponse<{
          isValid: boolean;
          customerName?: string;
          currentPlan?: string;
          expiryDate?: string;
        }>>('/utilities/cable/validate-smartcard', data);
        return response.data;
      },

      /**
       * Subscribe to cable TV plan
       */
      async subscribe(data: {
        walletId: string;
        providerId: string;
        planId: string;
        smartCardNumber: string;
        reference?: string;
      }): Promise<ApiResponse<BillPayment>> {
        const response = await http.post<ApiResponse<BillPayment>>('/utilities/cable/subscribe', data);
        return response.data;
      }
    },

    // Internet specific methods
    internet: {
      /**
       * Get internet service providers
       */
      async getProviders(country: string = 'NG'): Promise<ApiResponse<BillProvider[]>> {
        const response = await http.get<ApiResponse<BillProvider[]>>('/utilities/internet/providers', {
          params: { country }
        });
        return response.data;
      },

      /**
       * Get internet plans for a provider
       */
      async getPlans(providerId: string): Promise<ApiResponse<DataPlan[]>> {
        const response = await http.get<ApiResponse<DataPlan[]>>(`/utilities/internet/providers/${providerId}/plans`);
        return response.data;
      },

      /**
       * Subscribe to internet plan
       */
      async subscribe(data: {
        walletId: string;
        providerId: string;
        planId: string;
        customerIdentifier: string;
        reference?: string;
      }): Promise<ApiResponse<BillPayment>> {
        const response = await http.post<ApiResponse<BillPayment>>('/utilities/internet/subscribe', data);
        return response.data;
      }
    }
  };
}