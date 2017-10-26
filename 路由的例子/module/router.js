var path = require('path');
var renderHtml = require('./render');

/*

	render=(url)=>{
	// let goodurl = path.normalize(url);

	//-----这里url是:  /home,是和浏览器一样的
	//-----而goodurl是：\home,是和window系统目录一样的
	//-----结论: path.normalize()是将浏览器转为window目录，以便用来给fs的读写
	//函数使用的，像readFile(path,function(error,data){}),里面的path就必须是window
	//系统目录格式.
	//也就是说，想要在浏览器读写window系统目录里的文件就必须
	//			先用path.normalize()转换路径，再用readFile()进行操作.
	// console.log('goodurl:'+url);
	switch(url){
		case '/home':
				console.log('到home了');
			return renderHtml(url);
		case '/login':
			return renderHtml(url);
		default :
			return renderHtml('/404');
	}
}

*/

//------render是对象，方法名就是用户输入的路径名。方法的参数，为res对象，
//并且方法里面调用了readerHtml模块，这个模块接受两个参数，一是res对象，
//二是路径字符串。
render={
	'/login':function(res){
		renderHtml(res,'/html/login.html');
	},
	'/home':function(res){
		renderHtml(res,'/html/home.html');
	}
	,
	'/404':function(res){
		renderHtml(res,'/html/404.html');
	}
	,
	'/wocao':function(res){
		console.log('执行到我了');
		renderHtml(res,'/js/wocao.js');
	}
}
module.exports = render;