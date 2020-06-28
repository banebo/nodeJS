require("dotenv").config();
const express = require("express");
const app = express()
const userRouter = require("./api/user_router");

app.use(express.json());

app.use("/api/users", userRouter);

const port = process.env.SERVER_PORT || 3000;

app.listen(port, () => {
    console.log(`[+] Server started on port: ${ port }`);
})
