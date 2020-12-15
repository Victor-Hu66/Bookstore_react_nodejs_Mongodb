var jwt = require("jsonwebtoken");



const authMiddleware = (req, res, next) => {

    // TODO-1 get token
    const token = req.header("token")

    // TODO-2 return error if token doesnt exist
    if (!token){
        return res.status(400).json({msg: "No Token"})
    }

    // TODO-3 verify token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
        if (err) {
            return res.status(400).json({ msg: "invalid token"})
        } else {
            req.decodedUser = decodedToken.userData;
            next();
        }
    } )

}


module.exports = authMiddleware;