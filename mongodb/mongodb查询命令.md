### mongodb查询命令
**语法**

MongoDB 查询数据的语法格式如下：

> db.collection.find(query, projection)

- query ：可选，使用查询操作符指定查询条件
- projection ：可选，使用投影操作符指定返回的键。查询时返回文档中所有键值， 只需省略该参数即可（默认省略）。

**除了 find() 方法之外，还有一个 findOne() 方法，它只返回一个文档。**

##### MongoDB AND 条件

MongoDB 的 find() 方法可以传入多个键(key)，每个键(key)以逗号隔开，及常规 SQL 的 AND 条件。

语法格式如下：