const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const BlogSchema = new mongoose.Schema({
    
    title:{
        type:String,
        required:true,

    },
    Body:{
        type:String,
        unique: true,
    
    },
    authorId:{
        type: objectId,
        required:true,
        ref: "Project-Author"
    },
    tags:{
        type:Array,
    },
    category:{
        type:String,   
        required:true

    },
    
    subcategory:{
        type:Array,
    },

    isPublished:{
        type:Boolean,
        default: false
    },
    publishedAt:{
        type:Date,
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    deletedAt:{
        type:Date
    }
   
}, {timestamps: true})

module.exports = mongoose.model('Project-Blog', BlogSchema)

