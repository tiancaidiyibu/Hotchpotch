
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