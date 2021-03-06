

// Promise.defer = function(){
//     let dfd = {}
//     dfd.promise = new Promise((resolve,reject)=>{
//         dfd.resolve = resolve
//         dfd.reject = reject
//     })
//     return dfd
// }

let Promise = require('./1.Promise')
const fs = require('fs')

function read(url){
        let dfd = Promise.defer()
        fs.readFile(url,'utf8',(err,data)=>{
            if(err) dfd.reject(err)
            dfd.resolve(data) 
        })
        return dfd.promise
}

read('./2.then.js').then(data=>console.log(data))