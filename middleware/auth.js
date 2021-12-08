const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.Auth = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) {
            return res.status(401).json({
                msg: 'Access denied'
            })
        }
        const decode = jwt.decode(token, process.env.TOKEN);
        let user = await User.findByPk(decode.id)
        if (!user) {
            return res.status(401).json({
                msg: "Access denied"
            })
        }
        next()
    } catch (error) {
        res.status(404).json({
            msg: error.message
        })
    }
}