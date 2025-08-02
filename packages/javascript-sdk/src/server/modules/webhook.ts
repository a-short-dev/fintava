import { AxiosInstance } from 'axios';
import { createHmac } from 'crypto';
import { 
  WebhookEvent,
  ApiResponse, 
  PaginatedResponse,
  PaginationOptions
} from '../../types';

// Webhook-specific types
export interface WebhookEndpoint {
  id: string;
  url: string;
  events: string[];
  secret: string;
  isActive: boolean;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WebhookDelivery {
  id: string;
  webhookEndpointId: string;
  event: string;
  payload: any;
  responseStatus?: number;
  responseBody?: string;
  attempts: number;
  maxAttempts: number;
  nextRetryAt?: string;
  status: 'pending' | 'delivered' | 'failed' | 'cancelled';
  createdAt: string;
  deliveredAt?: string;
}

export function setup(http: AxiosInstance) {
  return {
    /**
     * Create a new webhook endpoint
     */
    async createEndpoint(data: {
      url: string;
      events: string[];
      description?: string;
    }): Promise<ApiResponse<WebhookEndpoint>> {
      const response = await http.post<ApiResponse<WebhookEndpoint>>('/webhooks/endpoints', data);
      return response.data;
    },

    /**
     * Get webhook endpoint by ID
     */
    async getEndpoint(endpointId: string): Promise<ApiResponse<WebhookEndpoint>> {
      const response = await http.get<ApiResponse<WebhookEndpoint>>(`/webhooks/endpoints/${endpointId}`);
      return response.data;
    },

    /**
     * List all webhook endpoints
     */
    async listEndpoints(options: PaginationOptions = {}): Promise<PaginatedResponse<WebhookEndpoint>> {
      const { page = 1, limit = 20 } = options;
      const response = await http.get<PaginatedResponse<WebhookEndpoint>>('/webhooks/endpoints', {
        params: { page, limit }
      });
      return response.data;
    },

    /**
     * Update webhook endpoint
     */
    async updateEndpoint(endpointId: string, data: {
      url?: string;
      events?: string[];
      description?: string;
      isActive?: boolean;
    }): Promise<ApiResponse<WebhookEndpoint>> {
      const response = await http.put<ApiResponse<WebhookEndpoint>>(`/webhooks/endpoints/${endpointId}`, data);
      return response.data;
    },

    /**
     * Delete webhook endpoint
     */
    async deleteEndpoint(endpointId: string): Promise<ApiResponse<{ deleted: boolean }>> {
      const response = await http.delete<ApiResponse<{ deleted: boolean }>>(`/webhooks/endpoints/${endpointId}`);
      return response.data;
    },

    /**
     * Regenerate webhook endpoint secret
     */
    async regenerateSecret(endpointId: string): Promise<ApiResponse<{ secret: string }>> {
      const response = await http.post<ApiResponse<{ secret: string }>>(`/webhooks/endpoints/${endpointId}/regenerate-secret`);
      return response.data;
    },

    /**
     * Test webhook endpoint
     */
    async testEndpoint(endpointId: string, eventType?: string): Promise<ApiResponse<{
      success: boolean;
      responseStatus: number;
      responseTime: number;
      error?: string;
    }>> {
      const response = await http.post<ApiResponse<{
        success: boolean;
        responseStatus: number;
        responseTime: number;
        error?: string;
      }>>(`/webhooks/endpoints/${endpointId}/test`, {
        eventType: eventType || 'test.webhook'
      });
      return response.data;
    },

    /**
     * Get webhook deliveries for an endpoint
     */
    async getDeliveries(endpointId: string, options: PaginationOptions & {
      status?: 'pending' | 'delivered' | 'failed' | 'cancelled';
      event?: string;
      startDate?: string;
      endDate?: string;
    } = {}): Promise<PaginatedResponse<WebhookDelivery>> {
      const { page = 1, limit = 20, ...filters } = options;
      const response = await http.get<PaginatedResponse<WebhookDelivery>>(`/webhooks/endpoints/${endpointId}/deliveries`, {
        params: { page, limit, ...filters }
      });
      return response.data;
    },

    /**
     * Get specific webhook delivery
     */
    async getDelivery(deliveryId: string): Promise<ApiResponse<WebhookDelivery>> {
      const response = await http.get<ApiResponse<WebhookDelivery>>(`/webhooks/deliveries/${deliveryId}`);
      return response.data;
    },

    /**
     * Retry failed webhook delivery
     */
    async retryDelivery(deliveryId: string): Promise<ApiResponse<WebhookDelivery>> {
      const response = await http.post<ApiResponse<WebhookDelivery>>(`/webhooks/deliveries/${deliveryId}/retry`);
      return response.data;
    },

    /**
     * Cancel pending webhook delivery
     */
    async cancelDelivery(deliveryId: string): Promise<ApiResponse<WebhookDelivery>> {
      const response = await http.post<ApiResponse<WebhookDelivery>>(`/webhooks/deliveries/${deliveryId}/cancel`);
      return response.data;
    },

    /**
     * Get available webhook events
     */
    async getAvailableEvents(): Promise<ApiResponse<Array<{
      event: string;
      description: string;
      category: string;
      examplePayload: any;
    }>>> {
      const response = await http.get<ApiResponse<Array<{
        event: string;
        description: string;
        category: string;
        examplePayload: any;
      }>>>('/webhooks/events');
      return response.data;
    },

    /**
     * Verify webhook signature
     * This is a utility function to verify webhook signatures on your server
     */
    verifySignature(payload: string, signature: string, secret: string): boolean {
      try {
        const expectedSignature = createHmac('sha256', secret)
          .update(payload)
          .digest('hex');
        
        // Remove 'sha256=' prefix if present
        const cleanSignature = signature.replace('sha256=', '');
        
        return expectedSignature === cleanSignature;
      } catch (error) {
        return false;
      }
    },

    /**
     * Parse webhook event from request
     * Utility function to parse and verify webhook events
     */
    parseEvent(payload: string, signature: string, secret: string): WebhookEvent | null {
      try {
        // Verify signature first
        if (!this.verifySignature(payload, signature, secret)) {
          throw new Error('Invalid webhook signature');
        }

        // Parse the payload
        const event = JSON.parse(payload) as WebhookEvent;
        
        // Basic validation
        if (!event.event || !event.data || !event.timestamp) {
          throw new Error('Invalid webhook event format');
        }

        return event;
      } catch (error) {
        console.error('Failed to parse webhook event:', error);
        return null;
      }
    },

    /**
     * Get webhook statistics
     */
    async getStatistics(options: {
      endpointId?: string;
      startDate?: string;
      endDate?: string;
    } = {}): Promise<ApiResponse<{
      totalDeliveries: number;
      successfulDeliveries: number;
      failedDeliveries: number;
      pendingDeliveries: number;
      averageResponseTime: number;
      successRate: number;
      eventBreakdown: Array<{
        event: string;
        count: number;
        successRate: number;
      }>;
    }>> {
      const response = await http.get<ApiResponse<{
        totalDeliveries: number;
        successfulDeliveries: number;
        failedDeliveries: number;
        pendingDeliveries: number;
        averageResponseTime: number;
        successRate: number;
        eventBreakdown: Array<{
          event: string;
          count: number;
          successRate: number;
        }>;
      }>>('/webhooks/statistics', {
        params: options
      });
      return response.data;
    },

    /**
     * Bulk retry failed deliveries
     */
    async bulkRetryFailedDeliveries(options: {
      endpointId?: string;
      event?: string;
      startDate?: string;
      endDate?: string;
    } = {}): Promise<ApiResponse<{
      retriedCount: number;
      failedCount: number;
    }>> {
      const response = await http.post<ApiResponse<{
        retriedCount: number;
        failedCount: number;
      }>>('/webhooks/bulk-retry', options);
      return response.data;
    }
  };
}

// Export webhook event types for type safety
export const WEBHOOK_EVENTS = {
  // Customer events
  CUSTOMER_CREATED: 'customer.created',
  CUSTOMER_UPDATED: 'customer.updated',
  CUSTOMER_SUSPENDED: 'customer.suspended',
  CUSTOMER_REACTIVATED: 'customer.reactivated',
  
  // Wallet events
  WALLET_CREATED: 'wallet.created',
  WALLET_CREDITED: 'wallet.credited',
  WALLET_DEBITED: 'wallet.debited',
  WALLET_FROZEN: 'wallet.frozen',
  WALLET_UNFROZEN: 'wallet.unfrozen',
  
  // Transfer events
  TRANSFER_INITIATED: 'transfer.initiated',
  TRANSFER_SUCCESSFUL: 'transfer.successful',
  TRANSFER_FAILED: 'transfer.failed',
  TRANSFER_CANCELLED: 'transfer.cancelled',
  
  // Card events
  CARD_CREATED: 'card.created',
  CARD_ACTIVATED: 'card.activated',
  CARD_BLOCKED: 'card.blocked',
  CARD_TRANSACTION: 'card.transaction',
  
  // Virtual Account events
  VIRTUAL_ACCOUNT_CREATED: 'virtual_account.created',
  VIRTUAL_ACCOUNT_CREDITED: 'virtual_account.credited',
  
  // Bill Payment events
  BILL_PAYMENT_SUCCESSFUL: 'bill_payment.successful',
  BILL_PAYMENT_FAILED: 'bill_payment.failed',
  
  // System events
  SYSTEM_MAINTENANCE: 'system.maintenance',
  SYSTEM_ALERT: 'system.alert'
} as const;

export type WebhookEventType = typeof WEBHOOK_EVENTS[keyof typeof WEBHOOK_EVENTS];