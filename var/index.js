console.log(a);
var a = 1;

x = 1; x = 3;

console.log(Number(null));
console.log(Number(undefined));
console.log(5 + null);
console.log(5 + undefined);

console.log((function () { /*
    line 1
    line 2
    line 3
    */}).toString());

console.log((function () { /*
    line 1
    line 2
    line 3
    */}).toString().split('\n').slice(1, -1).join('\n'));

var o1 = {};
var o2 = o1;
var o3 = { name: 'wsf' }

o1 = o3;
console.log(o2); // {}

console.log(eval('{foo: 123}')) // 123
console.log(eval('({foo: 123})')) // {foo: 123}

var foo = 'bar';

var obj = {
    p: 'Hello World',
    bar: 2,
    'hello world': 3,
    6: 'num_key',
    0.7: 'Hello World',
    123: 'hello 123'
};
console.log(Object.keys(obj));

f();

function f() {
    console.log("函数声明提升");
}

var arr = [];
// arr[1] = undefined;
arr[100] = 'a';

console.log(100 in arr);
console.log(1 in arr);
console.log(arr[1]);
console.log(arr.length);


var x = [2, 3, 4, 5];
console.log(x.valueOf());
console.log(x.valueOf().toString());
console.log(x);

console.log(7 + null);
console.log(7 + undefined);
console.log(7 + NaN);

console.log("");


var obj = {
    a: 1,
    b: 2,
    c: 3,
    func() {
        console.log("func");
    },
    get d() {
        return 4;
    }

};
for (var i in obj) {
    console.log('键名：', i);
    console.log('键值：', obj[i]);
}

var a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
a.splice(4, 2, 1, 2) // ["e", "f"]
console.log(a);




function Fubar(foo, bar) {
    'use strict';
}

Fubar()

function Person(name, age) {
    this.name = name;
    this.age = age;
}

function _new(/* 构造函数 */ constructor, /* 构造函数参数 */ params) {
    // 将 arguments 对象转为数组
    var args = [].slice.call(arguments);
    // 取出构造函数
    var constructor = args.shift();
    // 创建一个空对象，继承构造函数的 prototype 属性
    var context = Object.create(constructor.prototype);
    // 执行构造函数
    var result = constructor.apply(context, args);
    // 如果返回结果是对象，就直接返回，否则返回 context 对象
    return (typeof result === 'object' && result != null) ? result : context;
}

function _new(/* 构造函数 */ constructor, /* 构造函数参数 */ params) {
    // 将 arguments 对象转为数组
    var args = [].slice.call(arguments);
    // 取出构造函数
    args.shift();
    // 创建一个空对象，继承构造函数的 prototype 属性
    var context = Object.create(constructor.prototype);
    // 执行构造函数
    var result = constructor.apply(context, args);
    // 如果返回结果是对象，就直接返回，否则返回 context 对象
    return (typeof result === 'object' && result != null) ? result : context;
}


// 实例
var actor = _new(Person, '张三', 28);
console.log(actor);

const rawObject = {
    name: "lucy",
    age: "13",
    subjects: [
        {
            subject: "math",
            teacher: "jim",
            scores: {
                mid: 95,
                final: 92,
            }
        }, {
            subject: "english",
            teacher: "mike",
            scores: {
                mid: 82,
                final: 87,
            }
        }, {
            subject: "physics",
            teacher: "denny",
            scores: {
                mid: 88,
                final: 91,
            }
        }
    ]
}

// 实现deepClone()方法
const deepClone = (rawObject) => {

    let obj = {};
    for (key of Object.keys(rawObject)) {

        if (typeof rawObject[key] === 'object') {
            if (rawObject[key] instanceof Array) {
                obj[key] = rawObject[key].map((value) => deepClone(value));
            } else {
                obj[key] = deepClone(rawObject[key]);
            }

        } else {
            obj[key] = rawObject[key];
        }
    }
    return obj;
}

var obj = deepClone(rawObject);
console.log(obj);
rawObject.subjects[1].subject = '语文';
console.log(rawObject);
console.log(obj);

function StringBuilder() {
    var buffer = [1];

    this.add = function (str) {
        buffer.push(str);
    };

    this.toString = function () {
        return buffer.join('');
    };

}
class Foo {
    constructor() {
        return Object.create(null);
    }
}
var sb = new StringBuilder();
console.log(sb.buffer);

var name = "The Window";

var object = {
    name: "My Object",

    getNameFunc: function () {
        var name = "hehehe";
        return function () {
            return name;
        };

    }

};

console.log(object.getNameFunc()());

console.log("-----------------");

function createIncrementor(start) {
    var clo = function () {
        return start++;
    }
    return clo;
}

var inc = createIncrementor(5);

console.log(inc());
console.log(inc());
console.log(inc());
console.log(inc());
console.log(inc());

console.log("-----------------");

function outer1() {
    var funcs = [];
    for (var i = 0; i < 5; i++) {
        funcs[i] = function () {
            console.log(i);
        }
    }
    return funcs;
}
var o1 = outer1();
o1[0](); // 5
o1[1](); // 5
o1[2](); // 5
o1[3](); // 5
o1[4](); // 5

console.log("-----------------");

function outer2() {
    var funcs = [];
    for (let i = 0; i < 5; i++) {
        funcs[i] = function () {
            console.log(i);
        }
    }
    return funcs;
}
var o2 = outer2();
o2[0](); // 0
o2[1](); // 1
o2[2](); // 2
o2[3](); // 3
o2[4](); // 4

console.log("-----------------");

function makeFunction(value) {
    return function () {
        console.log(value);
    }
}

function outer3() {
    var funcs = [];
    for (var i = 0; i < 5; i++) {
        funcs[i] = makeFunction(i);
    }
    return funcs;
}
var o3 = outer3();
o3[0](); // 5
o3[1](); // 5
o3[2](); // 5
o3[3](); // 5
o3[4](); // 5

console.log("-----------------");

function outer4() {

    var funcs = [];

    for (var i = 0; i < 5; i++) {
        (function (value) {
            funcs[i] = function () {
                console.log(value);
            }
        })(i);
    }

    return funcs;
}
var o4 = outer4();
o4[0](); // 5
o4[1](); // 5
o4[2](); // 5
o4[3](); // 5
o4[4](); // 5




