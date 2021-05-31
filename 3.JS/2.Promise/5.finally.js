
let Promise1 = require('./1.Promise')



// Promise.prototype.finally = function (cb){
//     return this.then(data=>{
//         return Promise.resolve(cb()).then(()=>data)
//     },err=>{
//         return Promise.resolve(cb()).then(()=>{throw err})
//     })
// }

// Promise.prototype.finally = function(cb){
//     return this.then(
//         data=>Promise.resolve(cb()).then(()=>data),
//         err=>Promise.resolve(cb()).then(()=>{throw err})
//     )
// }
// 简版
// Promise.prototype.finally = function(cb){
//     return this.then(
//         data => Promise.resolve(cb()).then(data),
//         err => Promise.resolve(cb()).then(()=>{throw err})
//     )
// }

p.finally(()=>{
    return new Promise((reslove,reject)=>{
        setTimeout(()=>{
            reslove()
        },2000)
    })
}).then(data=>{
    console.log(data)
    return 2222
}).then(data=>{
    console.log(data)
})
