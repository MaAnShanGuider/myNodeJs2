var http = require('http');//--加载引入nodejs提供的http模块，创建服务器

http.createServer(function(req,res){
	//-----request浏览器的传给服务器的请求,req
	//----response后台给浏览器的回复,res
	res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
	//200是状态码，即ajax.readyState
	res.write(render(req.url));//根据req的url判断要写入什么页面
	res.end();//这个过程结束

}).listen(3000);//------监听的端口

render=(url)=>{
	console.log(url);
	switch (url) {
		case "/home":
			return "欢迎来到寂静岭";
		case "/login":
			return "请登录你的账号";
		case "/geshen":
			return "食屎了你";
		default :			
			return "我得跳转";
	};

}