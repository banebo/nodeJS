const { getAll, signUp, getUserByUsername } = require("./user_service");
const { request } = require("express");
const { compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.findAll = (req, res) => {
    getAll((err, data) => {
        if (err)
            return res.status(500).json({
                success: 0,
                message: "Error"
            });
        return res.status(200).json({
            success: 1,
            users: data
        });
    });
}

exports.createUser = (req, res) => {
    if (!req.body ||
        !req.body.username ||
        !req.body.password)
            return res.status(500).json({
                success: 0,
                message: "Invalid credentials or none at all..."
            })
    signUp(req.body, (err, data) => {
        if (err)
            return res.status(500).json({
                success: 0,
                message: "Smth went wrong"
            });
        return res.status(200).json({
            success: 1,
            res: data
        });
    });
}

exports.loginUser = (req, res) => {
    if (!req.body ||
        !req.body.username ||
        !req.body.password)
            return res.status(500).json({
                success: 0,
                message: "No username or password provided"
            });
    getUserByUsername(req.body.username, (err, user) => {
        if (err)
            return res.status(500).json({
                success: 0,
                message: "Something went wrong with the db..."
            })
        if(compareSync(req.body.password, user.password)){
            user.password = undefined;
            const token = jwt.sign({
                                    user
                                   },
                                   process.env.PRIVATE_KEY,
                                   {expiresIn: '1h'}
                                );
            return res.status(200).json({
                success: 1,
                message: "Login OK",
                token: token

            })
        }
        else
            return res.status(500).json({
                success: 0,
                message: "Invalid credentials"
            })
    })
    
}