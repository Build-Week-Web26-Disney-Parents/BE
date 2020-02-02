const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../authConfig/secrets')

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: '401: Unauthorized' })
            } else {
                req.user = decodedToken
                next();
            }
        })
    } else {
        res.status(401).json({ message: '401: Unauthorized' })
    }
};
