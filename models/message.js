var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var schema = mongoose.Schema;
const moment = require('moment');
var msgSchema = new schema({
    msg_title:{type:String,required:true,min:1},
    msg: {type:String,required:true,min:1},
    timestamp: {type: Date,required:true,default:Date.now},
    //user:{type:schema.Types.ObjectId,ref:'users'}
    user:{type:schema.Types.ObjectId, ref:'user'},
});
msgSchema.virtual('dateFormatted').get(function(){
    return moment(this.timestamp).format('YYYY-MM-DD');
});
msgSchema.virtual('dateDifference').get(()=>{
    return moment(this.timestamp).fromNow();
});
msgSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('messages',msgSchema);