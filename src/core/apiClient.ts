import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { ErrorResponse } from "./types/error";
import { handleAxiosError } from "./utils/util";

export default class ApiClient {
    private readonly apiKey: string;
    private readonly client: AxiosInstance;

    constructor(
        apiKey: string,
        private readonly env: "prod" | "test",
        private readonly options: AxiosRequestConfig = {},
    ) {
        this.apiKey = apiKey;
        const baseUrl =
            this.env === "prod"
                ? "https://live.fintavapay.com/api/dev"
                : "https://dev.fintavapay.com/api/dev";

        const defaultConfig: AxiosRequestConfig = {
            baseURL: baseUrl,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.apiKey}`,
            },
        };

        const config = {
            ...defaultConfig,
            ...this.options,
            headers: {
                ...defaultConfig.headers,
                ...(this.options.headers || {}),
            },
        };

        this.client = axios.create(config);
    }

    // Generic GET method
    public async get<T>(endpoint: string, param = {}): Promise<T> {
        try {
            const { data } = await this.client.get(endpoint, param);
            return data;
        } catch (error) {
            if (error instanceof AxiosError) throw handleAxiosError(error);
            throw error;
        }
    }

    // Generic POST method
    public async post<T>(endpoint: string, param = {}): Promise<T> {
        try {
            const { data } = await this.client.post(endpoint, param);
            return data;
        } catch (error) {
            if (error instanceof AxiosError) throw handleAxiosError(error);
            throw error;
        }
    }

    // Generic PATCH method
    public async patch<T>(endpoint: string, param = {}): Promise<T> {
        try {
            const { data } = await this.client.patch(endpoint, param);
            return data;
        } catch (error) {
            if (error instanceof AxiosError) throw handleAxiosError(error);
            throw error;
        }
    }

    // Generic PUT method
    public async put<T>(endpoint: string, param = {}): Promise<T> {
        try {
            const { data } = await this.client.put(endpoint, param);
            return data;
        } catch (error) {
            if (error instanceof AxiosError) throw handleAxiosError(error);
            throw error;
        }
    }

    // Generic DELETE method
    public async _delete<T>(endpoint: string, param = {}): Promise<T> {
        try {
            const { data } = await this.client.delete(endpoint, param);
            return data;
        } catch (error) {
            if (error instanceof AxiosError) throw handleAxiosError(error);
            throw error;
        }
    }
}
