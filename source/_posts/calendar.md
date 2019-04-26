title: Calendar
date: 2016-08-22 15:12:26
---

![](https://raw.githubusercontent.com/haner199401/haner199401.github.io/develop/images/my-calendar.gif)
<!--more-->

#### IE中的问题
* IE 事件源兼容
* IE new Date() BUG
* IE dom.innerHTML = ''; BUG
```js
removeAllChild:function (ele) {
        while (ele.hasChildNodes()){
            ele.removeChild(ele.lastChild);
        }
    }
```

#### 我的思路
* 先把页面基本样子做出来（可以看到我源码里面 index.html 中注释掉的dom结构）
* 之后想各个月有什么不同？看下电脑上的日历，点点
* 每个月的第一天会变，之后的日期当然是依次排列。
* 确定一个月的第一天处于礼拜几？这样就能够渲染出一个月来。
* 接下里想一想，上一个月和下一个月 在可视的格子上 是否足够显示? 可以显示几天呢？
* 方式一：计算出当前显示的月份有多少行 row * col = 总数，已知总数，已知当前月显示在礼拜几（第一行的第几个呗）这样也就能够计算出上一月能够显示几天喽，下一个同理。
* 方式二：行数固定，按照方式一计算就行了。
* Core：[前一个月].concat([当前月],[下一个月]) 

#### [源码](https://github.com/haner199401/calendar)