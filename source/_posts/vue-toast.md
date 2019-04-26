title: 'Vue Toast'
date: 2016-07-08 16:49:01
tags:
---

![](https://raw.githubusercontent.com/haner199401/haner199401.github.io/blog-source/images/vue-toast-demo.gif)

<!--more-->

** Step By Step **

> 环境搭建`建议找个手脚架或者Github上的模板`  [模板](https://github.com/haner199401/CNode-Vue) [Yeoman](http://yeoman.io/) [Cooking](http://elemefe.github.io/cooking/) ...
1. 安装Node环境
2. 安装依赖包[npm](https://www.npmjs.com/),[cnpm](https://npm.taobao.org/),[vue](http://cn.vuejs.org/),[babel](https://babeljs.io/) ...
3. 运行代码,走你 ~_~

Toast.vue
```html

<template>
    <div class="msg-tip" transition="sliderDown">{{message}}</div>
</template>
<style>

.sliderDown-transition {
  transition: all .3s ease;
  top:0;
}

.sliderDown-enter, .sliderDown-leave {
  top:-100px;
}

.msg-tip{
  border: 1px solid #fdc;
  background-color: #ffeee6;
  position: fixed;
  width: 100%;
  padding:16px;
  color: #666;
  font-size: 12px;
  overflow: hidden;
  line-height: 16px;
  text-align: center;
}
</style>
<script type="text/ecmascript-6">
    export default{
        props:{
            message:{
                type:String,
                default:''
            }
        }
    }
</script>
```
#### 如何实现单例调用
>想一想不用VUE咋整?

```JS
    let Toast = function(msg){
    
        function getDivEle(){
            let oDiv = document.createElement('div');
                oDiv.innerText = msg || '';
                oDiv.timer = setTimeout(()=>{
                    if(oDiv.timer) oDiv.timer = null;
                    oDiv.remove();
                },2000);
                return oDiv;
        }
        
        //append dom
        document.body.appendChild(getDivEle());
      
    }
```

> VUE 文件中的 export default 干了什么？
1. 在vue文件中export default 会默认导出一个对象字面量
2. vue-loader进行加载(loader会构造一个组件，之后便可以实例化出该组件)
3. 所以在 vue 中,多次引用组件就会出现重复的dom结构

#### 完整代码

```JS
    import Vue from 'vue';
    import Toast_ from './Toast.vue';
    const Toast = Vue.extend(Toast_);
    
    //保存实例池
    let instancePool = [];
    
    //获取实例
    let getAnInstance = function() {
        //避免实例过多,有点单例么..
        if (instancePool.length > 0) {
            let instance = instancePool[0];
            instancePool = [];
            return instance;
        }
        return new Toast({
            el: document.createElement('div')
        });
    };
    
    //保存实例
    let saveInstance = function(instance) {
        if (instance) {
            instancePool.push(instance);
        }
    };
    
    //导出方法
    export default function (options){
        options = options || {};
        let message;
        if (typeof options === 'string') {
            message = options;
        }else{
             message = options.message;
        }
        
        //获取实例对象
        let instance = getAnInstance();
        instance.message = message;
        
        //调用nextTick确保dom结构加载完。
        Vue.nextTick(function() {
            //添加
            instance.$appendTo(document.body);
            //绑定定时器索引
            instance.timer = setTimeout(function() {
              //保存实例,再次调用。
              saveInstance(instance);
                //移除定时器
              if(instance.timer){
                  clearTimeout(instance.timer);
              }
              //移除dom
              instance.$remove();
            }, 2000);
        });
    
    }
```

#### O(∩_∩)O~


