var http = require('http');//引入node.js内置的http模块
var renderFunc = require('./demo3_module');//引入demo3_module.js模块

http.createServer(function(req,res){

		res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
		res.write(renderFunc.render(req.url));
		res.end();
}).listen(3000);