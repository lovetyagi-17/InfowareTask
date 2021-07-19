function verifyToken(req, res, next) {
    const token = req.header('token');
    if (typeof token !== 'undefined') {
        const bearer = token.split(' '); 
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = {
    verifyToken
}