# node.js引入其他的js模块
	
## 引出文件a.js与引入文件b.js
* 在同一个文件夹，那么引入文件b.js里的路径就必须写成

	`` m1 = require('./a.js'); ``

* 不在同一个文件夹,,a的文件夹module与b同级，那么b.js路劲必须写成

	`` m1 = require('./module/a.js')``

** 其中，1：路径后的".js"可以省略;2："."代表文件的当前路径. **

### js文件例子

a.js,b.js在同一文件夹

a.js代码

				
	var moduleInto = require('./b');
	moduleInto.boom('World');
		

b.js代码
	
	var bob={name:"Bob",age:13,height:155};
	function boom(str){
		console.log(str+' will Boom!');
	}
	exports.bob=bob;
	

