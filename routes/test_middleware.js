var express = require('express');
var router = express.Router();
var Test = require('../models/test');
var axios = require('axios');
var cheerio = require('cheerio');

const getHtml = async () => {
    try {
      return await axios.get("https://htmlcolorcodes.com/color-picker/");
    } catch (error) {
      console.error(error);
    }
  };  

router.get('/all',(req,res)=>{
    getHtml()
    .then((html) => {
      const $ = cheerio.load(html.data);
      
      let parentTag = $(".color-code rgb show-sm-inline span");
      // 크롤링할 태그 찾기

      let resultArr = [];
      parentTag.each(function (i, elem) {
        let itemObj = {
          text: $(this).find("input").text(),
          
        };
        resultArr.push(itemObj);
      });

      resultArr.forEach((elem) => {
        console.log(`${elem._text}`);
      });
      return resultArr;
    })
    .then((data) => res.send(data));
});

module.exports = router;