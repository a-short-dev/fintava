import ApiClient from "@/core/apiClient";

import {
    generateVirtualWalletSchema,
    GenerateVirtualWalletSchema,
    WalletToWalletSchema,
} from "./schema";

import BaseService from "./base.service";

export class WalletService extends BaseService {
    constructor(client: ApiClient) {
        super(client);
    }

    /**
     * Get the details of any wallet on fintava.
     *
     * @param {string} account_number - this users account number
     *
     * @returns {Promise<any>} - Returns a promise that resolves with the wallet details
     */

    public async getWalletDetails(account_number: string): Promise<any> {
        return await this.client.get(
            `/loma-name/enquiry?accountNumber=${account_number}`,
        );
    }

    /**
     * Transfer from one fintava wallet to another fintava wallet
     *
     * @param {WalletToWalletSchema} params - an object that specifies
     *   - `sender_account (string): This is the senders account number
     *   - `receiver` (string): This is the receiver account number
     *   - `amount` (number): Amount you want to send
     *   - `customer_reference` (string)
     *
     * @returns {Promise<any>} - Returns a promise that resolves with the wallet details
     */

    public async walletTransfer(
        params: Readonly<WalletToWalletSchema>,
    ): Promise<any> {
        return await this.client.post(`/transaction/wallet-to-wallet`);
    }
}

export class VirtualWalletService extends BaseService {
    constructor(client: ApiClient) {
        super(client);
    }

    /**
     *
     * @param {GenerateVirtualWalletSchema} params - An object that specifies
     * -	`customer_name` (string): The customers fullname of the customer (John Doe).
     * -	`expire_time_in_min` (number): The How long will the virtual wallet stay active. The duration can only be in minutes.
     * -	`merchant_reference` (string): This is the reference attached to the transaction.
     * -	`description` (string): The transaction description could be the purpose of the transaction. An example is airtime purchase.
     * -	`amount` (float): This is the amount to be paid into the virtual wallet generated. Format example, 1000.00
     * - 	`phone` (string): The customer's phone number
     * -	`email` (string): The customer's email
     * @returns
     */

    public async generateWallet(params: GenerateVirtualWalletSchema) {
        const validate = generateVirtualWalletSchema.safeParse(params);

        if (!validate.success) {
            throw new Error(`Validation failed: ${validate.error.message}`);
        }
        return await this.client.post("/virtual-wallet/generate", {
            customerName: params.customer_name,
            expireTimeInMin: params.expire_time_in_min,
            merchantReference: params.merchant_reference,
            description: params.description,
            amount: params.amount,
            phone: params.phone,
            email: params.email,
        });
    }

    public async bactchCreate(params: GenerateVirtualWalletSchema[]) {
        return await this.client.post(`virtual-wallet/generate/batch`);
    }

    /**
     * Get the details of a virtual wallet you've generated. Details include, payment status, and wallet's status (active/disabled).
     *
     * @param {string} wallet_id
     *
     * @returns {Promise<any>} - Returns a promise that resolves with the wallet details
     */

    public async getWalletDetails(wallet_id: string): Promise<any> {
        return await this.client.get(`/virtual-wallet/${wallet_id}`);
    }
}
