var fs = require('fs');
var wopath = require('path');


//----路径这里path.join这里将字符串一些字符串转换成标准的路径。
//-------__dirname:当前文件的路径,而不是index.js的路径
//  ../:返回上一层文件夹
render=(res,path)=>{
	var nowPath = wopath.join(__dirname,'../',path);
	console.log(nowPath);
	fs.readFile(nowPath,'utf8',function(error,data){
		if(!error){
			res.write(data);			
			res.end('请求结束');
		}
		else{
		
			console.error(error);
		}
	});
}

module.exports = render;