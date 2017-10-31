### socket.io知识点

socket.io极大的方便了操作。

我们接下来用socket.io结合express框架做一个例子:
	
服务器端代码:

	就是再app.js的var server = http.createServer(app);后面加上下面的

	var io = require('socket.io')(server);
	//只要有客户端连接， 这个回调函数就被调用
	    io.on('connection',function(ws){
	        // console.log(ws);
	        ws.emit('dixiu','丢你楼某');
	         ws.on('chuan',function(msg){
	          // console.log(msg);
	           ws.broadcast.emit('tianxiu',msg);
	        })
	    })

**代码解释：**

> **io = require('socket.io')(server)**:就是建立socket.io服务器

> **io.on('connection',function(ws){})**:当有客户端链接本服务器时，会触发这个事件的回调函数

> **ws**:ws指的是触发这个事件的客户端

> **ws.emit('dixiu','丢你楼某')**:ws.emit是触发客户端上的socket.on('dixiu',function(msg){})的事件。'dixiu'指的是事件名称,'丢你楼某'则是从服务器端传给客户端的数据

> **ws.on('chuan',function(msg){})**:给链接上服务端的客户端绑定chuan事件，可以在下面的客户端代码里看是怎么被触发的,msg是被触发时，客户端会传过来数据。然后这个数据又被下面的ws.broadcast.emit使用了。

> **ws.broadcast.emit('tianxiu',msg)**:向出来自己以外其他的所有客户端传输这个数据。

客户端代码:

	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Document</title>
		<script src="/socket.io/socket.io.js"></script>
	</head>
	<body>
		<input type="text"  id="txt">
		<button id="btn">发送</button>
		<h1>我是websocket客户端</h1>
	</body>
	<script>
		var socket = io.connect('ws://localhost:3000');
	    // var socket = io('http://localhost:3000');
		var name = prompt('输入你的姓名');
		socket.on('dixiu',function(msg){
			console.log(msg);
		});
		socket.on('tianxiu',function(msg){
			console.log(msg);
		})
		var txt = document.getElementById('txt');
		var btn = document.getElementById('btn');
		btn.onclick = function(){
			socket.emit('chuan',{name:name,txt:txt.value}) //--B段代码
		}
	</script>
	</html>

**代码解释:**
> **<script src="/socket.io/socket.io.js"></script>**:这个是必要的，没这个就不能运行。

> **var socket = io.connect('ws://localhost:3000')**:链接服务器端。被注释的那个也可以，一样的。

> **socket.on('dixiu',function(msg){})**:绑定事件，只要链接成功后，服务器端也可以触发客户端的绑定事件。

> **B段代码socket.emit('chuan',{name:name,txt:txt.value})**:chuan事件，客户端本身是没有的。这个是上面的服务器端的代码给客户端绑定的事件。大概的思路是：凡是链接上了服务端的客户端，服务器端都会给客户端绑定这个事件，然后点击按钮，触发这个绑定的事件，将数据传输给服务器端。


socket.io的特点在于:只要服务器与客户端链接上了，那么他们之间通过触发事件来传输数据。
例如，客户端触发事件，就会把数据传给服务器。而服务器触发事件，就会把数据传给客户端。
而且服务器可以给客户端绑定事件。

#### 暂时就想到这么多，其余的以后再写。
