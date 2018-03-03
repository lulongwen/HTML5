
  // 获取页面所有的 ul
  var SHOP = {
    add : document.querySelector('#add'),
    lis : document.querySelectorAll('#add> li'),
    cart : document.querySelector('#cart'),
    arr : []
  }
  
  
  /** 初始化，先调用本地存储 localStorage
   *  1. 如果有，把本地存储分割成数组，然后循环，追加到购物车的HTML中
   *  2. 给 window 添加绑定 storage事件，检测变化
   *    - 给window 绑定 'storage', 当增加或删除数据时，让其它页面一起变化
   *  3. 点击 li 添加到数组里，然后循环数组，添加到购物车里面
   */
  getStorage();
  window.addEventListener('storage', getStorage, false);
  function getStorage() {
    let str = localStorage.getItem('shop');
    // 如果有，把 str.split(',') 切成数组，renderHTML
    if (str){
      SHOP.arr = str.split(',');
      create_li(SHOP.arr);
    };
  }
  
  function create_li(arr) {
    let html = '',
        length = SHOP.arr.length;
    for (let i = 0; i < length; i++) {
      html += `<li>${arr[i]}</li>`;
    }
    SHOP.cart.innerHTML = html;
    // '' + [] = 字符串
    localStorage.setItem('shop', ''+arr);
  }


  // 点击添加 li 到 arr数组里，然后 each arr 添加到购物车里面
  addArr();
  function addArr(){
    for(var i=0; length= SHOP.lis.length, i<length; i++){
      SHOP.lis[i].onclick = function(){
        let str = SHOP.arr.join('');
        let li = this.innerHTML;
      
        /**
         * 当数组中没有这个数据，就添加
         * 如果已经添加购物车，就不用重复添加，如何判断是不是重复添加？
         * 思路：
         *  把数组转为 字符串，用 indexOf，如果 == -1，说明没找到，就添加
         *  如果不等于 -1，说明找到
         */
        if( str.indexOf(li) == -1 )
          SHOP.arr.push(li);
        create_li(SHOP.arr);
      }
    }
  }
  
  
  // 点击删除
  SHOP.cart.addEventListener('click', function(ev){
    let self = ev.target.tagName.toLocaleLowerCase() == 'li';
    var text = ev.target.innerHTML;
    if(!self) return;
    /**
     * 点击购物车中的 li时i，将数组中的字符删除，获得新的数组
     */
    for(var i=0; length=SHOP.arr.length, i<length; i++){
      console.log(i, 'before')
      if( SHOP.arr[i] == text ){
        SHOP.arr.splice(i, 1);
        // i--;
        console.log(i, 'after')
      }
    }
    create_li(SHOP.arr);
  },false);
  



