最近写项目过程中遇到一个CSS盒子模型中外边距（margin）折叠的情况，搞得我焦头烂额，之后再网上查阅了大量的资料，现做一个整理和总结，方便以后忘记的时候查阅，同时也供广大网友参考。如有错误或者总结方面不全的地方，欢饮广大网友指出。

外边距折叠的概念：所谓外边距折叠就是相邻的两个或多个元素（含有子元素的情况）的外边距会在垂直方向上合并成一个一个外边距。

CSS盒子模型中外边距（margin）折叠的常见情形有如下2种：

情况1、无子元素的相邻兄弟元素
触发margin折叠的条件：两个元素之间没有被其他非空元素隔开时触发外边距折叠。

情形说明：
1）如果两个元素的margin均为正值，则两个元素之间的margin=max(margin1,margin2)；
附图说明：
![](https://image-static.segmentfault.com/882/839/882839833-5985d23b51586_articlex)

clipboard.png
2）如两个元素的margin负值，则两者之间的margin=min(margin1,magin2)，如图2 所示;
附图说明：
![](https://image-static.segmentfault.com/258/482/2584827317-5985d75363a08_articlex)

clipboard.png
3）如果两个元素中有margin为正值，有一个为负值，则两者之间的margin=margin1+margin2，如图三中所示margin=-50px+25px=-25px;
![](https://image-static.segmentfault.com/189/468/1894687681-5985d80b94bae_articlex)

情况2、子元素与父元素发生外边距折叠
触发条件：父元素无外边框(border)、无内边距(padding)，且父元素与子元素之间无非空元素或文本信息时（子元素上边与父元素上边之间无非空元素文本信息，子元素下边与父元素下边之间可可以有非空元素和文本信息），折叠的基线为父元素最上的边或最下的边。
情形说明：
1）若父元素与子元素的margin值均为正，则折叠后的margin=max(margin1,margin2)，如图四所示。
附图说明：
![](https://image-static.segmentfault.com/207/309/2073092186-5985e07b0a4f3_articlex)

clipboard.png
2）若父元素与子元素的margin值均为负，则折叠后的margin=min(margin1,margin2)，如图五所示。
![](https://image-static.segmentfault.com/178/808/1788087336-5985e24b516ed_articlex)

3）若父元素与子元素的margin其中有一个为正值，一个为负值，则折叠后的margin=minmargin1+margin2，如图六所示。
![](https://image-static.segmentfault.com/293/110/2931109779-598684b4d9f38_articlex)