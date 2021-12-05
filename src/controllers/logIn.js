const BlogModel = require('../models/BlogModels')
const AuthorModel = require('../models/AuthorModel')
const jwt = require("jsonwebtoken");

const logIn = async function (req, res) {
    let data = req.body;
    let email1 = data.email;
    let password1 = data.password;
    let usercred = await AuthorModel.findOne({ email: email1, password: password1, isDeleted: false});
    if (!usercred) {
        return res.status(401).send({ status: "false", msg: "The given credential is not match" });
    }
    else {
        let payload = { _id: usercred._id };
        let token = jwt.sign(payload, "radium");//token creation
        res.status(200).send({status: "True", data: usercred, token: token});
    }
}
module.exports.logIn= logIn;