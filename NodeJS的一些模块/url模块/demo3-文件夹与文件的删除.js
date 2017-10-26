var fs = require('fs');
fs.mkdir('./dddd',function(error,info){
	if(!error){
		console.log('文件夹创建成功')
	}
	else{
		console.error(error);
	}
	fs.rmdir('./dddd',function(error,info){
		if(!error){
			console.log('文件夹删除成功')
		}
		else{
			console.error(error);
		}
	});
})