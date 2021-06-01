const { log } = console

// async 函数就是 Generator 函数的语法糖
// const fs = function(n){
//     return new Promise((res,rej)=>{
//         res(n+1)
//     })
// }
// const gen = function* (){
//     yield fs(1)
//     yield fs(2)
// }
// let it = gen()
// it.next().value.then(data=>console.log(data)) //2
// it.next().value.then(data=>console.log(data)) //3

// const asy = async function(){
//     log(await fs(1))
//     log(await fs(2)) 
// }
// asy().then(data=>4).then(v=>console.log(v)) //2   3   4
// async函数对 Generator 函数的改进，体现在以下四点。
// （1）内置执行器。
// （2）更好的语义。
// （3）co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。
// （4）返回值是 Promise。



// 语法
// async函数返回一个promise对象，如果async函数内部有return返回值，那么会成为then中回调函数的参数
// async function fn(){
//     return 1
// }
// fn().then(v=>console.log(v)) //1
// async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。抛出的错误对象会被catch方法回调函数接收到。
// async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误。
// 也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。(除非遇到return或者error则会停止执行下面的异步操作)

// await命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。如果是thenable对象，那么await将其等同于promise对象

// await命令后面的 Promise 对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到。
// 任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。
// async function fn(){
//     await Promise.reject('error')
//     await Promise.resolve(1) //不会执行
// }
// fn().then(v=>console.log(v)).catch(err=>console.log(err)) //error
// 防止出错的方法，也是将其放在try...catch代码块之中。
// async function fn(){
//     try {
//         await Promise.reject('error') //内部捕获 error
//     } catch (error) {
//         console.log('内部捕获',error)
//     }
//     return Promise.resolve(1) //继续执行
// }
// fn().then(v=>console.log(v)).catch(err=>console.log('外部捕获',err))  //1

// 使用注意点
// 第一点，前面已经说过，await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中。
// 第二点，多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。(结合Promise.all())
// 第三点，await命令只能用在async函数之中，如果用在普通函数，就会报错。
// 第四点，async 函数可以保留运行堆栈。
// const a = () => {
//     b().then(() => c());
// };
// 上面代码中，函数a内部运行了一个异步任务b()。当b()运行的时候，函数a()不会中断，而是继续执行。等到b()运行结束，可能a()早就运行结束了，b()所在的上下文环境已经消失了。如果b()或c()报错，错误堆栈将不包括a()。
// const a = async () => {
//     await b();
//     c();
// };
// 上面代码中，b()运行的时候，a()是暂停执行，上下文环境都保存着。一旦b()或c()报错，错误堆栈将包括a()。