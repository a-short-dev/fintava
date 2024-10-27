import ApiClient from "@/core/apiClient";

export default class BaseService {
    protected readonly client: ApiClient;

    constructor(apiClient: ApiClient) {
        this.client = apiClient;
    }
}
