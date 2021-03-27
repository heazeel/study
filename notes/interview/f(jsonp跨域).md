## jsonp实现跨域请求

当点击"跨域获取数据"的按钮时，添加一个`<script>`标签，用于发起跨域请求；注意看请求地址后面带了一个callback=showData的参数；

showData即是回调函数名称，传到后台，用于包裹数据。数据返回到前端后，就是showData(result)的形式，因为是script脚本，所以自动调用showData函数，而result就是showData的参数。

至此，我们算是跨域把数据请求回来了，但是比较麻烦，需要自己写脚本发起请求，然后写个回调函数处理数据，不是很方便。

```html
<html>
<head>
    <title>跨域测试</title>
    <script src="js/jquery-1.7.2.js"></script>
    <script>
        //回调函数
        function showData (result) {
            var data = JSON.stringify(result); //json对象转成字符串
            $("#text").val(data);
        }

        $(document).ready(function () {

            $("#btn").click(function () {
                //向头部输入一个脚本，该脚本发起一个跨域请求
                $("head").append("<script src='http://localhost:9090/student?callback=showData'><\/script>");
            });

        });
    </script>
</head>
<body>
    <input id="btn" type="button" value="跨域获取数据" />
    <textarea id="text" style="width: 400px; height: 100px;"></textarea>

</body>
</html>
```

```java
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    response.setCharacterEncoding("UTF-8");
    response.setContentType("text/html;charset=UTF-8");

    //数据
    List<Student> studentList = getStudentList();


    JSONArray jsonArray = JSONArray.fromObject(studentList);
    String result = jsonArray.toString();

    //前端传过来的回调函数名称
    String callback = request.getParameter("callback");
    //用回调函数名称包裹返回数据，这样，返回数据就作为回调函数的参数传回去了
    result = callback + "(" + result + ")";

    response.getWriter().write(result);
}
```