import ApiClient from "@/core/apiClient";
import { QueryParams, querySchema } from "./schema";
import BaseService from "./base.service";

export class TransactionService extends BaseService {
    constructor(client: ApiClient) {
        super(client);
    }

    /**
		 * Fetches the the virtual card transaction history of a specific customer.
		 * 
		 This function allows you to retrieve a paginated list of transactions for a given customer.
     * You must provide the `customer_id` as part of the query parameters, along with other optional parameters for pagination and sorting.
		 * @param {Partial<QueryParams>} query -An object that specifies
	   *   - `customer_id` (string): The unique identifier of the customer whose transactions are being fetched.
     *   - `page` (number): Page number for pagination (default is 1).
     *   - `take` (number): Number of transactions to retrieve per page (default is 50).
     *   - `order` ("ASC" | "DESC"): Order of transactions based on date (default is DESC).
		 * @returns {Promise<any>}  - Returns a promise that resolves with the transaction data for the specified customer.
		 * 
		 * ### Example:
		 * ```ts
		 * const transactions = await transactionService.fetchVirtualCardTxns({
		 * 		customer_id: "customer123",
		 * 		page: 2,
		 * 		take: 30,
		 * 		order: "ASC"
		 * });
		 * ```
		 */

    public async fetchVirtualCardTxns(
        query: Partial<QueryParams> = {},
    ): Promise<any> {
        const validatation = querySchema.safeParse(query);

        if (!validatation.success) {
            throw new Error("Validation error");
        }
        return await this.client.get(
            `/transaction/card?customerId=${query.customer_id}`,
        );
    }

    /**
     * Find Transaction By Id
     * Use this function to search for a transaction using the transaction id
     *
     * @param {string} transaction_id
     *
     * @returns {Promise<any>} - Returns a promise that resolves with the transaction data
     */
    public async fetchTransactionById(transaction_id: string): Promise<any> {
        return await this.client.get(`/transaction/id/${transaction_id}`);
    }

    /**
     * Find Transaction using transaction reference
     * Use this function to search for a transaction using the transaction id
     *
     * @param {string} transaction_ref
     *
     * @returns {Promise<any>} - Returns a promise that resolves with the transaction data
     */
    public async fetchTransactionByRef(transaction_ref: string): Promise<any> {
        return await this.client.get(
            `/transaction/reference/${transaction_ref}`,
        );
    }
}
