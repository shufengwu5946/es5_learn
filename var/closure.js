
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
// Uncaught ReferenceError: n is not defined(




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
// var Counter2 = makeCounter();
// console.log(Counter1.value()); /* logs 0 */
// Counter1.increment();
// Counter1.increment();
// console.log(Counter1.value()); /* logs 2 */
// Counter1.decrement();
// console.log(Counter1.value()); /* logs 1 */
// console.log(Counter2.value()); /* logs 0 */
// console.log(Counter1.privateCounter); // undefined
// Counter1.changeBy(1); // Uncaught TypeError: Counter1.changeBy is not a function



// 柯里化

// var adder = function (num) {
//     return function (y) {
//         return num + y;
//     }
// }
// var inc = adder(1);
// var dec = adder(-1)

// console.log(inc(99));//100
// console.log(dec(101));//100
// console.log(adder(100)(2));//102
// console.log(adder(2)(100));//102


// setTimeOut 传参
// function callLater(paramA, paramB, paramC) {
//     return (function () {
//         paramA[paramB] = paramC;
//     });
// }

// var funcRef = callLater(elStyle, "display", "none");
// hideMenu = setTimeout(funcRef, 500);



// 封装相关功能集
// var getImgInPositionedDivHtml = (function () {

//     var buffAr = [
//         '<div id="',
//         '',   //index 1, DIV ID attribute
//         '" style="position:absolute;border:',
//         '',   //index 3, div border
//         ';top:',
//         '',   //index 5, DIV top position
//         'px;left:',
//         '',   //index 7, DIV left position
//         'px;width:',
//         '',   //index 9, DIV width
//         'px;height:',
//         '',   //index 11, DIV height
//         'px;overflow:hidden;\"><img src=\"',
//         '',   //index 13, IMG URL
//         '\" width=\"',
//         '',   //index 15, IMG width
//         '\" height=\"',
//         '',   //index 17, IMG height
//         '\" alt=\"',
//         '',   //index 19, IMG alt text
//         '\"><\/div>'
//     ];

//     return function (url, border,id, width, height, top, left, altText) {

//         buffAr[1] = id;
//         buffAr[3] = border;
//         buffAr[5] = top;
//         buffAr[7] = left;
//         buffAr[15] = (buffAr[9] = width);
//         buffAr[17] = (buffAr[11] = height);
//         buffAr[13] = url;
//         buffAr[19] = altText;

//         return buffAr.join('');
//     };
// })();

// var div=document.createElement("div");
// div.innerHTML = getImgInPositionedDivHtml('https://www.baidu.com/img/baidu_jgylogo3.gif','1px black solid','baidu',500,300,100,100,'百度');
// document.body.appendChild(div);

// var div=document.createElement("div");
// div.innerHTML = getImgInPositionedDivHtml('https://www.sogou.com/web/index/images/logo_440x140.v.4.png','1px black solid','baidu',400,200,500,100,'搜狗');
// document.body.appendChild(div);

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

// var count = 0;

// window.onscroll = debounce(function(e) {
//     console.log(e.type, ++count); // scroll
// }, 500);


// 节流
// 函数节流，频繁操作中间隔 delay 的时间才处理一次
// function throttle(fn, delay) {
//     delay = delay || 200;

//     var timer = null;
//     // 每次滚动初始的标识
//     var timestamp = 0;

//     return function() {
//         var arg = arguments;
//         var now = Date.now();

//         // 设置开始时间
//         if (timestamp === 0) {
//             timestamp = now;
//         }

//         clearTimeout(timer);
//         timer = null;

//         // 已经到了delay的一段时间，进行处理
//         if (now - timestamp >= delay) {
//             fn.apply(this, arg);
//             timestamp = now;
//         }
//         // 添加定时器，确保最后一次的操作也能处理
//         else {
//             timer = setTimeout(function() {
//                 fn.apply(this, arg);
//                 // 恢复标识
//                 timestamp = 0;
//             }, delay);
//         }
//     }
// };

// var count = 0;

// window.onscroll = throttle(function(e) {
//     console.log(e.type, ++count); // scroll
// }, 500);



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



// 非AOP方式
// var showLogin = function() {
//     console.log("打开登录浮层");
//     log(this.getAttribute('tag'));
// }

// var log = function(tag) {
//     console.log("上传标签为:" + tag);
//     //(new Image).src="http://xxx.com/report?tag="+tag; //真正的上传代码略
// }

// document.getElementById('button').onclick = showLogin;



// AOP方式
// Function.prototype.after = function(afterfn) {
//     var __self = this;
//     return function() {
//         var ret = __self.apply(this, arguments);
//         afterfn.apply(this, arguments);
//         return ret;
//     }
// }

// var showLogin=function(){
//     console.log("打开登录浮层");
// }

// var log=function(){
//     console.log("上传标签为:"+this.getAttribute('tag'));
// }

// showLogin=showLogin.after(log);

// document.getElementById('button').onclick=showLogin;





//在循环中创建闭包

function outer(){
    var funcs = [];
    for(var i = 0;i < 5;i++){
        funcs[i] = function (){
            console.log(i);
        }
    }
    return funcs;
}
var o = outer();
o[0](); // 5
o[1](); // 5
o[2](); // 5
o[3](); // 5
o[4](); // 5


// 解决方案

// （1）使用更多闭包

function makeFunction(value){
    return function (){
        console.log(value);
    }
}

function outer(){
    var funcs = [];
    for(var i = 0;i < 5;i++){
        funcs[i] = makeFunction(i);
    }
    return funcs;
}



// （2）循环中变量用let声明代替var声明：


function outer(){
    var funcs = [];
    for(let i = 0;i < 5;i++){
        funcs[i] = function (){
            console.log(i);
        }
    }
    return funcs;
}

