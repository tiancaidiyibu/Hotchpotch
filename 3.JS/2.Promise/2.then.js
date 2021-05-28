
let Promise = require('./1.Promise')

let p = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(222)
    },1000)
})

p.then(data=>{
    console.log(data)
    return 2222
},err=>{
    console.log(err)
})
.then()
.then(data=>{
    
    console.log('twoData',data)
    return new Promise((resolve,reject)=>{
        reject(1222233445)
    })
}).then(data=>{
    console.log('ddasdsadas',data)
},err=>{
    console.log('err',err)
})