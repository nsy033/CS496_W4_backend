var express = require('express');
var router = express.Router();
var Design = require('../models/design');

router.post('/add', (req,res, next) => {
  console.log("req: ",req);
  var design = new Design();

  design.screenCapture=req.body.screenCapture;
  design.title=req.body.title;
  design.price=req.body.price;
  
  design.save(function(err){
      if(err){
          console.error(err)
          res.json({result:0})
          return;
      }
      res.json({result:1})
  })
})

module.exports = router;