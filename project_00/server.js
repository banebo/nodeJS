const util = require('util')
const express = require('express')
const jwt = require('jsonwebtoken')
const fs = require('fs')
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

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const find_user_q = "SELECT * FROM User u WHERE u.username = ?"

    query(conn, find_user_q, username)
    .then(data => {
        if (data.length == 0)
            throw Error("Invalid credentials")
        return data[0]
    })
    .then(user => {
        if(!bcrypt.compareSync(password, user.password))
            throw Error("Invalid credentials")
        const priv_key = fs.readFileSync('./priv_key', 'utf8')
        jwt.sign({
            username, 
            id: user.idUser
        }, 
        priv_key,
        {
            expiresIn: 60,
            algorithm: 'HS256'
        },
        (err, token) => {
            if (err)
                res.status(500).json(err)
            else
                res.status(200).json({
                    msg: "Login OK",
                    token
                })
        })
    })
    .catch(err => {
        res.status(500).json({
            msg: "Login failed",
            error: err
        })
    })
})

const isLogedIn = (req, res, next) => {
    if (typeof req.headers.authorization !== "undefined"){
        const token = req.headers.authorization.split(" ")[1]
        const priv_key = fs.readFileSync('./priv_key', 'utf8')
        jwt.verify(token, priv_key, {algorithm: 'HS256'}, (err, decoded) => {
            if (err)
                res.status(401).json({msg: "Authorization error"})
            else{
                req.user = decoded
                next()
            }
        })
    }
    else
        res.status(401).json({msg: "Authorization error"})
}

app.get('/documents', isLogedIn, (req, res) => {
    const documents_q = "SELECT * FROM Document d WHERE d.idOwner = ?"
    query(conn, documents_q, req.user.id)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(500).json({error: "Error while fetching documents"})
    })
})

const isAuthorized = (req, res, next) => {
    const q = 'SELECT role_name \
               FROM Role r, User_has_Role uhr \
               WHERE uhr.idUser = ? AND uhr.idRole = r.idRole'
    query(conn, q, req.user.id)
    .then(roles => {
        var authorized = false
        roles.forEach(i => {
            if (i.role_name == "WRITER")
                authorized = true
        });
        if (!authorized)
            res.status(401).json({error: "Not authorized"})
        else
            next()
    })
    .catch(err => {
        res.status(500).json({error: "Something went wrong"})
    })
}

app.post('/documents', isLogedIn, isAuthorized, (req, res) => {
    const title = !is_empty(req.body.title) ? req.body.title : ""
    const content = !is_empty(req.body.content) ? req.body.content : ""
    const idOwner = req.user.id

    if (title == '' && content == '')
        res.status(500).json({error: "Empty document"})

    const q = "INSERT INTO Document(title, content, idOwner) \
               VALUES(?, ?, ?)"
    query(conn, q, [title, content, idOwner])
    .then(data => {
        res.status(200).json({msg: "Document saved"})
    })
    .catch(err => {
        res.status(500).json({error: "Failed to save document"})
    })
})

app.get('/documents/:id', isLogedIn, (req, res) => {
    const idDoc = req.params.id
    const idUser = req.user.id
    const q = "SELECT * FROM Document d WHERE d.idOwner = ? AND d.idDocument = ?"

    query(conn, q, [idUser, idDoc])
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(500).json({error: "Error while getting the file"})
    })
})

app.listen(port, () => {
    util.log(`Server started on port ${port}`)
})
