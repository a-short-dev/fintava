import Fintava from "../dist/index";
import dotenv from "dotenv";

dotenv.config();

const fintava = new Fintava(process.env.FINTAVA_API_KEY!, "test");

describe("Bank Service", () => {
    const bank = fintava.bankService();
    it("should return bank list", async () => {
        const bankList = await bank.listBanks();
        expect(bankList).toHaveProperty("status", 200);
    });

    it("should return bank details", async () => {
        const details = await bank.enquiry("120001", "6075900780");
        expect(details).toHaveProperty("status", 200);
    });
});
