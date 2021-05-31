const { log } = console

// 1.Iterator（遍历器）的概念
// 遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
// Iterator 的作用有三个：
// 一是为各种数据结构，提供一个统一的、简便的访问接口；
// 二是使得数据结构的成员能够按某种次序排列；
// 三是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。
// Iterator 的遍历过程是这样的。
// （1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
// （2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
// （3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
// （4）不断调用指针对象的next方法，直到它指向数据结构的结束位置。
// 每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。
// 其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。
// function makeInterator(arr){
//     let nextIndex = 0
//     return {
//         next:function(){
//             return nextIndex < arr.length ?
//                 {value:arr[nextIndex++],done:false} :
//                 {value:undefined,done:true}
//         }
//     }
// }
// let it = makeInterator([1,2,3])
// log(it.next()) //{ value: 1, done: false }
// log(it.next()) //{ value: 2, done: false }
// log(it.next()) //{ value: 3, done: false }
// log(it.next()) //{ value: undefined, done: true }


// 2.默认 Iterator 接口
// ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）。
// 原生具备 Iterator 接口的数据结构如下。
// Array
// Map
// Set
// String
// LikeArray
// 函数的 arguments 对象
// NodeList 对象

// 为对象添加 Iterator 接口的例子。
// let obj = {
//     data:['a','b'],
//     [Symbol.iterator](){
//         let self = this
//         let index = 0
//         return {
//             next: function(){
//                 return index<self.data.length ?
//                     { value: self.data[index++],done:false }:
//                     { value: undefined,done:true}
//             }
//         }
//     }
// }
// let it = obj[Symbol.iterator]()
// log(it.next())  //{ value: 'a', done: false }
// log(it.next())  //{ value: 'b', done: false }
// log(it.next())  //{ value: undefined, done: true }

// 对于类似数组的对象（存在数值键名和length属性），部署 Iterator 接口，有一个简便方法，就是Symbol.iterator方法直接引用数组的 Iterator 接口。
// NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];



// 3.调用 Iterator 接口的场合
// 1）解构赋值
// 对数组和 Set 结构进行解构赋值时，会默认调用Symbol.iterator方法。
// let [x,y] = new Set([1,2])
// log(x,y) //1   2
// 2）扩展运算符
// 扩展运算符（...）也会调用默认的 Iterator 接口。
// 3）yield*
// yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。
// let generator = function* () {
//   yield 1;
//   yield* [2,3,4];
//   yield 5;
// };
// var iterator = generator();
// iterator.next() // { value: 1, done: false }
// iterator.next() // { value: 2, done: false }
// iterator.next() // { value: 3, done: false }
// iterator.next() // { value: 4, done: false }
// iterator.next() // { value: 5, done: false }
// iterator.next() // { value: undefined, done: true }
// 4）其他场合
// for-of  Array.from    Map(), Set(), WeakMap(), WeakSet()   Promise.all()  Promise.race()




// for...of 循环
// for...of循环内部调用的是数据结构的Symbol.iterator方法。