new Promise((resolve, reject) => {
    console.log("log: 外部promise");
    resolve();
})
.then(() => {
    console.log("log: 外部第一个then");
    new Promise((resolve, reject) => {
        console.log("log: 内部promise");
        resolve();
    })
    .then(() => {
        console.log("log: 内部第一个then");
    })
    .then(() => {
        console.log("log: 内部第二个then");
    });
})
.then(() => {
    console.log("log: 外部第二个then");
});
    
// log: 外部promise
// log: 外部第一个then
// log: 内部promise
// log: 内部第一个then
// log: 外部第二个then
// log: 内部第二个then


//   结论1：
// 当执行then方法时候，如果前面的promise已经是resolved状态，则直接将回调放入到微任务中。

  