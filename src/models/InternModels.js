const mongoose = require('mongoose')

const InternSchema = new mongoose.Schema({

    name: {
        type: String,
        required: 'name is required',
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        // validate: {
        //     validator: function (email) {
        //         return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        //     }, message: 'Please fill a valid email address', isAsync: false
        // }
    },
    mobile: {
        type: Number,
        trim: true,
        unique: true,
        required: 'Mobile No is required',
        // validate: {
        //     validator: function (phoneno) {
        //         return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phoneno)
        //     }, message: 'Please fill a valid Phone Number', isAsync: false
        // }
    },

    collegeId: {
        required: 'intern college is required',
        type: mongoose.Schema.Types.ObjectId,
        
    },


    isDeleted: {
        type: Boolean,
        default: false
    },

}, { timestamps: true })

module.exports = mongoose.model('Intern', InternSchema)

