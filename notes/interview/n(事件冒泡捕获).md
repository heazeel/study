### 事件冒泡和事件捕获

addEventListener中有三个属性，第三个属性是布尔值。
默认属性是 false为事件冒泡，true 为事件捕获

#### 事件冒泡
冒泡两字会让我联想想起泡泡，泡泡是往上飞的对吧？
或者像水中鱼儿吐泡泡一样，那个泡泡从产生的起点往上浮。

事件冒泡原理也是相同的，从下至上。

![事件冒泡](https://upload-images.jianshu.io/upload_images/9039785-5159615a49e62ce0.gif?imageMogr2/auto-orient/strip|imageView2/2/w/512/format/webp)


#### 事件捕获
![事件捕获](https://upload-images.jianshu.io/upload_images/9039785-92f2a6b20d746368.gif?imageMogr2/auto-orient/strip|imageView2/2/w/512/format/webp)