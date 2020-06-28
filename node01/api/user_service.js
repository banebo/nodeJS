const conn = require("../config/db");
const { hashSync, compareSync } = require("bcrypt");
const { promisify } = require("util");

const query = promisify(conn.query).bind(conn);

exports.getAll = callback => {
    query(
        "SELECT * FROM tmp_user"
    )
    .then(res => {
        callback(null, res);
    })
    .catch(err => {
        console.log(err);
        callback(err, null);
    })
}

exports.signUp = (user, callback) => {
    const password = hashSync(user.password, 10);
    const username = user.username;
    query(
        "INSERT INTO tmp_user (username, password) VALUES (?, ?)",
        [username, password]
    )
    .then(res => {
        callback(null, res);
    })
    .catch(err => {
        console.log(err);
        callback(err, null);
    })
}

exports.getUserByUsername = (username, callback) => {
    query(
        "SELECT * FROM tmp_user WHERE username = ?",
        username
    )
    .then(res => {
        callback(null, res[0]);
    })
    .catch(err => {
        console.log(err);
        callback(err, null);
    })
}


