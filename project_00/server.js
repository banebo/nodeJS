const util = require('util')
const express = require('express')
const jwt = require('jsonwebtoken')
const {conn, query} = require('./database')
const is_empty = require('is-empty')
const validator = require('validator')
const bcrypt = require('bcrypt')
const parser = require('body-parser')

const port = 8000
const app = express()

app.use(parser.urlencoded({extended: true}))

conn.connect(err => {
    if (err)
        throw err
    util.log("Connected to DB")
})

app.get('/', (req, res) => {
    res.send("Hello there")
})

app.get('/users', (req, res) => {
    const q = "SELECT * FROM User"
    query(conn, q)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

app.get('/users/:id', (req, res) => {
    const idUser = req.params.id
    const q = "SELECT * FROM User u WHERE u.idUser = ?"
    query(conn, q, idUser)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(500).json({error: "Error quering the db"})
    })
})

app.post('/signup', (req, res) => {
    const username = !is_empty(req.body.username) ? req.body.username : ""
    const password = !is_empty(req.body.password) ? req.body.password : ""
    const email = !is_empty(req.body.email) ? req.body.email : ""

    var errors = []

    if (validator.isEmpty(username))
        errors.push("Invalid username")
    if (validator.isEmpty(password))
        errors.push("Invalid password")
    if (!validator.isEmpty(email) && !validator.isEmail(email))
        errors.push("Invalid email")

    const username_q = 'SELECT * FROM User u WHERE u.username = ?'
    const insert_user_q = "INSERT INTO User(username, password, email) VALUES (?, ?, ?)"
    if (errors.length == 0){
        query(conn, username_q, username)
        .then(data => {
            if (data.length > 0){
                errors.push("Username exists")
                throw Error("Didn't add user: username exists")
            }
        })
        .then(() => {
            bcrypt.hash(password, 12, (err, hashed) => {
                if (err)
                    throw err
                query(conn, insert_user_q, [username, hashed, email])
                .then(data => {
                    res.status(200).json({message: `User added ${username}`})
                })
            })
        })
        .catch(err => {
            res.status(500).json(errors)
        })
    }
    else
        res.status(500).json(errors)

})

app.listen(port, () => {
    util.log(`Server started on port ${port}`)
})
