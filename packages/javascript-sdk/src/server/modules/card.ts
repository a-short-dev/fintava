import { AxiosInstance } from 'axios';
import { 
  Card, 
  CreateCardData, 
  Transaction,
  ApiResponse, 
  PaginatedResponse,
  PaginationOptions,
  DateRange
} from '../../types';

export function setup(http: AxiosInstance) {
  return {
    /**
     * Create a new card (virtual or physical)
     */
    async create(data: CreateCardData): Promise<ApiResponse<Card>> {
      const response = await http.post<ApiResponse<Card>>('/cards', data);
      return response.data;
    },

    /**
     * Get card by ID
     */
    async getById(cardId: string): Promise<ApiResponse<Card>> {
      const response = await http.get<ApiResponse<Card>>(`/cards/${cardId}`);
      return response.data;
    },

    /**
     * Get cards by customer ID
     */
    async getByCustomerId(customerId: string): Promise<ApiResponse<Card[]>> {
      const response = await http.get<ApiResponse<Card[]>>(`/customers/${customerId}/cards`);
      return response.data;
    },

    /**
     * Get cards by wallet ID
     */
    async getByWalletId(walletId: string): Promise<ApiResponse<Card[]>> {
      const response = await http.get<ApiResponse<Card[]>>(`/wallets/${walletId}/cards`);
      return response.data;
    },

    /**
     * List all cards with filters
     */
    async list(options: PaginationOptions & {
      customerId?: string;
      walletId?: string;
      cardType?: 'virtual' | 'physical';
      status?: 'active' | 'inactive' | 'blocked' | 'expired';
      brand?: 'visa' | 'mastercard';
    } = {}): Promise<PaginatedResponse<Card>> {
      const { page = 1, limit = 20, ...filters } = options;
      const response = await http.get<PaginatedResponse<Card>>('/cards', {
        params: { page, limit, ...filters }
      });
      return response.data;
    },

    /**
     * Get card details (sensitive information)
     */
    async getCardDetails(cardId: string): Promise<ApiResponse<{
      cardNumber: string;
      expiryMonth: string;
      expiryYear: string;
      cvv: string;
    }>> {
      const response = await http.get<ApiResponse<{
        cardNumber: string;
        expiryMonth: string;
        expiryYear: string;
        cvv: string;
      }>>(`/cards/${cardId}/details`);
      return response.data;
    },

    /**
     * Activate a card
     */
    async activate(cardId: string, pin?: string): Promise<ApiResponse<Card>> {
      const response = await http.post<ApiResponse<Card>>(`/cards/${cardId}/activate`, {
        pin
      });
      return response.data;
    },

    /**
     * Deactivate a card
     */
    async deactivate(cardId: string, reason?: string): Promise<ApiResponse<Card>> {
      const response = await http.post<ApiResponse<Card>>(`/cards/${cardId}/deactivate`, {
        reason
      });
      return response.data;
    },

    /**
     * Block a card (temporary)
     */
    async block(cardId: string, reason?: string): Promise<ApiResponse<Card>> {
      const response = await http.post<ApiResponse<Card>>(`/cards/${cardId}/block`, {
        reason
      });
      return response.data;
    },

    /**
     * Unblock a card
     */
    async unblock(cardId: string): Promise<ApiResponse<Card>> {
      const response = await http.post<ApiResponse<Card>>(`/cards/${cardId}/unblock`);
      return response.data;
    },

    /**
     * Update card spending limit
     */
    async updateSpendingLimit(cardId: string, data: {
      spendingLimit: number;
      period?: 'daily' | 'weekly' | 'monthly';
    }): Promise<ApiResponse<Card>> {
      const response = await http.put<ApiResponse<Card>>(`/cards/${cardId}/spending-limit`, data);
      return response.data;
    },

    /**
     * Change card PIN
     */
    async changePin(cardId: string, data: {
      currentPin: string;
      newPin: string;
    }): Promise<ApiResponse<{ success: boolean }>> {
      const response = await http.post<ApiResponse<{ success: boolean }>>(`/cards/${cardId}/change-pin`, data);
      return response.data;
    },

    /**
     * Reset card PIN
     */
    async resetPin(cardId: string): Promise<ApiResponse<{ newPin: string }>> {
      const response = await http.post<ApiResponse<{ newPin: string }>>(`/cards/${cardId}/reset-pin`);
      return response.data;
    },

    /**
     * Get card transactions
     */
    async getTransactions(cardId: string, filters: PaginationOptions & DateRange & {
      status?: 'pending' | 'successful' | 'failed';
      type?: 'purchase' | 'withdrawal' | 'refund';
      minAmount?: number;
      maxAmount?: number;
    } = {}): Promise<PaginatedResponse<Transaction>> {
      const { page = 1, limit = 20, ...otherFilters } = filters;
      const response = await http.get<PaginatedResponse<Transaction>>(`/cards/${cardId}/transactions`, {
        params: { page, limit, ...otherFilters }
      });
      return response.data;
    },

    /**
     * Set card controls (merchant categories, countries, etc.)
     */
    async setControls(cardId: string, controls: {
      allowedMerchantCategories?: string[];
      blockedMerchantCategories?: string[];
      allowedCountries?: string[];
      blockedCountries?: string[];
      allowOnlineTransactions?: boolean;
      allowAtmWithdrawals?: boolean;
      allowContactlessPayments?: boolean;
    }): Promise<ApiResponse<Card>> {
      const response = await http.put<ApiResponse<Card>>(`/cards/${cardId}/controls`, controls);
      return response.data;
    },

    /**
     * Get card controls
     */
    async getControls(cardId: string): Promise<ApiResponse<{
      allowedMerchantCategories: string[];
      blockedMerchantCategories: string[];
      allowedCountries: string[];
      blockedCountries: string[];
      allowOnlineTransactions: boolean;
      allowAtmWithdrawals: boolean;
      allowContactlessPayments: boolean;
    }>> {
      const response = await http.get<ApiResponse<{
        allowedMerchantCategories: string[];
        blockedMerchantCategories: string[];
        allowedCountries: string[];
        blockedCountries: string[];
        allowOnlineTransactions: boolean;
        allowAtmWithdrawals: boolean;
        allowContactlessPayments: boolean;
      }>>(`/cards/${cardId}/controls`);
      return response.data;
    },

    /**
     * Request physical card delivery
     */
    async requestPhysicalDelivery(cardId: string, deliveryAddress: {
      street: string;
      city: string;
      state: string;
      country: string;
      postalCode: string;
      recipientName: string;
      recipientPhone: string;
    }): Promise<ApiResponse<{
      deliveryId: string;
      estimatedDeliveryDate: string;
      trackingNumber?: string;
    }>> {
      const response = await http.post<ApiResponse<{
        deliveryId: string;
        estimatedDeliveryDate: string;
        trackingNumber?: string;
      }>>(`/cards/${cardId}/request-delivery`, { deliveryAddress });
      return response.data;
    },

    /**
     * Track physical card delivery
     */
    async trackDelivery(deliveryId: string): Promise<ApiResponse<{
      status: 'pending' | 'shipped' | 'in_transit' | 'delivered' | 'failed';
      trackingNumber: string;
      estimatedDeliveryDate: string;
      deliveryUpdates: Array<{
        status: string;
        location: string;
        timestamp: string;
        description: string;
      }>;
    }>> {
      const response = await http.get<ApiResponse<{
        status: 'pending' | 'shipped' | 'in_transit' | 'delivered' | 'failed';
        trackingNumber: string;
        estimatedDeliveryDate: string;
        deliveryUpdates: Array<{
          status: string;
          location: string;
          timestamp: string;
          description: string;
        }>;
      }>>(`/cards/delivery/${deliveryId}/track`);
      return response.data;
    }
  };
}