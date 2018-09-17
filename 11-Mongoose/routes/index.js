var express = require('express');
var router = express.Router();
var mongoose = require('mogoose');
mongoose.connect('localhost:27017/test');
var schema = mongoose.Schema;
var userDataSchema = new Schema({
  title: {type: String, required: true},
  content: String,
  author: String
}, {collection:'user-data'});

var userData = mongoose.model('UserData', userDataSchema);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next) {
    UserData.find()
        .then(function (doc) {
            res.render('index', {item: doc});
        });
});

router.post('/insert', function(req, res, next) {
    var item = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    };
    var data = new UserData(item);
    data.save();
    res.redirect('/');
});
router.post('/update', function(req, res, next) {

    var id = req.body.id;
    UserData.findById(id, function(err, doc){
        if (err) {
            console.error('error, no entry found moji');
        }
        doc.title = req.body.title;
        doc.content = req.body.content;
        doc.author = req.body.author;
        doc.save();
    });
    res.redirect('/');
});

router.post('/delete', function(req, res, next) {
    var id = req.body.id;
    UserData.findByIdAndRemove(id).exec();
    res.redirect('/');
});
module.exports = router;
