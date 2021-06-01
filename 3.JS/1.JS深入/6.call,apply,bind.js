// 1.call
// var foo = {
//     value: 1
// }
// function bar(name,age){
//     console.log(name)
//     console.log(age)
//     console.log(this.value)
//     return {
//         value : this.value
//     }
// }
// console.log(bar.call(foo,'ikki',18))
// 1.1 call前面的函数会执行
// 1.2 this指向call函数的的第一个参数
// 1.3 call函数可以给定参数执行函数
// 1.4 第一个参数可以为null。当为null的时候，视为指向window
// 1.5 函数是可以有返回值的
// Function.prototype.call2 = function (context,...args){
//     let context1 = context||window
//     context1.fn = this
//     let res = context1.fn(...args)
//     delete context1.fn
//     return res
// }
// console.log(bar.call2(foo,'lucky',0))

// 2.apply
// Function.prototype.apply = function (context,arr){
//     let context = context||window
//     context.fn = this
//     let res 
//     if(!arr){
//         res = context.fn()
//     }else{
//         res = context.fn(...args)
//     }
//     delete context.fn
//     return res
// }

// 3.bind
// bind() 方法会创建一个新函数。
// 当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。
// 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。
// var value = 2;
// var foo = {
//     value :1
// }
// function bar(name,age){
//     this.habit = 'shopping';
//     console.log(this.value)
//     console.log(name);
//     console.log(age);
// }
// bar.prototype.friend = 'kevin';
// let bindFoo = bar.bind(foo,'ikki')
// var obj = new bindFoo('18');
// console.log(obj.habit);
// console.log(obj.friend);
// Function.prototype.bind2 = function (context){
//     let self = this
//     let args = [].slice.call(arguments,1) // 获取bind2函数从第二个参数到最后一个参数
//     var fbound = function(){
//         let bindArgs = [].slice.call(arguments)
//         self.apply( this instanceof self ? this : context ,args.concat(bindArgs))
//     }
//     fbound.prototype = this.prototype
//     return fbound
// }
// let bindFoo2 = bar.bind2(foo,'lucky')
// var obj2 = new bindFoo2('18');
// console.log(obj2.habit);
// console.log(obj2.friend);


