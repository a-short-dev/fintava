import Fintava from "./src/index";
import { Customer } from "./dist/services/types";

const sdk = new Fintava(process.env.FINATVA_API_KEY!, "test");
const user: Customer = {
    first_name: "Victor",
    last_name: "Doe",
    phone_number: "09165913234",
    email: "example.devs@gmail.com",
    funding_method: "STATIC_FUND",
    address: "No 1, Testing streets",
    date_of_birth: "1993-10-21",
    bvn: "111111111111",
    nin: "111111111222",
};
const customer = await sdk.customerServices().create(user);

console.log(customer);
