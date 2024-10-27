import Fintava from "../dist/index";
import dotenv from "dotenv";

dotenv.config();

const fintava = new Fintava(process.env.FINTAVA_API_KEY!, "test");

describe("Customer Service", () => {
    const cus = fintava.customerServices();
    it("Create new customer", async () => {
        const createCustomer = await cus.create({
            first_name: "Victor",
            last_name: "Doe",
            email: "example.devs@gmail.com",
            phone_number: "09165913234",
            address: "No 1, Testing streets",
            bvn: "12345678910",
            nin: "22112901014",
            date_of_birth: "1993-10-21",
            funding_method: "STATIC_FUND",
        });

        // using this error message BVN Not found.
        expect(createCustomer).toHaveProperty("error", "Not Found");
    });

    it("Get all customers", async () => {
        const customers = await cus.getCustomers();
        expect(customers).toHaveProperty("status", 200);
    });

    it("Get customer by phone number", async () => {
        const customers = await cus.fetchCustomerByPhone("09165913234");
        expect(customers).toHaveProperty("statusCode", 400);
    });
});


