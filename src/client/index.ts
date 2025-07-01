type PaymentOptions = {
  publicKey: string;
  amount: number;
  currency: string;
  metadata?: Record<string, any>;
  onSuccess?: (data: any) => void;
  onClose?: () => void;
};

export function renderPaymentWidget(options: PaymentOptions) {
  console.log('Launching payment with options:', options);
  // Future: load iframe or widget script
}
