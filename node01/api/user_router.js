const router = require("express").Router();
const { findAll, createUser, loginUser } = require("./user_controller");
const checkToken = require("./auth");

router.get("/", checkToken, findAll);
router.post("/", createUser);
router.post("/login", loginUser);

module.exports = router;