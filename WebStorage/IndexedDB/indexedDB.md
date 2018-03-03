
## IndexedDB database
- IndexedDB是什么？
    1. 事务型数据库系统，类似于基于SQL的RDBMS
    2. 在浏览器中存储结构化数据的数据库，并且为 web应用提供了丰富的查询能力
    3. IndexedDB是按域名分配独立空间，一个独立域名下可以建立多个数据库，
        - 每个数据库可以创建多个对象存储空间(表)，
        - 一个对象存储空间可以存储多个对象数据
        ```
        IndexedDB
            www.a.com
                DB_A
                    table_A
                    table_B
                DB_B
            www.b.com
                DB_A
                    table_A
                    table_B
                DB_B
        ```
    4. 大小限制
        - Firefox: 对 IndexedDB 数据库的大小没有限制。在用户界面上只会针对存储超过 50MB 大小的 BLOB（二进制大对象）请求权限。大小的限额可以通过 dom.indexedDB.warningQuota 首选项进行自定义
    4. indexedDB 操作
        1. 增，删，改
        2. 事务
        3. 游标
        4. 索引


## indexedDB的使用
- IndexedDB 鼓励使用的基本模式如下所示：
    1. 打开数据库并且开始一个事务。
    2. 创建一个 object store。
    3. 构建一个请求来执行一些数据库操作，像增加或提取数据等。
    4. 通过监听正确类型的 DOM 事件以等待操作完成。
    5. 在操作结果上进行一些操作（可以在 request 对象中找到）


## IndexedDB 参考资料
- https://www.w3.org/TR/IndexedDB

## Web SQL
- W3C已放弃 Web SQL，
- 仅 webkit内核浏览器支持，chrome，safari，其它浏览器均不支持























