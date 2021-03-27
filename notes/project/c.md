## 组件按需导入
之前采用的是一次性导入所有组件，但是这样会加长主页加载的时间，所以改为了按需导入。
但是按需导入出现了一个问题：就是导入的文件名包含不了变量

原因：
webpack 编译es6 动态引入 import() 时不能传入变量，例如import(dir) , 而要传入字符串 import('path/to/my/file.js')，这是因为webpack的现在的实现方式不能实现完全动态。

解决方法：
但一定要用变量的时候，可以通过字符串模板来提供部分信息给webpack；例如import(`./path/${myFile}`), 这样编译时会编译所有./path下的模块，但运行时确定myFile的值才会加载，从而实现懒加载。

但是最终还是无法解决我的问题，因为components里无法使用变量：

```js
data(){
  return{
    currentComponent:this.$route.params.id,
  }
}
components:{
  JS_A: () => import("@/markdown/JS/1.types/${this.currentComponent}.md")
}
```

上面的代码中`${this.currentComponent}`无法识别

所以最终还是采取了最笨的方法,一行一行的写。

```js
components: {
  JS_A: () => import("@/markdown/JS/1.types/A.md"),
  JS_B: () => import("@/markdown/JS/1.types/B.md"),
  JS_C: () => import("@/markdown/JS/1.types/C.md"),
  JS_D: () => import("@/markdown/JS/1.types/D.md"),
  JS_E: () => import("@/markdown/JS/1.types/E.md"),
  JS_F: () => import("@/markdown/JS/1.types/F.md"),
}
```

先记录一下，之后有更好的方法会更新。