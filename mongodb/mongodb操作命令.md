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


###### 数据库
一个mongodb中可以建立多个数据库。MongoDB的默认数据库为"db"，该数据库存储在data目录中。MongoDB的单个实例可以容纳多个独立的数据库，每一个都有自己的集合和权限，不同的数据库也放置在不同的文件中。

"show dbs" 命令可以显示所有数据的列表。
    
	 > show dbs

	 local  0.078GB
	 test   0.078GB

执行 "db" 命令可以显示当前数据库对象或集合。

	> db
	
	test

