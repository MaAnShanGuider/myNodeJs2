### websocket知识点

**我们以express项目结合websocket来讲**

流程：
1. $ express -e socketApp
2. $ cd socketApp && npm install
3. $ npm install --save-dev ws
4. $ npm install --save-dev socket.io
5. 改动package.json里的start，把"start:node /bin/www" 改成"start:node-dev /bin/www"

首先:我们先生成一个express框架的项目，然后在它的public文件夹里新建一个websocket.html
代码如下：

	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Document</title>
	</head>
	<body>
		<h1>我是websocket客户端</h1>
	</body>
	<script>
		var ws = new WebSocket('ws://');
		ws.onopen=()=>{
			console.log('链接开始');
		}
		ws.onmessage=(msg)=>{
			//参数msg是接受服务器端传过来的信息
			//msg.data只能是接受字符串格式
			console.log(msg.data);
		}
		ws.onerror=()=>{
			console.log('有错误');
		}
		ws.onopen=()=>{
			console.log('链接开始');
		}
		ws.onclose=()=>{
			console.log('链接关闭');
		}
	</script>
	</html>

**注意，这个时候，我们自己只是改动了package，以及新建了一个websocket.html在public静态资源文件夹下。**

我们打开浏览器，输入:localhost:3000/websocket.html

就可以看到我们的这个界面了。

关于为什么输入websocket.html(注意，一个字都不能少),这又牵扯到了express的路由了。。。

**这个时候，我们还没写服务端**

###服务端的创建

我们在根目录(就是与app.js处在同一个目录下)下创建一个wsServer.js文件,代码如下：
	
	const WebSocket = require('ws');
	const wss = new WebSocket.Server({ port: 8080 });
	wss.on('connection', function connection(ws) {
	  ws.send('something');
	});

然后，我们在www文件里的最后面加入一段代码：
	
	require('../wsServer');//这样的话，打开express项目，就会启动wsServer服务器

### 任何其他人访问我们本地主机的服务器

把public目录下的文件代码修改为:

	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Document</title>
	</head>
	<body>
		<input type="text"  id="txt">
		<button id="btn">发送</button>
		<h1>我是websocket客户端</h1>
	</body>
	<script>
		var ws = new WebSocket('ws://10.31.155.64:8080'); //最重要的A段代码
		var name = prompt('输入你的姓名');
		ws.onopen=()=>{
			console.log('链接开始');
		}
		ws.onmessage=(msg)=>{
			// console.log(msg);
		try{	var str = JSON.parse(msg.data);
			console.log(str);
			}
			catch(e){
			}
		}
		ws.onerror=()=>{
			console.log('有错误');
		}
		ws.onopen=()=>{
			console.log('链接开始');
		}
		ws.onclose=()=>{
			console.log('链接关闭');
		}
		var txt = document.getElementById('txt');
		var btn = document.getElementById('btn');
		btn.onclick = function(){
			//发送数据到服务器
			const msgData = JSON.stringify({
				name:name,
				txt:txt.value
			}) 
			ws.send(msgData);
		}
	</script>
	</html>

**你也看见了，最重要的A段代码就是别人访问我们的服务器的关键**
**语法：var ws = new WebSocket('ws://本地IP:服务器端口号');**
这样就是别人的电脑上只要输入：**本地ip:服务器端口号/websocket.html**

就会进入打开我们的网页。

eg:输入 http://10.31.155.64:3000/websocket.html

**websocket.js代码修改为:**

	const WebSocket = require('ws');
	const wss = new WebSocket.Server({ port: 8080 });
	wss.on('connection', function connection(ws) {
	  ws.send('欢迎你们啊，哈哈');
	  ws.on('message',function(msg){
	  	console.log(msg);
	  	//wss是服务端，wss.clients则是服务端所有的客户端
	  	wss.clients.forEach((client)=>{
	  		//--向每一个客户端发送信息
	  		client.send(msg);
	  	})
	  })
	});