
//全局作用域
// var n = 999;

// function f1() {
//     console.log(n);
// }
// f1() // 999




//函数作用域
// function f1() {
//     var n = 999;
// }

// console.log(n)
//Uncaught ReferenceError: n is not defined(


// function f1() {
//     var n = 999;
//     function f2() {
//         console.log(n); // 999
//     }
//     f2();
// }
// f1();


// 作用域-->闭包
// function f1() {
//     var n = 999;
//     function f2() {
//         console.log(n);
//     }
//     return f2;
// }

// var result = f1();
// result(); // 999




// 闭包特点
// function createIncrementor(start) {
//     var clo = function () {
//         return start++;
//     }
//     return clo;
// }

// var inc = createIncrementor(5);

// console.log(inc()) // 5
// console.log(inc()) // 6
// console.log(inc()) // 7




//私有属性和私有方法
// var makeCounter = function() {

//     //私有属性，不能通过对象直接访问
//     var privateCounter = 0;
//     //私有方法，只能被同一个类中的其它方法所调用。
//     function changeBy(val) {
//         privateCounter += val;
//     }

//     return {
//         increment: function() {
//             changeBy(1);
//         },
//         decrement: function() {
//             changeBy(-1);
//         },
//         value: function() {
//             return privateCounter;
//         }
//     }  
// };

// var Counter1 = makeCounter();
// console.log(Counter1.value()); /* logs 0 */
// Counter1.increment();
// Counter1.increment();
// console.log(Counter1.value()); /* logs 2 */
// Counter1.decrement();
// console.log(Counter1.value()); /* logs 1 */
// console.log(Counter1.privateCounter); 
// undefined
// Counter1.changeBy(1); 
// Uncaught TypeError: Counter1.changeBy is not a function



// 柯里化

// var adder = function(num,y){
//     return num + y;
// }
// console.log(adder(1,99));
// console.log(adder(-1,101));

// var adder = function (num) {
//     return function (y) {
//         return num + y;
//     }
// }
// var inc = adder(1);
// var dec = adder(-1);

// console.log(inc(99));//100
// console.log(dec(101));//100
// console.log(adder(100)(2));//102
// console.log(adder(2)(100));//102



// 模拟块级作用域

// function outputNumbers(count){
//     for(var i = 0; i < count; i++){
//         console.log(i); // 0, 1, ... count - 1
//     }
//     console.log(i); // count
// }


// function outputNumbers(count){
//     (function(){
//         //块级作用域
//         for(var i = 0; i < count; i++){
//             console.log(i); // 0, 1, ... count - 1
//         }
//     })();
//     console.log(i); // error
// }


// 封装相关功能集
var getImgInPositionedDivHtml = (function () {
    var buffAr = [
        '<div id="',
        '',   //index 1, DIV ID attribute
        '" style="position:absolute;border:',
        '',   //index 3, div border
        ';top:',
        '',   //index 5, DIV top position
        'px;left:',
        '',   //index 7, DIV left position
        'px;width:',
        '',   //index 9, DIV width
        'px;height:',
        '',   //index 11, DIV height
        'px;overflow:hidden;\"><img src=\"',
        '',   //index 13, IMG url
        '\"><\/div>'
    ];
    return function (url, border,id, width, height, top, left) {
        buffAr[1] = id;
        buffAr[3] = border;
        buffAr[5] = top;
        buffAr[7] = left;
        buffAr[9] = width;
        buffAr[11] = height;
        buffAr[13] = url;
        return buffAr.join('');
    };
})();

var div=document.createElement("div");
div.innerHTML = getImgInPositionedDivHtml('https://www.baidu.com/img/baidu_jgylogo3.gif','1px red solid','baidu',500,300,100,100);
document.body.appendChild(div);

var div=document.createElement("div");
div.innerHTML = getImgInPositionedDivHtml('https://www.sogou.com/web/index/images/logo_440x140.v.4.png','1px green solid','baidu',400,200,500,100);
document.body.appendChild(div);

// 防抖
// function debounce(fn, delay) {
//     delay = delay || 200;
//     var timer = null;

//     return function() {
//         var arg = arguments;
//         // 每次操作时，清除上次的定时器
//         clearTimeout(timer);
//         timer = null;
//         // 定义新的定时器，一段时间后进行操作
//         timer = setTimeout(function() {
//             fn.apply(this, arg);
//         }, delay);
//     }
// };

// window.onscroll = debounce(function(e) {
//     console.log("确实停了"); // scroll
// }, 500);


// 节流
// 函数节流，频繁操作中间隔 delay 的时间才处理一次
// function throttle(fn, delay) {
//     delay = delay || 500;
//     // 每次滚动初始的标识
//     var timestamp = 0;
//     return function() {
//         var arg = arguments;
//         var now = Date.now();
//         // 设置开始时间
//         if (timestamp === 0) {
//             timestamp = now;
//         }
//         // 已经到了delay的一段时间，进行处理
//         if (now - timestamp >= delay) {
//             fn.apply(this, arg);
//             timestamp = now;
//         }
//     }
// };

