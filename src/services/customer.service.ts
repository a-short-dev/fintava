import ApiClient from "@/core/apiClient";
import {
    CustomerResponse,
    Customer,
    customerSchema,
    QueryParams,
    querySchema,
} from "./types";

export class CustomersService {
    private readonly client: ApiClient;

    constructor(client: ApiClient) {
        this.client = client;
    }

    public async create(param: Customer) {
        // Validate the query parameters using Zod schema
        const validation = customerSchema.safeParse(param);

        if (!validation.success) {
            throw new Error(`Validation failed: ${validation.error.message}`);
        }
        return await this.client.post<CustomerResponse>("create/customer", {
            firstName: param.first_name,
            lastName: param.last_name,
            phoneNumber: param.phone_number,
            email: param.email,
            fundingMethod: param.funding_method,
            address: param.address,
            dateOfBirth: param.date_of_birth,
            bvn: param.bvn,
            nin: param.bvn,
        });
    }

    public async getCustomers(query: Partial<QueryParams> = {}) {
        const validation = querySchema.safeParse(query);

        if (!validation.success) {
            throw new Error(`Validation failed: ${validation.error.message}`);
        }
        const defaultPage = 1;
        const defaultTake = 10;

        // Build the query string based on the available parameters
        const queryParams = new URLSearchParams({
            page: query.page?.toString() || defaultPage.toString(),
            take: query.take?.toString() || defaultTake.toString(),
        });

        if (query.order) {
            queryParams.append("order", query.order);
        }
        if (query.searchTerm) {
            queryParams.append("searchTerm", query.searchTerm);
        }
        if (query.startDate) {
            queryParams.append("startDate", query.startDate);
        }
        if (query.endDate) {
            queryParams.append("endDate", query.endDate);
        }

        return await this.client.get<CustomerResponse[]>(
            `/customers/list?${queryParams.toString()}`,
        );
    }

    public async fetchCustomerById(customer_id: string) {
        return await this.client.get<CustomerResponse>(
            `/customers/${customer_id}`,
        );
    }

    public async fetchCustomerByPhone(phone_number: string) {
        return await this.client.get<CustomerResponse>(
            `/customers/${phone_number}`,
        );
    }

    public async freezeCustomerWallet(wallet_id: string) {
        return await this.client.patch(`/customer/wallet/${wallet_id}/freeze`);
    }

    /**
     * Freeze specific customer wallet.
     *
     * This function allows you to retrieve a paginated list of transactions for a given customer.
     * You must provide the `customer_id` as part of the query parameters, along with other optional parameters for pagination and sorting.
     *
     * @param {Partial<QueryParams>} query - An object that specifies:
     *   - `customer_id` (string): The unique identifier of the customer whose transactions are being fetched.
     *   - `page` (number): Page number for pagination (default is 1).
     *   - `take` (number): Number of transactions to retrieve per page (default is 50).
     *   - `order` ("ASC" | "DESC"): Order of transactions based on date (default is DESC).
     * @returns {Promise<any>} - Returns a promise that resolves with the transaction data for the specified customer.
     *
     * ### Example:
     * ```ts
     * const transactions = await customerService.fetchCustomerTransactions({
     *   customer_id: "customer123",
     *   page: 2,
     *   take: 30,
     *   order: "ASC"
     * });
     * ```
     */

    public async unfreezeCustomerWallet(wallet_id: string): Promise<any> {
        return await this.client.patch(
            `/customer/wallet/${wallet_id}/unfreeze`,
        );
    }

    /**
     * Fetches the transaction history of a specific customer.
     *
     * This function allows you to retrieve a paginated list of transactions for a given customer.
     * You must provide the `customer_id` as part of the query parameters, along with other optional parameters for pagination and sorting.
     *
     * @param {Partial<QueryParams>} query - An object that specifies:
     *   - `customer_id` (string): The unique identifier of the customer whose transactions are being fetched.
     *   - `page` (number): Page number for pagination (default is 1).
     *   - `take` (number): Number of transactions to retrieve per page (default is 50).
     *   - `order` ("ASC" | "DESC"): Order of transactions based on date (default is DESC).
     * @returns {Promise<any>} - Returns a promise that resolves with the transaction data for the specified customer.
     *
     * ### Example:
     * ```ts
     * const transactions = await customerService.fetchCustomerTransactions({
     *   customer_id: "customer123",
     *   page: 2,
     *   take: 30,
     *   order: "ASC"
     * });
     * ```
     */

    public async fetchCustomerTransactions(
        query: Partial<QueryParams> = {},
    ): Promise<any> {
        const defaultPage = 1;
        const defaultTake = 50;

        if (!query.customer_id) {
            throw new Error("query.customer_id required");
        }

        const queryParams = new URLSearchParams({
            page: query.page?.toString() || defaultPage.toString(),
            take: query.take?.toString() || defaultTake.toString(),
        });

        if (query.order) {
            queryParams.append("order", query.order);
        }

        return await this.client.patch(
            `/txn?customerId=${query.customer_id}&${queryParams.toString()}`,
        );
    }
}
