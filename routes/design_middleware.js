var express = require('express');
var router = express.Router();
var Design = require('../models/design');

router.post('/add', (req,res, next) => {
  console.log("req: ",req);
  var design = new Design();

  design.screenCapture=req.body.screenCapture;
  design.title=req.body.title;
  design.price=req.body.price;
  design.private=req.body.private;
  design.user_name=req.body.user_name;
  design.user_email=req.body.user_email;
  design.like=req.body.like;
  
  design.save(function(err){
      if(err){
          console.error(err)
          res.json({result:0})
          return;
      }
      res.json({result:1})
  })
})

//시간순
router.get('/all',(req,res)=>{
  console.log('server get design signal from client')
  Design.find({private: false},function(err,designs){
    if(err) return res.status(500).send({error:'database failure'})
    res.json(designs);
  })
  
})


//내림차순
router.get('/popular',(req,res)=>{
  console.log('server get design signal from client')
  Design.find({private: false},function(err,designs){
    if(err) return res.status(500).send({error:'database failure'})
    res.json(designs);
  }).sort({like:-1})
  
})





router.post('/update/:id', (req,res, next) => {
  Design.findOneAndUpdate({_id:req.params.id}, {$set:{like:req.body.like}},{ new: true },function(err,design){
    if(err) return res.status(500).send({error:'database failure'})
    res.json(design);
  })
  
})


router.get('/mypage/:name_', (req,res, next) => {
  // console.log(req.params.name_);
  Design.find({user_name:req.params.name_},function(err,designs){
    if(err) return res.status(500).send({error:'database failure'})
    res.json(designs);
  })
})

router.get('/like/:id', (req,res, next) => {
  
    Design.find({like:req.params.like}, function(err,designs){
      
    if(err) return res.status(500).send({error:'database failure'})
    res.json(designs);
  }).catch(function (error){
    console.log(error);
  }) 
    
})

module.exports = router;