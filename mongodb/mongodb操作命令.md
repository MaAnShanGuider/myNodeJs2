### 一些MongoDB的命令操作
   首先MongoDB的安装：把MongoDB for Windows 64-bit安装在合适的文件夹，不在c盘也行。
 然后安装好后，再别的地方新建文件夹dat。然后在MongoDB的安装目录下打开命令行，

 输入：$mongod --dbpath d:\dat

 **$:MongoDB的安装目录**

 **d:\dat  :  新建的数据库的储存文件夹**


 其次 再在mongodb的安装目录新打开一个控制台，输入:$ mongo.exe。	不要关闭MongoDB实例，新打开一个命令行工具，输入mongo ，该命令启动mongo shell，shell 将自动连接本地(localhost)的MongoDB实例，默认的端口是27017。

mongo进程是构造一个Javascript Shell，用于跟mongod进程交互，根据mongod提供的接口对MongoDB数据库进行管理，相当于SSMS(SQL Server Management Studio)，是一个管理MongoDB的工具。，

 **第一步是创建服务器的数据库储存空间，第二步是打开服务器。**

### 然后我们就是只要在mongo.exe里输入语句，就会打开数据库操作命令行，
### 同时在浏览器输入localhost:27017

mongod 是整个MongoDB最核心的进程，负责数据库的创建，删除等管理操作，运行在服务器端，监听客户端的请求，提供数据服务。

mongo 是一个交互式的js shell，提供了一个强大的js 环境，为DBA管理MongoDB，developer查询MongoDB数据提供接口。通过mongo shell和MongoDB进行交互，查询和修改MongoDB数据库，管理MongoDB数据库，维护MongoDB的副本集和分片集群，是一个非常强大的工具。

在启动mongo shell时，常用的参数是：

- --nodb: 阻止mongo在启动时连接到数据库实例；
- --port <port> ：指定mongo连接到mongod监听的TCP端口，默认的端口值是27017；
- --host <hostname> ：指定mongod运行的server，如果没有指定该参数，那么mongo尝试连接运行在本地- （localhost）的mongod实例；
- <db address>：指定mongo连接的数据库
- --username/-u <username> 和 --password/-p <password>：指定访问MongoDB数据库的账户和密码，只有当认证通过后，用户才能访问数据库；
- --authenticationDatabase <dbname>：指定创建User的数据库，在哪个数据库中创建User时，该数据库就是User的Authentication - Database；


### 数据库
一个mongodb中可以建立多个数据库。MongoDB的默认数据库为"db"，该数据库存储在data目录中。MongoDB的单个实例可以容纳多个独立的数据库，每一个都有自己的集合和权限，不同的数据库也放置在不同的文件中。

"show dbs" 命令可以显示所有数据的列表。
    
	 > show dbs

	 local  0.078GB
	 test   0.078GB

执行 "db" 命令可以显示当前数据库对象或集合。

	> db
	
	test

切换数据库
	
	 use foo


####创建数据库
	use databaseName    # databaseName 为 创建的数据库的名称

	eg:  
		>use tianmao
		switched to db tianmao

####删除数据库
	db.dropDatabase()

	>use tianmao
	 switched to db tianmao
	>db.dropDatabase()
	 { "dropped" : "runoob", "ok" : 1 }

####删除集合
	db.collection.drop()   #collection 为 表名

	>use tianmao
	 switched to db tianmao
	>db.banner.drop()
	 true
	>show tables 

####插入文档
MongoDB 使用 insert() 或 save() 方法向集合中插入文档，语法如下:

	db.tableName.insert(document)  #document一般是对象格式

	db.banner.insert({
			title: 'MongoDB 教程', 
		    description: 'MongoDB 是一个 Nosql 数据库',
		    by: '菜鸟教程',
		    url: 'http://www.runoob.com',
		    tags: ['mongodb', 'database', 'NoSQL'],
		    likes: 100
		})

banner是集合名，如果不存在，那么会自动创建这个集合并插入文档。
插入文档你也可以使用 db.col.save(document) 命令。如果不指定_id字段save()方法类似于 insert()方法。如果指定_id字段，则会更新该_id的数据。

####更新文档
MongoDB 使用 update() 和 save() 方法来更新集合中的文档。接下来让我们详细来看下两个函数的应用及其区别
	
#####update()方法
	db.collection.update(
	   <query>,
	   <update>,
	   {
	     upsert: <boolean>,
	     multi: <boolean>,
	     writeConcern: <document>
	   }
	)

**参数说明：**

	    -query : update的查询条件，类似sql update查询内where后面的。
	    -update : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
	    -upsert : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
	    -multi : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
	    -writeConcern :可选，抛出异常的级别。

例子：在banner集合中插入这些文档
	 
	>db.banner.insert({
		title:'天猫banner图1',
		description:'这个图长啥样',
		by:'dami',
		url:'www.tianmao.com',
		tags:['天猫','图片','首页']
		})
	>db.banner.find().pretty()
	{
	        "_id" : ObjectId("59f32103db82fa5840e38d52"),
	        "title" : "天猫首页",
	        "description" : "关于图片的详情",
	        "by" : "dami",
	        "url" : "www.tianmao.com",
	        "tags" : [
	                "天猫",
	                "首页",
	                "详情"
	        ]
	}
	>db.banner.update(
		{'title':'天猫首页'}，{$set:{'title':'京东首页'}}
		)
**如果<update>参数里不设置操作符($set,$inc),那么query匹配到的记录会整个被替换成updata.**
######关于操作符
1. $set:用来指定一个键的值。如果这个键不存在，则创建它。
2. $unset:从文档中移除指定的键。