// var count = 0;
// window.onscroll = throttle(function(e) {
//     console.log(e.type, ++count); // scroll
// }, 500);


// 分时函数
/**
 * 分时函数
 * @param {*} argsAry 列表
 * @param {*} fn 渲染列表项的函数
 * @param {*} count 每次加载条数
 */
// var timeChunk = function(argsAry, fn, count) {
//     var interval;
//     //取出count数量的好友列表项并渲染
//     var exec = function() {
//         var l = argsAry.length;
//         for (var i = 0; i < Math.min(count || 1, l); i++) {
//             var arg = argsAry.shift();
//             fn(arg);
//         }
//     }

//     return function() {
//         interval = setInterval(function() {
//             var flag = exec();
//             if (argsAry.length === 0) {
//                 clearInterval(interval);
//                 interval = null;
//             }
//         }, 1000);
//     }
// };

// var a = [];

// // 模拟QQ好友列表
// for (var i = 0; i < 36; i++) {
//     a.push(i);
// }

// var func = timeChunk(a, function(i) {
//     //模拟渲染列表项
//     console.log(i);
// }, 10);
// func();

// var timeChunk = function(argsAry, fn, count) {
//     var interval;
//     var exec = function() {
//         ......
//         // 取出count数量的好友并逐条调用fn渲染
//     }

//     return function() {
//         interval = setInterval(function() {
//             exec();
//             if (argsAry.length === 0) {
//                 clearInterval(interval);
//                 interval = null;
//             }
//         }, 1000);
//     }
// };

// // 好友列表数组
// var a = [......];
// var func = timeChunk(a, function(i) {
//     ...
//     //渲染一个好友
// }, 10);
// func();





// 非AOP方式
// var showLogin = function() {
//     console.log("打开登录浮层");
//     log(this.getAttribute('tag'));
// }

// var log = function(tag) {
//     //假设为上传数据操作
//     console.log("上传标签为:" + tag);
// }

// document.getElementById('button').onclick = showLogin;



// AOP方式
// Function.prototype.after = function (afterfn) {
//     var __self = this;
//     return function () {
//         var ret = __self.apply(this, arguments);
//         afterfn.apply(this, arguments);
//         return ret;
//     }
// }

// var showLogin = function () {
//     console.log("打开登录浮层");
// }
// var log = function () {
//     console.log("上传标签为:" + this.getAttribute('tag'));
// }

// showLogin = showLogin.after(log);
// document.getElementById('button').onclick = showLogin;



// function associateObjWithEvent(obj, methodName) {
//     return (function (e) {
//         e = e || window.event;
//         return obj[methodName](e, this);
//     });
// }

// function DhtmlObject(elementId) {
//     var el = document.getElementById(elementId);
//     if (el) {
//         el.onclick = associateObjWithEvent(this, "doOnClick");
//         el.onmouseover = associateObjWithEvent(this, "doMouseOver");
//         el.onmouseout = associateObjWithEvent(this, "doMouseOut");
//     }
// }

// DhtmlObject.prototype.doOnClick = function (event, element) {
// }
// DhtmlObject.prototype.doMouseOver = function (event, element) {
// }
// DhtmlObject.prototype.doMouseOut = function (event, element) {
// }
// document.addEventListener("DOMContentLoaded", function (event) {
//     new DhtmlObject('test');
// })

//单例
// var getSingle = function (func) {
//     var ret = null;
//     return function () {
//         if(!ret){
//             ret = func.apply(this, Array.prototype.slice.call(arguments));
//         }
//         return ret;
//     }
// }

// var getScript = getSingle(function () {
//     return document.createElement('script');
// });

// var script1 = getScript();
// var script2 = getScript();
// console.log(script1 === script2);    // 输出：true 


//在循环中创建闭包
// function outer(){
//     var funcs = [];
//     for(var i = 0;i < 5;i++){
//         funcs[i] = function (){
//             console.log(i);
//         }
//     }
//     return funcs;
// }
// var o = outer();
// o[0](); 
// o[1](); 
// o[2](); 
// o[3](); 
// o[4](); 


// 解决方案

// （1）使用更多闭包
// function makeFunction(value){
//     return function (){
//         console.log(value);
//     }
// }

// function outer(){
//     var funcs = [];
//     for(var i = 0;i < 5;i++){
//         funcs[i] = makeFunction(i);
//     }
//     return funcs;
// }



// （2）循环中变量用let声明代替var声明：
// function outer(){
//     var funcs = [];
//     for(let i = 0;i < 5;i++){
//         funcs[i] = function (){
//             console.log(i);
//         }
//     }
//     return funcs;
// }


//this对象
// var name = "The Window";

// var object = {
//     name : "My Object",
//     getNameFunc : function(){
//         console.log(this.name);
//         return function(){
//             return this.name;
//         };
//     }
// };

// alert(object.getNameFunc()());


// var name = "The Window";

// var object = {
//     name : "My Object",
//     getNameFunc : function(){
//         var that = this;
//         return function(){
//             return that.name;
//         };
//     }
// };

// alert(object.getNameFunc()());

