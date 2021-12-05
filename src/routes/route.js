const express = require('express');
const router = express.Router();

// these are controller and middelware imports.
const authorController =require("../controllers/Authorcontroller")
const blogcontroller =require("../controllers/Blogcontroller")
const logincontroller =require("../controllers/logIn")
const middleWare =require("../vlidation/validation")


//these are all the API's which we will be using for each of the problem statement.
router.post('/BASE_URL/authors', authorController.createAuthor ) //done
router.post('/blogs',middleWare.validation, blogcontroller.myBlogCreation ) //done
router.get('/getdata',middleWare.validation, blogcontroller.returnBlogsFiltered); //done
router.put('/update/blogId/:id',middleWare.validation, blogcontroller.updateData);// done
router.get('/delete/blogId/:id',middleWare.validation, blogcontroller.deleteBlog);//done
router.get('/deleteSpecific',middleWare.validation, blogcontroller.deleteSpecific);//dome
router.post('/login', logincontroller.logIn) //done


module.exports = router;