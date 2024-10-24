import ApiClient from "@/core/apiClient";

export class AccountService {
    private client: ApiClient;

    constructor(client: ApiClient) {
        this.client = client;
    }

    public async getAccount() {}
}
