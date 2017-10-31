## express 框架

### 安装express框架

1. 安装环境
		(1) npm install -g express（ web应用开发框架）
		(2) npm install -g express-generator(创建一个hello world的应用程序)

2. 创建一个工程()
		(1) express myapp（创建出来的是jade模板）
			express  -e  myapp (ejs模板)
		(2)cd myapp && npm install（下载很多包）
		(3) npm start (在package.json 以及创建了这个脚本了)
		(4) 修改即重启node服务， 在package.json 改成node-dev

### 初步了解express 
  1. /bin/www 文件是入口文件
  2. app.js 类似于中间转接站，二级路由，将routes内的各个路由js文件再路由一次
  3. /routes 内的js文件就是一级路由，配置所有的
  4. 浏览器上面输入，那么输入什么，那么就调用什么二级路由，然后再由二级路由去调用一级路由.
  5.login.js里的router.get(path,function(){
 							res.render(path,{ejs文件转换规则对象});
							})
						这里的res.render(path)里的path的上一级目录是views目录

### 文件目录形式:
	-bin
		www		  //入口文件
	+node_modules //放置第三方模块
	+public 	  //静态文件
	-routes
		index.js  //一级路由，最底层的路由
		login.js
		user.js
	-views
		error.ejs //视图，在routes中由res.render(path,{转换规则对象})调用,
		index.ejs //参数里的path参数的上一级为views目录。
		login.ejs
	apps.js
	package.json
	readme.md

	//来来，一个典型的routes目录下的login.js文件如下
	var express = require('express');
	var router = express.Router();
	/* GET users listing. */
	//--------get的第一个参数
	router.get('/', function(req, res, next) {
		console.log(__dirname);
		res.render('login',{wo:'哈哈哈'});
	});
	module.exports = router;

  分析：前面说过了，login.js为一级路由，也就是最底层的路由，但是外面的app.js里还写了个二级路由。这个时候重点来了。
  		**浏览器里输入的是二级路由！**
  		会先有app.js里的二级路由解析，比如

	//app.js里写了
	var login = require('./route/login');
	app.use('/login',login);//---当浏览器输入第一个参数，就会转到第二个参数的路由解析
	//比如浏览器输入：localhost:3000\login
	//-------------------hostname---||path


于是在第二个login.js路由里面再根据path后面的路径决定执行哪个router.get()方法。

	//比如浏览器输入localhost:3000\login\aaa
	//-------------------hostname---||pathfather||pathchild

	//login.js代码如下：
		var express = require('express');
		var router = express.Router();
		/* GET users listing. */
	//--------get的第一个参数
		router.get('/', function(req, res, next) { 
	//这个get的第一个参数就是浏览器输入的pathchild,如果浏览器只是输入到pathfather那么就
	//会执行这个方法
		console.log(__dirname);
		res.render('login',{wo:'哈哈哈'});
	});
	router.get('/aaa',function(req,res,next){
	//如果浏览器输入到了pathchild，那么就会执行这个方法
	//下面这个res.render('child/childhaha')是指渲染views目录下的child子文件中的childhaha文件
	res.render('child/childhaha');
	});
	module.exports = router;

## 接下来，加点东西进去。
**views文件夹里的ejs文件里引入静态资源链接呢**
	我们在public的javascripts文件夹里新增一个warning.js文件。

	那么public目录形式是：
		-public
			+css
			+images
			-javascripts
				warning.js
			+stylesheets


	views目录下的ejs文件怎么引入这些呢？
		index.ejs代码：
		<!DOCTYPE html>
		<html>
			<head>
				<title><%= title %></title>
				<link rel='stylesheet' href='/stylesheets/style.css' />
			</head>
			<body>
				<%- include("./header.ejs")%>
				<h1><%= title %></h1>
				<p>Welcome to <%= title %></p>
			</body>
			<script src="/javascripts/warning.js"></script>
		</html>

**link标签里的href与script里的src的上一级目录就是public文件夹**
**但是，include里的目录就是指向views目录**

