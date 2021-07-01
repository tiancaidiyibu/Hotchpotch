
// Promise.resolve(value) 返回一个以给定值解析后的Promise 对象.
// 如果 value 是个 thenable 对象，返回的promise会“跟随”这个thenable的对象，采用它的最终状态
// 如果传入的value本身就是promise对象，那么Promise.resolve将不做任何修改、原封不动地返回这个promise对象。
// 其他情况，直接返回以该值为成功状态的promise对象。


// Promise.resolve = function(value){
//     if(value instanceof Promise){
//         return value
//     }
//     return new Promise((resolve,reject)=>{
//         if(value && typeof value === 'object' && typeof value.then === 'function'){
//             setTimeout(()=>{
//                 value.then(resolve,reject)
//             })
//         }else{
//             resolve(value)
//         }
//     })
// }

Promise.resolve = function(value){
    if(value instanceof Promise) value
    return new Promise ((res,rej)=>{
        if(value && typeof value === 'object' && value.then && typeof value.then === 'function'){
            setTimeout(()=>{
                value.then(res,rej)
            })
        }else{
            res(value)
        }
    })
}

// let p = Promise.resolve(20);
// p.then((data) => {
//     console.log(data);
// });
// let p2 = Promise.resolve({
//     then: function(resolve, reject) {
//         resolve(30);
//     }
// });

// p2.then((data)=> {
//     console.log(data)
// });

// let p3 = Promise.resolve(new Promise((resolve, reject) => {
//     resolve(400)
// }));
// p3.then((data) => {
//     console.log(data)
// });


// Promise.reject方法和Promise.resolve不同，Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。
// Promise.reject = function(reason){
//     return new Promise((reslove,reject)=>{
//         reject(reason)
//     })
// }