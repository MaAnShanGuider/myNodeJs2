### 这两个文件里的配置必须保持一致。
##### eg:
	model/user.js代码如下：
```
			var mongoose = require('mongoose');
			var Schema = mongoose.Schema;
			var obj = {
				name:String,   //---a段代码
				password:String, 
				tel:String
			}
			var model = mongoose.model('user',new Schema(obj));
			module.exports = model;
```

	routes/register.js代码如下：
```
			var express = require('express');
			var router = express.Router();
			var User = require('../model/user');
			var md5 = require('md5');
			router.get('/', function(req, res, next) {
			  res.render('register',{title:'注册'});
			});
			router.post("/",function(req,res){
				User.find({
					tel:req.body.inputTelphone
				}).then(result=>{
					console.log(result);
					if(result.length==0){
						return User.create({
								name:req.body.inputUsername,    //b段代码
								tel:req.body.inputTelphone,
								password:md5(req.body.inputPassword)
							})
					}else{
						res.render('register', { title: '注册页面'});
					}
				}).then(result=>{
					//这个回调函数等待 create 的promise reslove 之后才会调用
					res.redirect("/login");
				})
				
			})
			module.exports = router;
```
**a段代码与b段代码里的对象的属性名必须是一致的。
