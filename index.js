"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./src/index");
var sdk = new index_1.default(process.env.FINATVA_API_KEY, "test");
var customer = await sdk.customerServices().create({
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
console.log(customer);
