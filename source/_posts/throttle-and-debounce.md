title: Throttle(节流,阀门) and Debounce(去除抖动,防抖动).
date: 2015-08-10 12:00:01
---

`Throttle:节流,是阀门的意思~`
`Debounce:去除抖动,防抖动的意思~`

#### 场景一(监测滚动实现加载更多或者其他业务)
![](https://raw.githubusercontent.com/haner199401/haner199401.github.io/blog-source/images/js-no-throttle.gif)

#### 场景二(远程校验用户名是否唯一)
![](https://raw.githubusercontent.com/haner199401/haner199401.github.io/blog-source/images/js-no-debounce.gif)


<div class="tip">
    可能我们会在操作`scroll和resize`会经常遇到问题,事件触发的太快,导致函数调用频繁。因此就出现了节流函数(也就是阀门一样的功能)。
    实现原理:定时器.直白的理解就是隔一段事件去做一件事情(`Throttle:限定的时间中函数仅执行一次`)
</div>

<!-- more -->

#### Throttle
```JS
var throttle = function (action, time) {
    var startTime = new Date();

    return function () {
        var ctx = this;
        var currentTime = new Date();

        if (currentTime - startTime > time) {
            action.apply(ctx);
            startTime = currentTime;
        }
    };
};

window.addEventListener('resize', throttle(function () {
    console.log('resize event')
}, 1000));
```



#### Debounce
```JS
var debounce = function (action, time) {
    var timer;

    return function () {
        var ctx = this;
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(function () {
            action.apply(this);
        }, time);
    };
};

window.addEventListener('resize', debounce(function (){
    console.log('resize');
}, 1000));
```


#### 参考
- [https://css-tricks.com/debouncing-throttling-explained-examples/](https://css-tricks.com/debouncing-throttling-explained-examples/)
- [Throttle 与 Debounced 区别](https://css-tricks.com/the-difference-between-throttling-and-debouncing/)
- [Lodash](https://github.com/lodash/lodash/blob/master/lodash.js#L9813)
