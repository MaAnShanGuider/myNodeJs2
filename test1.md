# node开始
1. ## 怎么快捷键打开文件?

>shift加右键该文件夹，就会出现"在此处打开命令窗口"

2. ## 怎么通过命令窗口运行js文件?

>$ node 文件名

> E:\gitRes\repository\myNodeJs2>node demo1.js

3. ## node.js使用的几个注意点:

	* ## 打开js文件

	 	 想要在浏览器打开像 “localhost:3000”之类，必须现在cmd里运行这个js文件，然后再在浏览器输入"localhost:3000",就会打开这个js的文件了，如果这个js里写了console.log，那么不会再浏览器中打印，而是cmd中，
	* ### req.url

		 req.url是指在“localhost:3000”之后所有的字符，比如地址框上是“localhost:3000/home”，那么req.url就会是“/home”(带斜杠)，**而不是"home",这点要注意了**
 
4. ## 一个完整的简单node.js代码


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
			console.log(url);//会在cmd中输入，而不是浏览器.
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


### 结论：node.js里的js是跑在cmd命令行上的，我们必须把它当做后端语言看待。
