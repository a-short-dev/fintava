import ApiClient from "@/core/apiClient";
import {
    generateVirtualWalletSchema,
    GenerateVirtualWalletSchema,
} from "./types";

export class WalletService {
    private readonly client: ApiClient;

    constructor(client: ApiClient) {
        this.client = client;
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

    public async generateVirtualWallet(params: GenerateVirtualWalletSchema) {
        const validate = generateVirtualWalletSchema.safeParse(params);

        if (!validate.success) {
            throw new Error(`Validation failed: ${validate.error.message}`);
        }
        return await this.client.post("/virtual-wallet/generate", {
            customerName: params.customer_name,
            expireTimeInMin: params.expire_time_in_min,
            merchantReferenc: params.merchant_reference,
            description: params.description,
            amount: params.amount,
            phone: params.phone,
            email: params.email,
        });
    }
}
