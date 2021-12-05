const jwt = require('jsonwebtoken')
const AuthorModel = require('../models/AuthorModel')

//-------------This function will help to create the author and also checks the valid format of the email-----------
const createAuthor = async function (req, res) {
    try {
        let author = req.body
        const email = req.body.email
        const regx = (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/)//we are checking the format of the email using REGEX.
        if (regx.test(email)) {
            let savedauthor = await AuthorModel.create(author)
            res.status(200).send({ msg: savedauthor})
        }
        else {
            res.status(404).send({ msg: "enter the valid email" })
        }
    }
    catch (err) {
        res.status(400).send({ msg: "Some error occured" });
    }
}

module.exports.createAuthor = createAuthor
