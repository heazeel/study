# 函数防抖和函数节流
## 1. 函数防抖
短时间内多次触发同一事件，只执行最后一次，或者只执行最开始的一次，中间的不执行。

应用场景：
* 搜索框搜索输入。只需用户最后一次输入完，再发送请求
* 手机号、邮箱验证输入检测
* 窗口大小Resize。只需窗口调整完成后，计算窗口大小。防止重复渲染。

```js
function debounce(fn,delay){

  var timer = null;

  return function(){

    clearTimeout(timer);

    timer = setTimeout(function(){
      fn.apply(this)
    },delay);

  }
}
```


## 2. 函数节流
限制一个函数在一定时间内只能执行一次。

应用场景：
* 滚动加载，加载更多或滚到底部监听
* 谷歌搜索框，搜索联想功能
* 高频点击提交，表单重复提交

```js
function throttle(fn,delay){
  var lastTime = 0;

  return function(){

    nowTime = Date.now();

    if(nowTime-lastTime>delay){
      fn.apply(this);
      lastTime = nowTime;
    }
    
  }
}
```