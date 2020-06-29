const { createConnection } = require('mysql');
const express = require('express');
const app = express();
const util = require('util');

const conn = createConnection({
    database: 'localMysqlDB',
    user: 'banebo',
    password: '7298',
    host: 'localhost',
    port: 3306
});


// =============================================================
// async/await
// const promise = util.promisify(conn.query).bind(conn);
// async function query () {
//     const d = await promise('select * from tmp_user');
//     console.log(d);
// }
// console.log('1');
// query();
// console.log('2');


// =============================================================
// WITH PROMISES
// const promise = util.promisify(conn.query).bind(conn);
// const promise = (q, args) => {
//     return new Promise((resolve, reject) => {
//         conn.query(q, args,(err, res) => {
//             if (err){
//                 console.log("ERRO IN DB");
//                 return reject(err);
//             }
//             resolve(res);
//         });
//     });
// }
// promise('select * from tmp_user', [])
// .then(data => {
//     console.log(data);
// })
// .catch(err => {
//     console.log(err);
// })

// =============================================================
// WITH CALLBACK
// const query = (q, callback) => {
//     conn.query(q, (err, res) => {
//         if(err){
//             console.log('ERROR');
//             return callback(err, null);
//         }
//         return callback(null, res);
//     });
// }

// console.log("START");

// query(
//     'select * from tmp_user',
//     (err, res) => {
//         if(err)
//             console.log(err);
//         else
//             console.log(res);
//     }
// )

// console.log("FINISH");
