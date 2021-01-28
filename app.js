const express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var app = express();
const multer = require('multer');
const port = 4000;

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://admin:1234@madcamp.rwmfx.mongodb.net/madcamp?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
.catch(error => console.log(error))
var testRouter = require('./routes/test_middleware');
var designRouter = require('./routes/design_middleware');
var userRouter = require('./routes/user_middleware');

const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use('/testcrawling', testRouter);
app.use('/design', designRouter);
app.use('/user', userRouter);

app.use('/uploads',express.static('uploads'));
// app.get('/', (req, res, next) => {
//     res.send('hello world!');
// });

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' +file.originalname)
    }
  })
const upload = multer({ storage: storage }).single('file')

app.post('/uploads', (req, res) => {
    console.log('*************************', req.file);
    upload(req, res, (err) => {
        if (err) {
        res.sendStatus(500);
        }
        res.send(req.file.path);
        console.log('image file name ' + req.file.path + ' image saved in server');
    });
});

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});

module.exports = app;