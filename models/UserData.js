const mongoose =require("mongoose")

const UserSchema=mongoose.Schema({
    name:{type:String,unique: true},
    mail:String,
    password:String
})
module.exports = mongoose.model('User',UserSchema);