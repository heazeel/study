## GET 和 POST

### GET
&emsp;&emsp;前面的例子：api.github.com/search/users?q=JakeWharton就是一个非常典型的 **GET **请求的表现形式，即请求的数据会附在 URL 之后（放在请求行中），以 ? 分割 URL 和传输数据，多个参数用 & 连接。
除此之外，根据 HTTP 规范，GET 用于信息获取，而且应该是安全和幂等的 。
&emsp;&emsp;安全性: 指的是非修改信息，即该操作用于获取信息而非修改信息。换句话说，GET 请求一般不应产生副作用，也就是说，它仅仅是获取资源信息，就像数据库查询一样，不会修改，增加数据，不会影响资源的状态。幂等性(Idempotence): 则指的是无论调用这个URL 多少次，都不会有不同的结果的 HTTP 方法。而在实际过程中，这个规定没有那么严格。例如在一个新闻应用中，新闻站点的头版不断更新，虽然第二次请求会返回不同的一批新闻，该操作仍然被认为是安全的和幂等的，因为它总是返回当前的新闻。

&emsp;&emsp;GET 是会被浏览器主动缓存的，如果下一次传输的数据相同，那么就会返回缓存中的内容，以求更快地展示数据。
&emsp;&emsp;GET 方法的 URL 一般都具有长度限制，但是需要注意的是 HTTP 协议中并未规定 GET 请求的长度。 这个长度限制主要是由浏览器和 Web 服务器所决定的，并且各个浏览器对长度的限制也各不相同 。
GET 方法只产生一个 TCP 数据包，浏览器会把请求头和请求数据一并发送出去，服务器响应 200 ok(返回数据)。

### POST
&emsp;&emsp;根据 HTTP 规范，POST 表示可能修改变服务器上的资源的请求。例如我们在刷知乎的时候对某篇文章进行点赞，就是提交的 POST 请求，因为它改变了服务器中的数据（该篇文章的点赞数）。
&emsp;&emsp;POST 方法因为有可能修改服务器上的资源，所以它是不符合安全和幂等性的。
&emsp;&emsp;从前面关于 POST 的请求报文也可以看出，POST 是将请求信息放置在请求数据中的，这也是 POST 和 GET 的一点不那么重要的区别。有一些博客的说法是 GET 请求的请求信息是放置在 URL 的而 POST 是放置在请求数据中的所以 POST 比 GET 更安全。其实这种说法很有问题，随便抓下包 POST 中的请求报文就暴露无疑了，这又何来安全之说？

&emsp;&emsp;因为 POST 方法的请求信息是放置在请求数据中的，所以它的请求信息是没有长度限制的。
&emsp;&emsp;POST 方法会产生两个 TCP 数据包，浏览器会先将请求头发送给服务器，待服务器响应100 continue，浏览器再发送请求数据，服务器响应200 ok(返回数据)。这么看起来 GET 请求的传输会比 POST 快上一些（因为GET 方法只发送一个 TCP 数据包），但是实际上在网络良好的情况下它们的传输速度基本相同。