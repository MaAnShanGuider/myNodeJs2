var http = require('http');
var url = require('url');
var querystring = require('querystring');

http.createServer(function(req,res){	
	var pathName = url.parse(req.url).pathname;
	res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
	res.write(render(pathName));
	res.end();
}).listen(3000);



function render(path){
    switch(path) {
        case "/login":
            return "login页面";
        case "/register":
            return "register页面";
        case "/home":
            return "home页面";
        default:
            return "wocoanima"
    }
}

/*
//1. node内置包http 提供创建服务器的功能
var http= require("http");
var url =require("url");//解析地址类型的字符串的库
var querystring = require("querystring");
http.createServer(function(req,res){
    //req 浏览器端传给服务的东西

    if(req.url=="/favicon.ico"){
        return "";
    }

    var pathname = url.parse(req.url).pathname;
    console.log(querystring.parse(url.parse(req.url).query));


    console.log(JSON.stringify({name:"111111"}));
    //res 服务器写给浏览器端的东西
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    res.write(render(pathname));
    res.end();
}).listen(3000);

function render(path){
    switch(path) {
        case "/login":
            return "login页面";
        case "/register":
            return "register页面";
        case "/home":
            return "home页面";
        default:
            return "404页面"
    }
}*/