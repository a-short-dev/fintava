import { createPublicHttpClient } from "../utils/http";
import { PaymentOptions, PaymentResponse } from "../types";

// Client-specific types
interface FintavaCheckoutConfig {
    publicKey: string;
    baseUrl?: string;
    theme?: {
        primaryColor?: string;
        backgroundColor?: string;
        textColor?: string;
        borderRadius?: string;
    };
    modal?: {
        showCloseButton?: boolean;
        closeOnOverlayClick?: boolean;
    };
}

interface CheckoutInstance {
    open: (options: PaymentOptions) => void;
    close: () => void;
    destroy: () => void;
}

class FintavaCheckout {
    private config: FintavaCheckoutConfig;
    private http: any;
    private modal: HTMLElement | null = null;
    private iframe: HTMLIFrameElement | null = null;

    constructor(config: FintavaCheckoutConfig) {
        this.config = config;
        this.http = createPublicHttpClient(
            config.baseUrl || "https://checkout.fintava.com",
            config.publicKey,
        );
        this.setupMessageListener();
    }

    private setupMessageListener(): void {
        window.addEventListener("message", (event) => {
            if (event.origin !== this.getBaseUrl()) return;

            const { type, data } = event.data;

            switch (type) {
                case "FINTAVA_PAYMENT_SUCCESS":
                    this.handlePaymentSuccess(data);
                    break;
                case "FINTAVA_PAYMENT_ERROR":
                    this.handlePaymentError(data);
                    break;
                case "FINTAVA_PAYMENT_CLOSE":
                    this.close();
                    break;
                case "FINTAVA_RESIZE":
                    this.resizeIframe(data.height);
                    break;
            }
        });
    }

    private getBaseUrl(): string {
        return this.config.baseUrl || "https://checkout.fintava.com";
    }

    private createModal(): HTMLElement {
        const modal = document.createElement("div");
        modal.id = "fintava-checkout-modal";
        modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 999999;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;

        const container = document.createElement("div");
        container.style.cssText = `
      background: white;
      border-radius: ${this.config.theme?.borderRadius || "8px"};
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      max-width: 500px;
      width: 90%;
      max-height: 90%;
      position: relative;
      overflow: hidden;
    `;

        if (this.config.modal?.showCloseButton !== false) {
            const closeButton = document.createElement("button");
            closeButton.innerHTML = "×";
            closeButton.style.cssText = `
        position: absolute;
        top: 10px;
        right: 15px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        z-index: 1;
        color: #666;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      `;
            closeButton.onclick = () => this.close();
            container.appendChild(closeButton);
        }

        modal.appendChild(container);

        if (this.config.modal?.closeOnOverlayClick !== false) {
            modal.onclick = (e) => {
                if (e.target === modal) this.close();
            };
        }

        return modal;
    }

    private createIframe(checkoutUrl: string): HTMLIFrameElement {
        const iframe = document.createElement("iframe");
        iframe.src = checkoutUrl;
        iframe.style.cssText = `
      width: 100%;
      height: 600px;
      border: none;
      display: block;
    `;
        iframe.allow = "payment";
        return iframe;
    }

    private resizeIframe(height: number): void {
        if (this.iframe) {
            this.iframe.style.height = `${height}px`;
        }
    }

    private handlePaymentSuccess(data: PaymentResponse): void {
        if (this.currentOptions?.onSuccess) {
            this.currentOptions.onSuccess(data);
        }
        this.close();
    }

    private handlePaymentError(error: any): void {
        if (this.currentOptions?.onError) {
            this.currentOptions.onError(error);
        }
    }

    private currentOptions: PaymentOptions | null = null;

    async open(options: PaymentOptions): Promise<void> {
        try {
            this.currentOptions = options;

            // Initialize payment session
            const response = await this.http.post("/checkout/initialize", {
                amount: options.amount,
                currency: options.currency,
                reference: options.reference,
                customer: {
                    email: options.customerEmail,
                    name: options.customerName,
                    phone: options.customerPhone,
                },
                description: options.description,
                metadata: options.metadata,
                callback_url: options.callbackUrl,
                cancel_url: options.cancelUrl,
            });

            const { checkoutUrl } = response.data.data;

            // Create and show modal
            this.modal = this.createModal();
            this.iframe = this.createIframe(checkoutUrl);

            const container = this.modal.querySelector("div");
            if (container) {
                container.appendChild(this.iframe);
            }

            document.body.appendChild(this.modal);

            // Animate in
            setTimeout(() => {
                if (this.modal) {
                    this.modal.style.opacity = "1";
                }
            }, 10);
        } catch (error) {
            if (options.onError) {
                options.onError(error);
            }
        }
    }

    close(): void {
        if (this.modal) {
            this.modal.style.opacity = "0";
            setTimeout(() => {
                if (this.modal && this.modal.parentNode) {
                    this.modal.parentNode.removeChild(this.modal);
                }
                this.modal = null;
                this.iframe = null;

                if (this.currentOptions?.onClose) {
                    this.currentOptions.onClose();
                }
                this.currentOptions = null;
            }, 300);
        }
    }

    destroy(): void {
        this.close();
        window.removeEventListener("message", this.setupMessageListener);
    }
}

// Global instance management
let globalCheckoutInstance: FintavaCheckout | null = null;

/**
 * Initialize Fintava Checkout
 */
export function init(config: FintavaCheckoutConfig): CheckoutInstance {
    if (globalCheckoutInstance) {
        globalCheckoutInstance.destroy();
    }

    globalCheckoutInstance = new FintavaCheckout(config);

    return {
        open: (options: PaymentOptions) =>
            globalCheckoutInstance!.open(options),
        close: () => globalCheckoutInstance!.close(),
        destroy: () => {
            if (globalCheckoutInstance) {
                globalCheckoutInstance.destroy();
                globalCheckoutInstance = null;
            }
        },
    };
}

/**
 * Legacy function for backward compatibility
 */
export function renderPaymentWidget(
    options: PaymentOptions & { publicKey: string },
): void {
    const { publicKey, ...paymentOptions } = options;

    if (!globalCheckoutInstance) {
        globalCheckoutInstance = new FintavaCheckout({ publicKey });
    }

    globalCheckoutInstance.open(paymentOptions);
}

/**
 * Verify payment on client side
 */
export async function verifyPayment(
    reference: string,
    publicKey: string,
): Promise<PaymentResponse> {
    const http = createPublicHttpClient(publicKey);
    const response = await http.get(`/payments/verify/${reference}`);
    return response.data;
}

/**
 * Get payment status
 */
export async function getPaymentStatus(
    reference: string,
    publicKey: string,
): Promise<{
    status: "pending" | "successful" | "failed" | "cancelled";
    amount: number;
    currency: string;
    reference: string;
    paidAt?: string;
    failureReason?: string;
}> {
    const http = createPublicHttpClient(publicKey);
    const response = await http.get(`/payments/status/${reference}`);
    return response.data.data;
}

// Export types for TypeScript users
export type {
    FintavaCheckoutConfig,
    CheckoutInstance,
    PaymentOptions,
    PaymentResponse,
};
