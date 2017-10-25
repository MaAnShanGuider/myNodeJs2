var fs = require('fs');
fs.stat('txt/test.txt',function(err,stats){
	 if (err) {
       return console.error(err);
   }
   console.log(stats);
   console.log("读取文件信息成功！");
   
   // 检测文件类型
   console.log("是否为文件(isFile) ? " + stats.isFile());
   console.log("是否为目录(isDirectory) ? " + stats.isDirectory());    

})

/*
语法

以下为通过异步模式获取文件信息的语法格式：

fs.stat(path, callback)

参数

参数使用说明如下：

    path - 文件路径。

    callback - 回调函数，带有两个参数如：(err, stats), stats 是 fs.Stats 对象。

fs.stat(path)执行后，会将stats类的实例返回给其回调函数。可以通过stats类中的提供方法判断文件的相关属性
 */