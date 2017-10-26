var express = require('express');
var router = express.Router();

/* GET users listing. */
//--------get的第一个参数
console.log(__dirname);
router.get('/', function(req, res, next) {
	console.log(__dirname);
	 res.render('login',{wo:'caonima'});
	 // next();
});

router.get('/a',function(req,res,next){
	res.render('a/aaa');
})
module.exports = router;
