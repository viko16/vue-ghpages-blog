## 这是啥

`querySelectorAll` 相当好用，在新版的现代浏览器中，完全可以抵消我对 jQuery 核心函数的依赖，也不用忍受逐个 `getElementByXXX` 的麻烦，是一个很好的 WebApps API。

然而它并不完美，在我看来它最大的麻烦点在于返回的是 [NodeList](https://developer.mozilla.org/zh-cn/DOM/NodeList) 而不是 Array，也就不能使用 `forEach` 或者 `map` 什么的。



## 解决方案

es5 的时候一般这样写：

``` javascript
var divList = document.querySelectorAll('div'); // 返回 NodeList
var divArray = Array.prototype.slice.call(divList); // 将 NodeList 转换为数组
```

或者只是要遍历的话：

``` javascript
[].forEach.call(document.querySelectorAll('div'), function (item) {
  console.log(item)
})
```



要是用上了 es6 可以这样写：

``` javascript
let divList = Array.from(document.querySelectorAll('div'));  // 转为真正的数组
divList.forEach(el => console.log(el));

// Array.from 还能有第二个参数，作用类似于 $().map(fn)
```

或者只是要遍历的话：

``` javascript
let divList = document.querySelectorAll('div');
for (let item of divList) { // 注意别用了 for...in 哦
  console.log(item)
}
```

更夸张的话：

``` javascript
let divList = [...document.querySelectorAll('div')]  // 扩展运算符
```



## 参考

https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches/

https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList

https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelectorAll
