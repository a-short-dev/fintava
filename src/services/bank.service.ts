import ApiClient from "@/core/apiClient";
import BaseService from "./base.service";
import { BanksResponseSchema, QueryParams, querySchema } from "./schema";
import { ErrorResponse } from "@/core/types/error";

export class BankService extends BaseService {
    constructor(client: ApiClient) {
        super(client);
    }

    /**
     * Fetches the list of nigerian banks.
     *
     * This function allows you to retrieve a paginated list of banks in nigeria.
     * @param {Partial<QueryParams>} query -An object that specifies
     *   - `page` (number): Page number for pagination (default is 1).
     *   - `take` (number): Number of transactions to retrieve per page (default is 50).
     *   - `order` ("ASC" | "DESC"): Order of transactions based on date (default is DESC).
     * @returns {Promise<BanksResponseSchema|ErrorResponse>}  - Returns a promise that resolves with the bank list.
     *
     * ### Example:
     * ```ts
     * const banklist = await bankService.list({
     * 		page: 2,
     * 		take: 50,
     * 		order: "ASC"
     * });
     * ```
     **/

    async listBanks(
        query: Partial<QueryParams> = {},
    ): Promise<BanksResponseSchema> {
        const validatation = querySchema.safeParse(query);

        if (!validatation.success) {
            throw new Error("error validating bank list query");
        }

        const defaultPage = 1;
        const defaultTake = 50;

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
        const bank = await this.client.get<BanksResponseSchema>(
            `/banks?${queryParams.toString()}`,
        );
        return bank;
    }

    /**
     * Check or get details about a bank account details
     * @param {string} sort_code - This is the bank code.
     * @param {string} account_number - The bank account number.
     *
     * @returns {Promise<any>} will return with a Promise of a reponse or the bank details.
     */

    async enquiry(sort_code: string, account_number: string): Promise<any> {
        const details = await this.client.get(
            `/name/enquiry?accountNumber=${account_number}&sortCode=${sort_code}`,
        );

        console.log(details);
        return details;
    }
}
