const jwt = require('jsonwebtoken');
const { Users } = require('../models');

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    jwt.verify(token, 'your_secret_key', async (err, decodedToken) => {
        if (err) {
            return res.status(403).json({ message: 'Token is not valid' });
        }

        try {
            const user = await Users.findByPk(decodedToken.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            req.user = user;
            next();
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    });
}

module.exports = authMiddleware;