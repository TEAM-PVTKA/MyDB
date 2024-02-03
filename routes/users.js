var express = require('express');
var router = express.Router();
var mongo = require('mongoose')

var user = require('../model/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',(req,res)=>{
  user.findOne({userName:req.body.userName}).select('_id userName password')
  .then((result)=>{
    if(result!=null)
  {
    // res.send('Username Already Exists')
    res.json({message : 'Username already exists'});
  }
  else{
    var myUser = new user({
      userName : req.body.userName,
      password : req.body.password,
      email : req.body.email
    });
    myUser.save()
    .then(result=>res.json({message:'User registered successfully'}))
    .catch(err=>{console.log(err)})
  }
})
.catch(err=>console.log(err))
})

router.post('/login',(req,res)=>{
  var uname = req.body.userName
  var pwd = req.body.password

  user.findOne({userName:uname}).select('_id userName password email')
  .then((result)=>{
    if(result==null)
    {res.send("User not found")}
    else{
      if(result.password == pwd)
      {res.send(result)}
      else{
        res.send('Wrong username or password')
      }
    }
  })
})

module.exports = router;
