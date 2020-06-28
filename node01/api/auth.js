const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
    if(req.get("authorization")){
        const token = req.get("authorization").split(" ")[1];
        jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
            if (err)
                return res.status(503).json({
                    message: "Unauthorized access"
                });
            req.decoded = decoded;
            console.log(decoded);
            next();
        })
    }
    else
        return res.status(503).json({
            message: "Unauthorized access"
        });
}

module.exports = checkToken;