### VUE中报Error: Avoided redundant navigation to current location:
在VUE中路由遇到Error: Avoided redundant navigation to current location:报错显示是路由重复，
虽然对项目无影响，但是看到有红的还是不舒服。
于是查了一下发现可以这样解决
在你引入VueRouter的时候再加上一句话：
```javascript
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
```