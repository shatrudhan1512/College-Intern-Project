const jwt = require("jsonwebtoken");

//-----------This function help in decoding the token and authenticates the user-----------
const validation = async function (req, res, next) {
    try {
        let token = req.headers['x-api-key'];
        let validate = jwt.verify(token, "radium");
        if (validate) {
            req.validate = validate
            next()
        }
        else {
            res.status(200).send({ status: "false", msg: "Token is invalid" });
        }
    }
    catch (err) {
        res.status(400).send({ msg: "Some error occured" });
    }
}
module.exports.validation = validation;