import { AxiosError } from "axios";

export default class HandleError {
    statusCode: number;
    message: string[] | string;
    error: string;
    constructor(error: AxiosError) {
        const { response } = error;

        if (response) {
            this.statusCode = response.status;
            this.message = this.getErrorMessage(response.data);
            this.error = response.statusText || "Error";
        } else {
            // If no response, it's a network or client-side error
            this.statusCode = 500; // Default status code for server/network issues
            this.message = "Internal Server Error";
            this.error = "Network or client-side error";
        }
    }

    private getErrorMessage(data: any): string[] | string {
        if (Array.isArray(data.message)) {
            return data.message;
        }
        return data.message || "Unknown error";
    }
}
