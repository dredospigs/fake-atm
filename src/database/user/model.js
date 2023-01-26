const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {type:String, required:true},
        accountNumber:{type:Number, required:true},
        balance:{type:Number, required:true},
        history: {type:Array, required:true}
    },
    {
        versionKey:false
    }
);

module.exports = mongoose.models.atmInfo || mongoose.model("atmInfo", userSchema)