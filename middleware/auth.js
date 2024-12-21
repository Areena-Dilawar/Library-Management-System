const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; 
     console.log(token);
    if (token == null)
        return res.status(401).json({message:"UnAuthorized!"});

    jwt.verify(token, 'Jsonweb1234', (err, data) => {
        if (err){
            console.log(err);
            return res.status(401).json({message:"UnAuthorized!"});
        }
        console.log(data,"from JWT")
        next();
    });
}

module.exports = authenticateToken
