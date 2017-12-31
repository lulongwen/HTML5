
## IndexedDB database
- IndexedDB是什么？
    1. 在浏览器中持久的存储结构化数据的数据库，并且为 web应用提供了丰富的查询能力
    2. IndexedDB是按域名分配独立空间，一个独立域名下可以建立多个数据库，
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
1. 增，删，改
2. 事务
3. 游标
4. 索引



## Web SQL
- W3C已放弃 Web SQL，
- 仅 webkit内核浏览器支持，chrome，safari，其它浏览器均不支持























