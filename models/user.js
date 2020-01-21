var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var schema = mongoose.Schema;
var userSchema = new schema({
    firstname: {type:String, required:true,min:1},
    lastname: {type:String,required:true,min:1},
    username:{type:String,required:true,min:5},
    password:{type:String,required:true,min:6},
    membership_status:{type:String, default:'non-member'},
    
    admin: {type:String,default:false}
});
userSchema.virtual('name').get(function(){
    return this.firstname+' '+this.lastname;
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('users',userSchema);