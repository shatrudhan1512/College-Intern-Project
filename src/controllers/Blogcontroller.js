const BlogModel = require('../models/BlogModels')
const AuthorModel = require('../models/AuthorModel')

//-------This function is for Blog creation and entry-------
const myBlogCreation = async function (req, res) {
    try {
        let data = req.body;
        console.log(data)
        let authorId = req.body.authorId;//     Assigned the auther id in variable to check it is valid or not
        let validId = await AuthorModel.findById(authorId);
        console.log(validId)
        if (validId) {
            let savedData = await BlogModel.create(data)
            res.status(201).send({ data: savedData });
        }
        else {
            res.status(400).send({ msg: "The given id INVALID" });
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "Some error occured" });
    }
}

//----This function shows the blog which are not deleted and are published as per the user filter----
const returnBlogsFiltered = async function (req, res) {
    try {
        let body = req.query;
        body.isDeleted = false;
        body.isPublished = true;
        let foundBlogs = await BlogModel.find(body);
        if (foundBlogs) {
            res.status(200).send({ status: true, data: foundBlogs });
        }
        else {
            res.status(404).send({ status: false, msg: "No documents found" });
        }
    }
    catch (err) {
        res.status(500).send({ msg: "Some error occured" });
    }
}

//-------------This function is for updating the blog as per the user inputs-----------
const updateData = async function (req, res) {
    try {
        if (!req.validate._id == req.query.id) {
            return res.send({ status: "false", msg: "User not Authorized" });
        }
        let blogId = req.params.id;
        let data = await BlogModel.findOne({ _id: blogId });
        let update = req.body;
        if (!data) {
            return res.status(404).send({ status: false, msg: "Provide valid BlogId" });
        }
        if (data.isDeleted == true) {
            return res.status(404).send({ status: false, msg: "This book is no longer exists" });
        }
        if (update) {
            if (update.title) {
                data.title = update.title;
            }
            if (update.publishedAt) {
                data.publishedAt = update.publishedAt;
                data.isPublished = true
            }
            if (update.subcategory) {
                data.subcategory.push(update.subcategory);
            }
            if (update.Body) {
                data.Body = update.Body;
            }
            if (update.tags) {
                data.tags.push(update.tags);
            }
            data.save();
        }
        else {
            res.status(404).send({ msg: "Please provide data to update" });
        }
        res.status(200).send({ msg: "Succesful", data: data });
    }
    catch (err) {
        res.status(400).send({ msg: "Some error occured" });
    }
}

//-------This function authorises the user and flags the blog document as deleted--------------
const deleteBlog = async function (req, res) {
    try {
        if (!req.validate._id == req.query.id) {
            return res.status(401).send({ status: false, msg: "User not Authorized"});
        }
        let id1 = req.params.id
        let data = await BlogModel.findOne({ _id: id1 });
        if (!data) {
            return res.status(404).send({ status: false, msg: "Blog id doesnot exits" });
        }
        else {
            data.isDeleted = true;
            data.save();
            res.status(200).send({ msg: "succesful"});
        }
    }
    catch (err) {
        res.status(500).send({ msg: "Some error occured" });
    }
}

//------------This function is for find the specific field in our blog then delete that Particular Blog----------
const deleteSpecific = async function (req, res) {
    try {
        let obj = {isPublished: false};

        if (req.query.category) {
            obj.category = req.query.category
        }
        if (req.query.authorId) {
            obj.authorId = req.query.authorId;
        }
        if (req.query.tag) {
            obj.tag = req.query.tag
        }
        if (req.query.subcategory) {
            obj.subcategory = req.query.subcategory
        }
        
        let data = await BlogModel.findOne(obj);
        if (!data) {
            return res.status(404).send({ status: false, msg: "The given data is Invalid" });
        }
        data.isDeleted = true;
        data.save();
        res.status(200).send({ msg: "succesful", data: data });
    }
    catch (err) {
        res.status(500).send({ msg: err });
    }
}
module.exports.myBlogCreation = myBlogCreation
module.exports.returnBlogsFiltered = returnBlogsFiltered
module.exports.updateData = updateData;
module.exports.deleteBlog = deleteBlog;
module.exports.deleteSpecific = deleteSpecific;
