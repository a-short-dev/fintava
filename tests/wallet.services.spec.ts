import Fintava from "../dist/index";
import dotenv from "dotenv";
import { GenerateVirtualWalletSchema } from "../dist/services/schema";
dotenv.config();

const fintava = new Fintava(process.env.FINTAVA_API_KEY!, "test");
describe("Virtual Wallet Service", () => {
    const wallet = fintava.virtualWalletService();

    it("Generate a virtual wallet", async () => {
        const data: GenerateVirtualWalletSchema = {
            amount: 100,
            customer_name: "Oluwaleke Abiodun",
            email: "lakessyde@gmail.com",
            expire_time_in_min: 15,
            merchant_reference: "a0339956-92fe-4cdb-b722-9b7b5754821f",
            phone: "09165913234",
            description: "test transaction",
        };
        const newWallet = await wallet.generateWallet(data);
        expect(newWallet).toHaveProperty("statusCode", 400);
    });
});

describe("Wallet Service", () => {
    const wallet = fintava.walletService();

    it("Get wallet details", async () => {
        const newWallet = await wallet.getWalletDetails("00");
        expect(newWallet).toHaveProperty("statusCode", 400);
    });
});
