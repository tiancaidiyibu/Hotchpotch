const { log } = console


// Generator 函数有多种理解角度。语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。
// 执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。
// function* fn(){
//     yield 'a'
//     yield 'b'
//     return 'c'
// }
// let it = fn()
// 然后，Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。
// 不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的遍历器指针对象（Iterator Object）。
// log(it.next()) //{ value: 'a', done: false }
// log(it.next()) //{ value: 'b', done: false }
// log(it.next()) //{ value: 'c', done: true }
// log(it.next()) //{ value: undefined, done: true }
// 总结一下，调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。
// value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。

// 遍历器对象的next方法的运行逻辑如下。
// （1）遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。
// （2）下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式。
// （3）如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。
// （4）如果该函数没有return语句，则返回的对象的value属性值为undefined。
// 需要注意的是，yield表达式后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行，因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。
// 需要注意的是，yield可以多次执行，而return只能执行一次,执行完毕后不再执行，done变成true
// function * gen(){
//     yield 1+2
//     yield 4
//     return 5
//     return 6
// }
// let it = gen()
// log(it.next())  //{ value: 3, done: false } 只有调用了next才会去求值
// log(it.next()) //{ value: 4, done: false }
// log(it.next()) //{ value: 5, done: true }
// log(it.next()) //{ value: undefined, done: true }

// 需要注意，yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。
// function * gen(){
//     (function(){
//         yield 3 //error
//     })()
// }

// 模拟数组拉平
// var arr = [1, [[2, 3], 4], [5, 6]];
// const flat = function *(array){
//     for (let i = 0; i < array.length; i++) {
//         if(typeof array[i] !== 'number'){
//             yield* flat(array[i])
//         }else{
//             yield array[i]
//         }
//     }
// }
// for (const f of flat(arr)) {
//     console.log(f) //// 1, 2, 3, 4, 5, 6
// }

// 另外，yield表达式如果用在另一个表达式之中，必须放在圆括号里面。
// function* demo() {
//     console.log('Hello' + yield); // SyntaxError
//     console.log('Hello' + yield 123); // SyntaxError
//     console.log('Hello' + (yield)); // OK
//     console.log('Hello' + (yield 123)); // OK
// }

// yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。
// function * foo(x){
//     var y = 2 * (yield (x + 1));
//     var z = yield (y / 3);
//     return (x + y + z);
// }
// var a = foo(5);
// a.next() // Object{value:6, done:false}
// a.next() // Object{value:NaN, done:false}
// a.next() // Object{value:NaN, done:true}
// var b = foo(5);
// b.next() // { value:6, done:false }
// b.next(12) // { value:8, done:false }
// b.next(13) // { value:42, done:true }
// 注意，由于next方法的参数表示上一个yield表达式的返回值，所以在第一次使用next方法时，传递参数是无效的。
// V8 引擎直接忽略第一次使用next方法时的参数，只有从第二次使用next方法开始，参数才是有效的。从语义上讲，第一个next方法用来启动遍历器对象，所以不用带有参数。

// 利用for...of循环，可以写出遍历任意对象（object）的方法。原生的 JavaScript 对象没有遍历接口，无法使用for...of循环，通过 Generator 函数为它加上这个接口，就可以用了。
// function *IteratorObj(){
//     let propKeys = Object.keys(this)
//     for (const propKey of propKeys) {
//         yield [ propKey, this[propKey] ]
//     }
// }
// let jane = { first: 'Jane', last: 'Doe' };
// jane[Symbol.iterator] = IteratorObj
// for (const [ key, value ] of jane ) {
//     log(`${key}:${value}`)  //first:Jane   last:Doe
// }


// Generator.prototype.throw()
// 总结：
// (1).Generator 函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获。函数体内抛错，也可以在函数体外捕获。
// (2).throw方法可以接受一个参数，该参数会被catch语句接收，建议抛出Error对象的实例。
// (3).throw方法和全局的throw命令是不同的，前者如果函数体内有catch就会被捕获，如果没有则会被函数外部catch不会，后者只能被函数体外的catch捕获。如果都不存在catch，那么将报错
// (4).throw方法抛出的错误要被内部捕获，前提是必须至少执行过一次next方法。
// (5).throw方法被捕获以后，会附带执行下一条yield表达式。也就是说，会附带执行一次next方法。
// (6).一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用next方法，将返回一个value属性等于undefined、done属性等于true的对象，即 JavaScript 引擎认为这个 Generator 已经运行结束了。
// var g = function* () {
//     try {
//       yield;
//     } catch (e) {
//       console.log('内部捕获', e);
//     }
// };
// var i = g();
// i.next();
// try {
//     i.throw('a');
//     throw new Error('外部错误')
//     i.throw('b');
// } catch (e) {
//     console.log('外部捕获', e);
// }


// Generator.prototype.return()
// 总结：
// (1).Generator 函数返回的遍历器对象，还有一个return()方法，可以返回给定的值，并且终结遍历 Generator 函数。
// (2).如果return()方法调用时，不提供参数，则返回值的value属性为undefined。
// function *gen(){
//     yield 1
//     yield 2
// }
// let it = gen()
// log(it.next()) //{ value: 1, done: false }
// log(it.return()) //{ value: undefined, done: true }
// log(it.next()) //{ value: undefined, done: true }
// (3).如果 Generator 函数内部有try...finally代码块，且正在执行try代码块，那么return()方法会导致立刻进入finally代码块，执行完以后，整个函数才会结束。
// function *gen(){
//     yield 1
//     try {
//         yield 2
//     } finally {
//         yield 3
//         yield 4
//     }
//     yield 5
// }
// let it = gen()
// log(it.next()) //{ value: 1, done: false }
// log(it.next()) //{ value: 2, done: false }
// log(it.return(6)) //{ value: 3, done: false }
// log(it.next()) //{ value: 4, done: false }
// log(it.next()) //{ value: 6, done: true }



// yield* 
// function* bar() {
//     yield 'x';
//     yield* foo();
//     yield 'y';
// }
// // 等同于
// function* bar() {
//     yield 'x';
//     yield 'a';
//     yield 'b';
//     yield 'y';
// }
// 从语法角度看，如果yield表达式后面跟的是一个遍历器对象，需要在yield表达式后面加上星号，表明它返回的是一个遍历器对象。这被称为yield*表达式。
// 如果被代理的 Generator 函数有return语句，那么就可以向代理它的 Generator 函数返回数据。
// function *foo(){
//     yield 2
//     return 'foo'
// }
// function *gen(){
//     yield 1
//     const v = yield* foo()
//     console.log(`v+${v}`)
//     yield 4
// }
// let it = gen()
// log(it.next()) //{ value: 1, done: false }
// log(it.next()) //{ value: 2, done: false }
// log(it.next()) //v+foo   { value: 4, done: false }
// log(it.next()) //{ value: undefined, done: true }


// 作为对象属性的 Generator 函数
// let obj = {
//     * myGeneratorMethod() {
//       ···
//     }
// };
// 它的完整形式如下，与上面的写法是等价的
// let obj = {
//     myGeneratorMethod: function* () {
      // ···
//     }
// };