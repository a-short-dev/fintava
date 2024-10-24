import Fintava from "fintava";
const express = require("express");
import { Express } from "express";

const app: Express = express();
const fintava = new Fintava("", "test");

app.get("/", async (req, res) => {
    const cus = await fintava.accountServices().getAccount()
});

app.listen(3005, () => {
    console.log("running");
});
