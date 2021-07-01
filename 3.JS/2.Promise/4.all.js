
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


// Promise.all = function(interator){
//     let arr = Array.from(interator)

//     return new Promise((res,rej)=>{
//         let index = 0
//         let newArr = []
//         function processDate(key,value){
//             newArr[key] = value
//             index++
//             if(index === arr.length){
//                 res(newArr)
//             }
//         }
//         for (let i = 0; i < arr.length; i++) {
//             Promise.resolve(arr[i]).then((value)=>{
//                 processDate(i,value)
//             },err=>{
//                 rej(err)
//                  return 
//             })
            
//         }
//     })
// }
// Promise.race = function(interator){
//     let array = Array.from(interator)
//     return new Promise((res,rej)=>{
//         for (let index = 0; index < array.length; index++) {
//             const current = array[index];
//             Promise.resolve(current).then(data=>{
//                 res(data)
//                 return
//             },err=>{
//                 rej(err)
//                 return
//             })
            
//         }
//     })
// }
// Promise.allSettle = function(interator){
//     let array = Array.from(interator)
//     return new Promise((res,rej)=>{
//         let newArr = []
//         let count = 0
//         for (let index = 0; index < array.length; index++) {
//             const current = array[index];
//             Promise.resolve(current).then(data=>{
//                 newArr[index] = data
//                 count ++
//             },err=>{
//                 newArr[index] = err
//                 count ++
//             })
//         }
//         if(count===array.length){
//             res(newArr)
//         }
//     })
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