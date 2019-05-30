# Web Storage


## localForage
* 用来本地存储数据的
* localforage的逻辑是这样的
	* 优先使用IndexedDB存储数据，
	* 如果浏览器不支持，使用WebSQL，
	* 浏览器再不支持，使用localStorage

* API还是localStorage的API
	* get, set, remove, clear, length等 API
	* https://localforage.docschina.org/#api-setitem



## indexDB
* indexDB为本地数据库存储