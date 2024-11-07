import { z } from "zod";

// Define Zod schemas for validation
export const customerSchema = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    phone_number: z.string(),
    email: z.string().email("Invalid email address"),
    funding_method: z.enum(["STATIC_FUND", "DYNAMIC_FUND"]),
    address: z.string().min(1, "Address is required"),
    date_of_birth: z
        .string()
        .refine((date) => /^\d{4}-\d{2}-\d{2}$/.test(date), {
            message: "Invalid date format. Use YYYY-MM-DD",
        }),
    bvn: z
        .string()
        .min(11, "BVN must be exactly 11 characters")
        .max(11, "BVN must be exactly 11 characters"),
    nin: z
        .string()
        .min(11, "NIN must be  exactly 11 characters")
        .max(11, "NIN must be  exactly 11 characters"),
});

export type Customer = z.infer<typeof customerSchema>;

export const querySchema = z.object({
    order: z.enum(["ASC", "DESC"]).optional(),
    customer_id: z.string().optional(),
    searchTerm: z.string().optional(),
    startDate: z
        .string()
        .refine((date) => /^\d{4}-\d{2}-\d{2}$/.test(date), {
            message: "Invalid date format. Use YYYY-MM-DD",
        })
        .optional(),
    endDate: z
        .string()
        .refine((date) => /^\d{4}-\d{2}-\d{2}$/.test(date), {
            message: "Invalid date format. Use YYYY-MM-DD",
        })
        .optional(),
    limit: z.string().optional(),
    fromDate: z.string().optional(),
    toDate: z.string().optional(),
    page: z.number().optional().default(1),
    take: z.number().optional().default(10),
});

export type QueryParams = z.infer<typeof querySchema>;

const customerResponseSchema = z.object({
    data: z.object({
        userInfo: z.object({
            firstName: z.string(),
            lastName: z.string(),
            phoneNumber: z.string(),
            roles: z.array(z.string()), // Array of strings for roles
            userType: z.literal("CUSTOMER"), // Only accepts the string "CUSTOMER"
            address: z.string(),
            bvn: z.string(),
            dateOfBirth: z.string(), // Can be empty or follow a valid date format
            id: z.string(),
            createdAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
                message: "Invalid ISO date format for createdAt",
            }),
            updatedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
                message: "Invalid ISO date format for updatedAt",
            }),
        }),
        wallet: z.object({
            id: z.string(),
            accountNumber: z.string(),
            accountName: z.string(),
            isFrozen: z.boolean(),
            status: z.enum(["active", "inactive"]), // Only allows "active" or "inactive"
            fundMethod: z.string(),
        }),
    }),
    status: z.number(), // Validating as an HTTP status code
    message: z.string(),
});
export type CustomerResponse = z.infer<typeof customerResponseSchema>;

export const generateVirtualWalletSchema = z.object({
    customer_name: z.string().min(10),
    expire_time_in_min: z.number(),
    merchant_reference: z.string(),
    amount: z.number(),
    phone: z.string(),
    email: z.string().email(),
    description: z.string().optional(),
});

export type GenerateVirtualWalletSchema = z.infer<
    typeof generateVirtualWalletSchema
>;

export const walletToWalletSchema = z.object({
    sender_account: z.string(),
    receiver: z.string(),
    narration: z.string().optional(),
    amount: z.number(),
    customer_reference: z.string(),
});

export type WalletToWalletSchema = z.infer<typeof walletToWalletSchema>;

export const banksResponseSchema = z.object({
    data: z.object({
        id: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
        code: z.string(),
        name: z.string(),
    }),
    status: z.number(), // Validating as an HTTP status code
    message: z.string(),
});

export type BanksResponseSchema = z.infer<typeof banksResponseSchema>;

export const bankDetailResponseSchema = z.object({
    data: z.object({
        status: z.boolean(),
        account: z.object({
            bankCode: z.string(),
            accountName: z.string(),
            accountNumber: z.string(),
            responseCode: z.string(),
        }),
    }),
    status: z.number(), // Validating as an HTTP status code
    message: z.string(),
});
