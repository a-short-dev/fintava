import { AxiosRequestConfig } from "axios";
import ApiClient from "./core/apiClient";
import { Accounts, Customers, Transactions } from "./services";

export type Options = {};

export default class Finatava {
    private readonly accounts: Accounts;
    private readonly customers: Customers;
    private readonly transactions: Transactions;

    constructor(
        private readonly apiKey: string,
        private readonly env: "prod" | "test",
        private readonly options: AxiosRequestConfig = {},
    ) {
        try {
            const client = new ApiClient(
                process.env.FINTAVA_API_KEY || this.apiKey,
                this.env,
                this.options,
            );
            this.accounts = new Accounts(client);
            this.customers = new Customers(client);
            this.transactions = new Transactions(client);
        } catch (error) {
            console.error("Error initializing API client:", error);
            throw new Error("Failed to initialize Finatava API client");
        }
    }

    public accountServices() {
        return this.accounts;
    }

    public customerServices() {
        return this.customers;
    }

    public transactionsServices() {
        return this.transactions;
    }
}
