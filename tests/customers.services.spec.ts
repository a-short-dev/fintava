import Fintava from "../dist/index";
import dotenv from "dotenv";
dotenv.config();

const fintava = new Fintava(process.env.FINTAVA_API_KEY!, "test");

describe("Customer Service", () => {
    it("Create new customer", async () => {
        const createCustomer = await fintava.customerServices().create({
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
        expect(createCustomer).toHaveProperty("error", "Not Found");
        //expect(createCustomer).toHaveProperty("userInfo");
    });

    it("Get all customers", async () => {
        const customers = await fintava.customerServices().getCustomers();
		    expect(customers).toHaveProperty("status", 200);
    });

		 it("Get all customers", async () => {
        const customers = await fintava.customerServices().getCustomers();
		    expect(customers).toHaveProperty("status", 200);
    });
});
