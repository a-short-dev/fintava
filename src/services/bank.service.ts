import ApiClient from "@/core/apiClient";
import BaseService from "./base.service";

export class BankService extends BaseService {
    constructor(client: ApiClient) {
        super(client);
    }

    async listBanks() {
        return await this.client.get("/banks");
    }

    /**
     * Check or get details about a bank account
     * @param bank_code 
     * @param account_name 
     */

    async enquiry(bank_code: string, account_name: string) {}
}
