## router-view 复用时组件不刷新的解决办法
在使用Vue-router做项目时，会遇到如`/serviceId/:id`这样只改变`id`号的场景。由于`router-view`是复用的，单纯的改变id号并不会刷新`router-view`，而这并不是我们所期望的结果。

当然，我们可以在点击事件上加上`router.go(0)`，强制刷新整个页面来满足效果。但页面整体的刷新会使体验下降，并且作为个人也不是很能接受这样的方法。在查阅了一些资料后，发现可以有以下两种方法可以解决问题。
#### 1. 使用watch方法
watch方法据说是官方推荐的方法（抱歉，我没好好看文档）。当id发生变化时，'$route'也会相应地发生变化，因此可以通过watch的方法来进行操作。
```javascript
watch: {
  '$route': function (to, from) {
    // console.log(to)
    // console.log(from)
    // 我这里还是用了Vuex，不过应该不影响理解
    this.$store.dispatch('updateActiveTemplateId', this.$route.params.templateId) 
    // 通过更新Vuex中的store的数据，让数据发生变化
    this.getTemplateById()
  }
},
```

#### 2. 添加一个随机数
通过给router-view添加一个动态变化的参数，让Vue认为这个组件每一次都是一个新组件，从而重新刷新。
这个个人感觉是一个十分巧妙和优雅的方法。具体的实现如下：
```javascript
<router-view :key="key"></router-view>
computed: {
    key() {
        return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    }
 }
```