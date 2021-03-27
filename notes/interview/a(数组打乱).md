### JS打乱数组的三种方式
**1. 利用sort排序方式打乱数组**
```javascript
var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
var randomNumber = function(){
	  // randomNumber(a,b) 返回的值大于 0 ，则 b 在 a 的前边；
      // randomNumber(a,b) 返回的值等于 0 ，则a 、b 位置保持不变；
      // randomNumber(a,b) 返回的值小于 0 ，则 a 在 b 的前边。
      return 0.5 - Math.random()
    }
arr.sort(randomNumber)
```

**2. 利用for循环向另一个数组里面随机丢数据**
```javascript
var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
for(var i=arr.length+1;i>0;){
  i--
  var rdm = Math.floor(Math.random()*arr.length)
  if(!newArr.includes(arr[rdm])){
    newArr.push(arr[rdm])
  }else{
    if(newArr.length == arr.length){
      break;
    }
    i++
  }
  console.log(newArr)
}
```

**3. 利用for循环将数组里面抽取一个随机项，然后将这一项push到数组的最后面，在将原来相同的那一项删除掉**
```javascript
var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
for(var i=0;i<arr.length+10;i++){
	var rdm = Math.floor(Math.random()*arr.length)
	arr.push(arr[rdm])
	arr.splice(rdm,1)
}
```