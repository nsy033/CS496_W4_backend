var express = require('express');
var router = express.Router();
var {PythonShell} = require('python-shell');
// var Test = require('../models/test');
// var axios = require('axios');
// var cheerio = require('cheerio');

router.get('/all',(req,res)=>{

    console.log('server get signal with ', req.query.myColor);
    var options = {
        mode: 'text',
        pythonPath: '',
        pythonOptions: ['-u'],
        scriptPath: '',
        args: [req.query.myColor]
    };

    PythonShell.run('crawlingEx.py', options, function(err, results) {
        if(err) throw err;
        console.log('results: %j', results);
        res.json(results);
    });
});

module.exports = router;