//封装一个自己定义的jQuery函数
;
(function () {
    //定义一个函数，然后在用window.$符来提升函数的作用范围
    function jQuery(selector) {
        return new Init(selector);
    }
    //把jQuery函数变成window的一个属性，在外面也可以使用
    window.$ = window.jQuery = jQuery;
    //声明一个自定义构造函数，让它具备jQuery的选择器功能
    function Init(selector) {
        //声明一个NodeList伪数组的实例对象来存放我们通过选择器拿到的数据
        let nodeList = document.querySelectorAll(selector);
        //把我们拿到的数据通过循环的方式取出来，存放到每次调用jQuery()方法的实例对象的身上
        for (let i = 0; i < nodeList.length; i++) {
            //this指向每次生成对象的时候的实例对象，把我们伪数组里的数据存放在实例对象的身上
            this[i] = nodeList[i];
        }
        //赋予数组长度
        this.length = nodeList.length;
    }
    //定义给构造函数的原型一个修改CSS样式的方法
    Init.prototype.css = function (property, value) {
        //判断有没有输入第二个值，如果没有的话就算获取元素，如果有就是设置元素
        if (value == undefined) {
            //返回这个属性值
            return window.getComputedStyle(this[0])[property];
        } else {
            //遍历伪数组，给每一项都设置属性
            for (let i = 0; i < this.length; i++) {
                //判断输入的是否是数字，如果是的话加个单位
                if (typeof (value) === 'number') {
                    this[i].style[property] = value + 'px';
                } else {
                    this[i].style[property] = value
                }
            }
            return this;
        }
    }
    //定义一个函数去遍历数组
    Init.prototype.each = function (callback) {
        //遍历整个数组
        for (let i = 0; i < this.length; i++) {
            //在每次进入数组的时候用当前的元素和索引去调用一次回调函数，实现遍历
            callback(i, this[i]);
        }
    }
    //实现操作类名，添加/移除/切换
    Init.prototype.addClass = function (className) {
        //遍历当前这个伪数组实例对象，把添加类名方法封装
        this.each(function (i, e) {
            //在每项dom元素调用类名里的添加方法，封装起来
            e.classList.add(className);
        })
        //返回这个调用的实例对象，使得链式编程可以继续
        return this;
    }
    Init.prototype.removeClass = function (className) {
        //遍历当前这个伪数组实例对象，把移除类名方法封装
        this.each(function (i, e) {
            //在每项dom元素调用类名里的移除方法，封装起来
            e.classList.remove(className);
        })
        //返回这个调用的实例对象，使得链式编程可以继续
        return this;
    }
    Init.prototype.toggleClass = function (className) {
        //遍历当前这个伪数组实例对象，把切换类名方法封装
        this.each(function (i, e) {
            //在每项dom元素调用类名里的切换方法，封装起来
            e.classList.toggle(className);
        })
        //返回这个调用的实例对象，使得链式编程可以继续
        return this;
    }



})()