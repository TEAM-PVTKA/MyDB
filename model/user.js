var mongo = require('mongoose')
var schema = mongo.Schema;
var userSchema = new schema({
    userName : String,
    password : String,
    email:String
})

// userSchema.save()

var user = mongo.model('user',userSchema)
module.exports=user