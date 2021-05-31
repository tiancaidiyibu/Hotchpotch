const { log } = console


// Promise的含义:
// 简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。
// （1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。
//     只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。
// （2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。
//     Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。
//     只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。
//     如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

// Promise缺点:
// 1.无法取消Promise，一旦新建它就会立即执行，无法中途取消。
// 2.如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
// 3.当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
// 如果某些事件不断地反复发生，一般来说，使用 Stream 模式是比部署Promise更好的选择


// 基本用法：
// const getJSON = function(url) {
//     const promise = new Promise(function(resolve, reject){
//       const handler = function() {
//         if (this.readyState !== 4) {
//           return;
//         }
//         if (this.status === 200) {
//           resolve(this.response);
//         } else {
//           reject(new Error(this.statusText));
//         }
//       };
//       const client = new XMLHttpRequest();
//       client.open("GET", url);
//       client.onreadystatechange = handler;
//       client.responseType = "json";
//       client.setRequestHeader("Accept", "application/json");
//       client.send();
  
//     });
  
//     return promise;
//   };
  
//   getJSON("/posts.json").then(function(json) {
//     console.log('Contents: ' + json);
//   }, function(error) {
//     console.error('出错了', error);
//   });
// 如果一个promise的回调函数中res参数是另外一个promise。那么这个promise的返回状态受另外一个promise影响，他的then方法会等到另外一个promise结束再执行。
// const p1 = new Promise((res,rej)=>{
//     setTimeout(()=>{rej(new Error('fail'))},3000)
// })
// const p2 = new Promise((res,rej)=>{
//     setTimeout(()=>res(p1),1000)
// })
// p2.then(res=>console.log(res,'res')).catch(err=>console.log(err,'err')) //Error: fail
// 调用resolve或reject并不会终结 Promise 的参数函数的执行。但加了return后就不会执行下面的
// new Promise((resolve, reject) => {
//     return resolve(1);
//     console.log(2);  
// }).then(r => {
//     console.log(r); //1
// })


// 原型方法
// 1.Promise.prototype.then(onFulfilled[, onRejected]) : 返回一个新的Promise实例。它最多需要有两个参数：Promise 的成功和失败情况的回调函数。
// 由于返回新的Promise,因此支持链式调用,第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。
// new Promise((res,rej)=>res(1)).then(data=>{return data+1}).then(data=>console.log(data)) //2
// new Promise((res,rej)=>res(1)).then(data=> new Error('fail')).then(data=>console.log(data,'asdasd')) //Error: fail   asdasd
// 采用链式的then，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个Promise对象（即有异步操作），这时后一个回调函数，就会等待该Promise对象的状态发生变化，才会被调用。
// getJSON("/post/1.json").then(function(post) {
//     return getJSON(post.commentURL);
// }).then(function (comments) {
//     console.log("resolved: ", comments);
// }, function (err){
//     console.log("rejected: ", err);
// });

// 2.Promise.prototype.catch()
// 重点：Promise 在resolve语句后面，再抛出错误，不会被捕获，等于没有抛出。因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。
// const promise = new Promise((res,rej)=>{
//     res('a')
//     new Error('fail')
// })
// promise.then(data=>console.log(data)).catch(err=>console.log(err))  //a
// 重点：then方法指定的回调函数，如果运行中抛出错误，也会被catch方法捕获。
// const promise = new Promise((res,rej)=>{
//     res('a')
// })
// promise.then(data=>{throw new Error('fail')}).catch(err=>console.log(err))  //Error: fail
// Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。运行完catch方法指定的回调函数，会接着运行后面那个then方法指定的回调函数。如果没有报错，则会跳过catch方法。catch方法之中，还能再抛出错误。
// Promise.resolve().then(()=>1).then((v)=>{console.log(v);throw new Error('test')}).catch(e=>{console.log(e)})

// 3.Promise.prototype.finally() ： 用于指定不管 Promise 对象最后状态如何，都会执行的操作。返回一个新的Promise
// Promise.resolve().then(()=>{console.log(1)}).catch(e=>console.log(e)).finally(()=>console.log(3)).then(()=>console.log(4)) //1  3   4
// finally方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。


