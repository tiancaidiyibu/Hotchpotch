// let
// 1.只存在代码块中
// {
//     let a = 1
//     var b = 2
// }
// console.log(a) //ReferenceError: a is not defined
// for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。
// for (let i = 0; i < 3; i++) {
//     let i = 'abc';
//     console.log(i);
// }
// abc
// abc
// abc
// for (var i = 0; i < 3; i++) {
//     var i = 'abc';
//     console.log(i);
// }
// abc
// 2.不存在变量提升 
// console.log(a) //报错
// let a
// console.log(b) //undefined
// var b
// es5中变量声明存在预解析
// 3.暂时性区域
// 如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。
// {
//     x = 1  //ReferenceError: Cannot access 'x' before initialization
//     let x 
// }
// 4.不允许在相同作用域内重复声明。
// function func() {
//     let a = 10;
//     var a = 1;  // 报错
// }
// function func() {
//     let a = 10;
//     let a = 1;  // 报错
// }
// function func() {
//     var a = 10;
//     var a = 1;  
//     console.log(a) //1
// }
// func()



// const
// 1.只读的常量，一旦声明，常量的值就不能改变。
// const Pi = 334
// Pi = 3 //报错
// 2.一旦声明变量，必须立即初始化，不能留到最后赋值
// const a  //报错
// 3.不存在变量提升
// if(true){
//     console.log(x) //报错
//     const x = 1
// }
// 4.暂时性区域
// 5.不允许相同作用域内重复声明
// const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的（即总是指向另一个固定的地址）
// const foo = {}
// foo.prop = 123
// console.log(foo) //{ prop: 123 }
// foo = {} //报错

// 例子：冻结const
// const constFreeze = (obj)=>{
//     Object.freeze(obj)
//     Object.keys(obj).forEach((key,i)=>{
//         if(typeof obj[key] === 'object'){
//             constFreeze(obj[key])
//         }
//     })
// }

// 变量声明的方式
// 1.es5: var function
// 2.es6: let const import class

// 为什么es6创建let和const？ 
// 因为浏览器的顶层对象window和全局变量var挂钩，被认为是 JavaScript 语言最大的设计败笔之一。