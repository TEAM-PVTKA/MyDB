var mongo = require('mongoose')
var schema = mongo.Schema;
var cardSchema = new schema({
  cardNumber1: Number,
  cardNumber2: Number,
  cardNumber3: Number,
  cardExpiry: String,
  cardHolder: String,
  cardNumberId: String
})

// userSchema.save()

var card = mongo.model('card',cardSchema)
module.exports=card