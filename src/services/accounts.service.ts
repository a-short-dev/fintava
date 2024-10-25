import ApiClient from "@/core/apiClient";

export class AccountService {
    private readonly client: ApiClient;

    constructor(client: ApiClient) {
        this.client = client;
    }

    public async getAccount() {
        return await this.client.get("/");
    }
}
