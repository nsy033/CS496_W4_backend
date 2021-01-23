var express = require('express');
var router = express.Router();
var Test = require('../models/test');
var axios = require('axios');
var cheerio = require('cheerio');

const getHtml = async () => {
    try {
      return await axios.get("http://ncov.mohw.go.kr/");
    } catch (error) {
      console.error(error);
    }
  };  

router.get('/all',(req,res)=>{
    getHtml()
    .then((html) => {
      const $ = cheerio.load(html.data);
      let parentTag = $("div.liveNum ul.liveNum li");
      // 크롤링할 태그 찾기

      let resultArr = [];
      parentTag.each(function (i, elem) {
        let itemObj = {
          text: $(this).find("strong").text(),
          num: $(this).find("span").text(),
        };
        resultArr.push(itemObj);
      });

      resultArr.forEach((elem) => {
        console.log(`현재 ${elem._text}의 현황 : ${elem._num}`);
      });
      return resultArr;
    })
    .then((data) => res.send(data));
});

module.exports = router;