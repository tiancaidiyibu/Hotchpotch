
// Promise.all = function (values){
//     return new Promise((resolve,reject)=>{
//         let arr = []
//         let index = 0 //计算器解决异步并发问题
//         function processData(key,value){
//             index ++ 
//             arr[key] = value
//             if(index == values.length){
//                 resolve(arr)
//             }
//         }
        
//         for(let i=0; i<values.length;i++){
//             let current = values[i]
//             if(isPromise(current)){
//                 current.then(data => {
//                     processData(i,data)
//                 },reject)
//             }else{
//                 processData(i,current)
//             }
//         }
//     })
// }

// const isPromise = value => {
//     if(typeof value ==='object'&&value !== null || typeof value === 'function'){
//         if(typeof value.then === 'function'){
//             return true
//         }else{
//             return false
//         }
//     }
// }


let Promise1 = require('./1.Promise')
const fs = require('fs')

function read(url){
        let dfd = Promise1.defer()
        fs.readFile(url,'utf8',(err,data)=>{
            if(err) dfd.reject(err)
            dfd.resolve(data)
        })
        return dfd.promise
}



Promise1.all([1,2,3,read('./2.then.js'),read('./2.then.js'),5,6,7]).then(data=>{
    console.log(data)
})