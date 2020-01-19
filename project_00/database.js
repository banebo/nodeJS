const mysql = require('mysql')

const conn = mysql.createConnection({
    host: "localhost",
    user: "banebo",
    password: "7298",
    database: "node_db"
})

const query = (conn, q, args) => {
    return new Promise((resolve, reject) => {
        conn.query(q, args, (err, data) => {
            if (err)
                return reject(err)
            resolve(data)
        })
    })
}

module.exports = {
    conn,
    query
}