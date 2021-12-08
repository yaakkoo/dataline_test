const jwt = require('jsonwebtoken');
const User = require('../models/user')
const bcryptjs = require('bcryptjs');


exports.signUp = async (req, res) => {
    try {
        // let user = await User.findOne({ where: { email: req.body.email } })
        // if (user) {
        //     return res.status(200).json({
        //         msg: "Username already existed"
        //     })
        // }
        
        req.body.password = await bcryptjs.hashSync(req.body.password, 10);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        console.log(user.password);
        let token = jwt.sign({ id: user.id }, process.env.TOKEN)
        return res.status(200).json({
            user: user,
            token: token
        })
    } catch (error) {
        res.status(404).json({
            status: 'Error',
            msg: error.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        let user = await User.findOne({ where: { email: req.body.email } })
        if (!user) {
            return res.status(404).json({
                msg: 'Wrong Username or Email or Password '
            })
        }
        const check = await bcryptjs.compare(req.body.password, user.password);
        if (!check) {
            return res.status(404).json({
                msg: 'Wrong Username or Email or Password '
            })
        }
        const token = jwt.sign({ _id: req.body._id }, process.env.TOKEN)
        res.status(200).json({
            token: token,
            user: user
        })
        
    } catch (error) {
        res.status(404).json({
            status: 'Error',
            msg: error.message
        })
    }
}