// 构造函数方法
// 1.Promise.all([Iterator]) 用于将多个 Promise 实例，包装成一个新的 Promise 实例。 接受一个数组（具有 Iterator 接口）作为参数，数组项都是 Promise 实例，
// 重点:如果Iterator中的成员有不是promise实例的话，那我会先调用Promise.resolve()将其转换成Promise实例
// const p = Promise.all([p1, p2, p3]);
// p的状态由p1、p2、p3决定，分成两种情况。
// 1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
// const p = Promise.all([1,2,3])
// p.then(v=>console.log(v))  //[ 1, 2, 3 ]
// 2) 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
// const errPromise = new Promise((res,rej)=>rej('failss'))
// const p = Promise.all([1,errPromise,2,3])
// p.then(v=>console.log(v))
// 如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法(没必要触发了)。
// const p1 = new Promise((resolve, reject) => {
//     resolve('hello');
// })
// .then(result => result)
// .catch(e => e);
// const p2 = new Promise((resolve, reject) => {
//     throw new Error('报错了');
// })
// .then(result => result)
// .catch(e => e);
// Promise.all([p1, p2])
// .then(result => console.log(result))
// .catch(e => console.log(e));
// // ["hello", Error: 报错了]

// 2.Promise.race([Interator]):
// Promise.race()方法的参数与Promise.all()方法一样，如果不是 Promise 实例，就会先调用下面讲到的Promise.resolve()方法，将参数转为 Promise 实例，再进一步处理。
// const p = Promise.race([p1, p2, p3]);
// 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。
// const p = Promise.race([
//     fetch('/resource-that-may-take-a-while'),
//     new Promise(function (resolve, reject) {
//       setTimeout(() => reject(new Error('request timeout')), 5000)
//     })
// ]);
// p
// .then(console.log)
// .catch(console.error);

// 3.Promise.allSettled([Interator])
// 接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只有等到所有这些参数实例都返回结果，不管是fulfilled还是rejected，包装实例才会结束。
// 该方法返回的新的 Promise 实例，一旦结束，状态总是fulfilled，不会变成rejected。状态变成fulfilled后，Promise 的监听函数接收到的参数是一个数组，每个成员对应一个传入Promise.allSettled()的 Promise 实例
// const resolved = Promise.resolve(42);
// const rejected = Promise.reject(-1);
// const allSettledPromise = Promise.allSettled([resolved, rejected]);
// allSettledPromise.then(function (results) {
//   console.log(results);
// });
// [
//     { status: 'fulfilled', value: 42 },
//     { status: 'rejected', reason: -1 }
// ]

// 4.Promise.any() //es2021提出
// 该方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。
// Promise.any()跟Promise.race()方法很像，只有一点不同，就是不会因为某个 Promise 变成rejected状态而结束。
// const resolved1 = Promise.resolve(42);
// const resolved2 = Promise.resolve(42);
// const rejected1 = Promise.reject(-1);
// Promise.any([resolved1,resolved2,rejected1]).then(data=>console.log(data))

// 5.Promise.resolve()
// Promise.resolve('foo'）等价于 new Promise(res=>res('foo'))
// Promise.resolve()的参数存在4种情况：
// 1.Promise 实例：如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
// 2.参数是一个thenable对象:Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。
// let thenable = {
//     then: function(resolve, reject) {
//       resolve(42);
//     }
// };
// Promise.resolve(thenable).then(data=>console.log(data)) //42
// 3.参数不是具有then方法的对象，或根本就不是对象:如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。
// const p = Promise.resolve('Hello');
// p.then(function (s) {
//   console.log(s) // Hello
// });
// 4.不带有任何参数:不带参数，直接返回一个resolved状态的 Promise 对象。
// const p = Promise.resolve();
// p.then(function () {  });

// 6.Promise.reject(reson)
// Promise.reject('出错了') 等同于 new Promise((resolve, reject) => reject('出错了'))
















