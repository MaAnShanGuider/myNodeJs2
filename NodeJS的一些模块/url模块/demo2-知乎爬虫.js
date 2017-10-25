var http = require('http');
var https = require('https');
var querystring = require('querystring');

function spider(callback){
	const options = {
		hostname: 'www.zhihu.com',
		port:443,
		//--改变path最后面的offset的数值大小，会有不同的页面。
		path:'/api/v4/questions/48337357/answers?sort_by=default&include=data%5B%2A%5D.is_normal%2Cadmin_closed_comment%2Creward_info%2Cis_collapsed%2Cannotation_action%2Cannotation_detail%2Ccollapse_reason%2Cis_sticky%2Ccollapsed_by%2Csuggest_edit%2Ccomment_count%2Ccan_comment%2Ccontent%2Ceditable_content%2Cvoteup_count%2Creshipment_settings%2Ccomment_permission%2Ccreated_time%2Cupdated_time%2Creview_info%2Cquestion%2Cexcerpt%2Crelationship.is_authorized%2Cis_author%2Cvoting%2Cis_thanked%2Cis_nothelp%2Cupvoted_followees%3Bdata%5B%2A%5D.mark_infos%5B%2A%5D.url%3Bdata%5B%2A%5D.author.follower_count%2Cbadge%5B%3F%28type%3Dbest_answerer%29%5D.topics&limit=20&offset=1',
		method:'GET',
		headers: {
			"accept":"application/json, text/plain, */*",
			"Accept-Language":"zh-CN,zh;q=0.8",
			"authorization":"oauth c3cef7c66a1843f8b3a9e6a1e3160e20",
			"Cache-Control":"no-cache",
			"Connection":"keep-alive",
			"Cookie":"_zap=09f4ec14-26cd-4f35-b681-817cd2abbebe; q_c1=381b4b01a439450aad63d5afe824e606|1506680512000|1506680512000; q_c1=f2c9c47650524e419257a1c6fe047ca3|1506680512000|1506680512000; capsion_ticket='2|1:0|10:1506682346|14:capsion_ticket|44:NDgxYTdlZDNmYWQ5NDJlYzk0NWQ4YzA0MTY1YTFkOTk=|8207dae9ff2d97fb9990ed2ff5c0eb64989095dcbfe05d89638b890b5baad6b0'; l_cap_id='MDlmMWQ1ZTU5ZTAwNDI1MmFhOGExYTYxNGViOTFiMDQ=|1506682570|73b346a00359ffd73b38755e62f916653cc1a8c4'; r_cap_id='NmVlOTRmMWUwYmZkNDM2ODlhZWM3OTUzNzQzNWExNTc=|1506682570|b8e4f971997c590b2e96a550ab24cdf832307ab2'; cap_id='OWNkMTg4Y2EyNzVmNDE2MzhlNjlkZWYwZGI3NmJhMTc=|1506682570|d85b6573a809a32a0aae126487ddcebe9ed05673'; aliyungf_tc=AQAAAO9gniYfpAIArKaBtydMEXeAkJDv; _xsrf=2f996806-9050-47b7-bbfc-a3dbd3873375",
			"Host":"www.zhihu.com",
			"Pragma":"no-cache",
			"Referer":"https://www.zhihu.com/question/48337357",
			"User-Agent":"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
		}
	};

	//-------异步问题
	var req = https.request(options,function(res){
		var data = '';
		res.on('data',function(chunk){
			data += chunk;
		})
		res.on('end',function(){
			callback(data);
		})
	})
	req.end();
}
http.createServer(function(req,res){
	if(req.url=="/favicon.ico"){
        return ;
    }
	spider(function(data){
		var dataArr = JSON.parse(data).data;
		var duanzi = [];
		for(var i in dataArr){
			duanzi.push(dataArr[i].content);
		}
		res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
		duanzi.forEach(function(ele,i){
			console.log(i);
			res.write(i+'、'+ele);
		});
		
		res.end();
	})
	
	
}).listen(3000);
