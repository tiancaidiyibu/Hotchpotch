// Promise.race函数返回一个 Promise，它将与第一个传递的 promise 相同的完成方式被完成。它可以是完成（ resolves），也可以是失败（rejects），这要取决于第一个完成的方式是两个中的哪个。
// 如果传的参数数组是空，则返回的 promise 将永远等待。
// 如果迭代包含一个或多个非承诺值和/或已解决/拒绝的承诺，则 Promise.race 将解析为迭代中找到的第一个值。

// Promise.race =function(interators){
//     let promises = Array.from(interators)
//     return new Promise((resolve,reject)=>{
//         if(promises.length === 0){
//             return
//         }else{
//             for(let i = 0;i<promises.length;i++){
//                 Promise.resolve(promises[i]).then((data)=>{
//                     resolve(data)
//                     return 
//                 },err=>{
//                     reject(err)
//                     return
//                 })
//             }
//         }

//     })
// }




Promise.race([
    new Promise((resolve, reject) => { setTimeout(() => { resolve(100) }, 1000) }),
    undefined,
    new Promise((resolve, reject) => { setTimeout(() => { reject(100) }, 100) })
]).then((data) => {
    console.log('success ', data);
}, (err) => {
    console.log('err ',err);
});

Promise.race([
    new Promise((resolve, reject) => { setTimeout(() => { resolve(100) }, 1000) }),
    new Promise((resolve, reject) => { setTimeout(() => { resolve(200) }, 200) }),
    new Promise((resolve, reject) => { setTimeout(() => { reject(100) }, 100) })
]).then((data) => {
    console.log(data);
}, (err) => {
    console.log(err);
});