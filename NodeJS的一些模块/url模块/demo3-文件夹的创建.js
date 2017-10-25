var fs = require('fs');
fs.mkdir('./txt/mkdir出来的',function(error,info){
		if(!error){
			console.log('新文件夹创建成功');
		}else{
			console.error(error);
		}
})
