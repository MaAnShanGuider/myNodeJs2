var http = require('http');
var url = require('url');
var router = require('./module/router');

http.createServer(function(req,res){
	// body... 
	if(req.url == '/favicon.ico'){
		return false;
	}
	console.log(req.url);

	res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
	try{
		router[req.url](res);
	}
	catch(e){
		
		var regexp = /^\/js\/\w+\.js$/;
		if(regexp.test(req.url)){
			
			router['/wocao'](res);
		}
		else{
			router['/404'](res);
		}
	}
}).listen(3000);

// http.createServer(callback(req,res){
// 			doshomething
// }).listen(3000);

//---后端路由的思路，就是将用户传入的url传进一个函数，进行判断，并调用这个页面
//
//router：路由判断页面写好了，接着写render渲染页面.