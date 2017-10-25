function render(url){
	switch (url){
		case '/home':
			return '欢迎来到寂静岭。';
		case '/login':
			return '这里是登录界面。';
		default :
			return "我操你妈，这是404.";

	}

}
module.exports={
	render:render,
}