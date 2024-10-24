export type ErrorResponse = {
    statusCode: number;
    message: string[] | string; // Can be a string or an array of strings
    error: string;
};

export type UnauthorizedErrorResponse = {
    statusCode: 401;
    message: string; // Specific message like "Invalid API Key"
    error: "Unauthorized";
};
