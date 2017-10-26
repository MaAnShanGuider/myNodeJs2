var fs = require('fs');

fs.readFile('./txt/test2.txt','utf-8',function(error,info){
	if(!error){
		console.log(info);
	}
	else{
		console.error(error);
	}
});