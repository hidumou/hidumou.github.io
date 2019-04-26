title: JavaScript 笔记(一)
date: 2017-06-28 11:05:22
from: http://www.cnblogs.com/TomXu/archive/2011/12/15/2288411.html
---

![](https://raw.githubusercontent.com/haner199401/haner199401.github.io/develop/images/25916dad435a80a3a42083d26725ca31.jpeg)
<!--more-->

#### 题目一
```js

    if (!("a" in window)) {
        var a = 1;
    }
    alert(a);

```
*** 解析： ***

* 变量声明 --> 变量赋值
* 变量移动到作用域的顶部
* 执行上下文 --> 创建 VO(Variable Object) --> 执行代码

        
*** 实际JavaScript引擎拆分后的代码 ***
     
```js
    VO:
    (global) = {
        a:undefined
    }

    var a;

    if(!('a' in window)){
        a = 1;
    }
    alert(a);

```
    

#### 题目二
``` js

    var a = 1,
        b = function a(x) {
            x && a(--x);
        };
    alert(a);

```

#### 题目三
``` js

   function a(x) {
       return x * 2;
   }
   var a;
   alert(a);

```


#### 题目四
``` js

    function b(x, y, a) {
        arguments[2] = 10;
        alert(a);
    }
    b(1, 2, 3);

```

#### 题目五
``` js

    function a() {
        alert(this);
    }
    a.call(null);

```
