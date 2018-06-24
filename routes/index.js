var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('MainPage', { title: 'Maim Page' });
});

router.get('/vote', function(req, res, next) {
    res.render('Vote', { title: 'Vote' });
});

router.get('/AboutTM', function(req, res, next) {
    res.render('AboutTM', { title: 'About TM' });
});

module.exports = router;
