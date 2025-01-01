const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    if (token == null)
        return res.status(401).json({ message: "UnAuthorized!" });

    jwt.verify(token, 'Jsonweb1234', (err, data) => {
        if (err) {
            console.log(err);
            return res.status(401).json({ message: "UnAuthorized!" });
        }
        console.log(data, "from JWT")
        req.user = data;
        next();
    });
}

function authorization(...allowedroles) {
    return (req, res, next) => {
        if (!req.user || !allowedroles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden!" });
        }
        next();
    }
}

module.exports = { authenticateToken, authorization }
