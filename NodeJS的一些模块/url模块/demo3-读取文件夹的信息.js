var fs = require('fs');
fs.readdir('./txt',function(error,info){
	if(!error){
		console.log(info)
	}
	else{
		console.error(error);
	}
});