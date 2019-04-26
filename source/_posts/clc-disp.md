title: 乘法口诀表打印
date: 2017-07-14 09:40:31
---

![](https://raw.githubusercontent.com/haner199401/haner199401.github.io/blog-source/images/chengfakoujue.gif)
<!--more-->

``` css
    .list {
        font-size: 0;
    }
    .list .item {
        font-size: 14px;
        display: inline-block;
        text-align: center;
        width: 60px;
        padding: 2px 5px;
        line-height: 30px;
        border: 1px solid gray;
        margin: -1px -1px 0 0;
        display: none;
    }
```

```js
  (function (win) {

            var Print = function (container) {

                if (!(this instanceof Print)) {
                    return new Print();
                }

                this.cells = []; //保存 cell 数组
                this.flag = false; //控制是否倒序显示
                this.curren = 0; //当前所显示的 cell 的下标
                this.timer = null;

                this.container = document.getElementById(container) || document.body;

                /**
                 * 生成口诀dom
                 */
                function createDomArr() {
                    for (var i = 1; i <= 9; i++) {

                        var row = Print.creteEle('div');
                        row.className = 'list';
                        this.container.appendChild(row);

                        for (var j = 1; j <= i; j++) {
                            var cell = Print.creteEle('div');
                            cell.className = 'item';
                            cell.innerText = i + 'X' + j + '=' + i * j;
                            row.appendChild(cell);
                            this.cells.push(cell);
                        }

                    }
                }

                createDomArr.call(this);

            }

            Print.creteEle = function (el) {
                return document.createElement(el);
            }
            //打印速度
            Print.SPEED = 100;
            //主函数
            Print.prototype.run = function () {
                var self = this;

                if (this.curren === this.cells.length && this.flag) {
                    clearTimeout(this.timer);
                    var i = 0,
                        len = this.cells.length;
                    for (i; i < len; i++) {
                        this.cells[i].style.display = 'inline-block';
                    }
                    return;
                }
            
                if (this.curren === this.cells.length) {
                    this.curren = 0;//重置，也可以 this.curren-- 就不需要 reverse 了。
                    this.cells.reverse();//颠倒
                    this.flag = true;
                }

                this.timer = setTimeout(function () {
                    self.run();
                }, Print.SPEED);

                this.cells[this.curren++].style.display = this.flag ? 'none' : 'inline-block';
            };


            setTimeout(function () {
                Print().run();
            }, Print.SPEED);

        })(window)
        
```
