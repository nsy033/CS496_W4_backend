var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/add', (req,res, next) => {
//   console.log("req: ",req);
  var user = new User();
  user.exist=req.body.exist;
  user.email=req.body.email;
  user.liked=req.body.liked;

  user.save(function(err){
      if(err){
          console.error(err)
          res.json({result:0})
          return;
      }
      res.json({result:1})
  })
})

router.get('/login/:email_', (req,res, next) => {
  console.log(req.params.email_);
  User.findOne({email:req.params.email_},function(err,user){
    if(err) return res.status(500).send({error:'database failure'})
    if(!user) return res.json({exist: false})
    res.json(user);
  })
})

router.get('/check/:email_', (req,res, next) => {
  console.log(req.params.email_);
  User.findOne({email:req.params.email_},function(err,user){
    if(err) return res.status(500).send({error:'database failure'})
    res.json(user);
    // console.log(user);
  })
})

router.post('/like/:email_', (req,res, next) => {
  console.log(req.params.email_);
  User.findOneAndUpdate({email:req.params.email_}, {$set:{liked:req.body.liked}},{ new: true },function(err,user){
    if(err) return res.status(500).send({error:'database failure'})
    res.json(user);
  })
})

module.exports = router;