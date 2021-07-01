const PENDING  = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTD = 'REJECTD'




class Promise2 {
    constructor(executor){
        this.status = PENDING
        this.value = undefined
        this.reason = undefined    
        let reslove = (value) =>{
            if(this.status === 'PENDING'){
                this.value = value
                this.status = RESOLVED
            }
        }
        let reject = (reson)=>{
            if(this.status === 'PENDING'){
                this.reason = reason
                this.status = REJECTD
            }
        }
        try {
            executor(reslove,reject)
        } catch (error) {
            reject(error)
        }
        
    }
    then(onResloved,onRejectd){
        
    }
}

const resolvePromise = (promise2,x,resolve,reject) => {
    if(promise2 === x){
        return
    }
    if(typeof x === 'object' && x !== null ||typeof x ==='function'){
        try {
            let then = x.then
            if(typeof then === 'function'){
                then.call(x,y=>{
                    resolvePromise(promise2,y,resolve,reject)
                },e=>{
                    reject(e)
                })
            }else{
                resolve(x)
            }
        } catch (error) {
            reject(error)
        }
    }else{
        resolve(x)
    }
}


// 判断是否是promise
const isPromise = value => {
    if(typeof value ==='object'&&value !== null || typeof value === 'function'){
        if(typeof value.then === 'function'){
            return true
        }else{
            return false
        }
    }
}


class Promise {
    constructor(executor){
        this.status = 'PENDING'
        this.values = undefined
        this.reason = undefined
        this.onReslovedCb = []
        this.onRejectdCb =[]

        let resolve = (values)=>{
            if(this.status === PENDING){
                this.values = values
                this.status = RESOLVED
                this.onReslovedCb.forEach(fn=>fn())
            }
        }
        let reject = reason => {
            if(this.status === PENDING){
                this.reason = reason
                this.status = REJECTD
                this.onRejectdCb.forEach(fn=>fn())
            }
        }

        try {
            executor(resolve,reject)
        } catch (error) {
            reject(error)
        }
    }
    then(onResloved,onRejectd){
        onResloved = typeof onResloved === 'function' ? onResloved : val => val
        onRejectd = typeof onRejectd === 'function' ? onRejectd : err => {
            throw err
        }
        let promise2 = new Promise((resolve,reject)=>{
            if(this.status === RESOLVED){
                setTimeout(()=>{
                    try {
                        let x = onResloved(this.values)
                        resolvePromise(promise2,x,resolve,reject)
                    } catch (error) {
                        reject(error)
                    }
                    
                },0)
                
            }
            if(this.status === REJECTD){
                setTimeout(()=>{
                    try {
                        onRejectd(this.reason)
                        resolvePromise(promise2,x,resolve,reject)
                    } catch (error) {
                        reject(error)
                    }
                    
                },0)
                
            }
            if(this.status === PENDING){
                this.onReslovedCb.push(()=>{
                    setTimeout(()=>{
                        try {
                            let x =onResloved(this.values)
                            resolvePromise(promise2,x,resolve,reject)
                        } catch (error) {
                            reject(error)   
                        }
                        
                    },0)
                    
                })
                this.onRejectdCb.push(()=>{
                    setTimeout(()=>{
                        try {
                            let x =onRejectd(this.reason)
                            resolvePromise(promise2,x,resolve,reject)
                        } catch (error) {
                            reject(error)
                        }
                        
                    },0)
                    
                })
            }
        })
        return promise2
    }
    finally(cb){
        return this.then(
            data=>Promise.resolve(cb()).then(()=>data),
            err=>Promise.resolve(cb()).then(()=>{throw err})
        )
    }
    catch(onRejected) {
        return this.then(null, onRejected);
    }


}
Promise.defer = function(){
    let dfd = {}
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}
Promise.all = function (values){
    return new Promise((resolve,reject)=>{
        let arr = []
        let index = 0 //计算器解决异步并发问题
        function processData(key,value){
            index ++ 
            arr[key] = value
            if(index == values.length){
                resolve(arr)
            }
        }
        
        for(let i=0; i<values.length;i++){
            let current = values[i]
            if(isPromise(current)){
                current.then(data => {
                    processData(i,data)
                },reject)
            }else{
                processData(i,current)
            }
        }
    })
}
Promise.race =function(interators){
    let promises = Array.from(interators)
    return new Promise((resolve,reject)=>{
        if(promises.length === 0){
            return
        }else{
            for(let i = 0;i<promises.length;i++){
                Promise.resolve(promises[i]).then((data)=>{
                    resolve(data)
                    return 
                },err=>{
                    reject(err)
                    return
                })
            }
        }

    })
}

Promise.resolve = function(value){
    if(value instanceof Promise){
        return value
    }
    return new Promise((resolve,reject)=>{
        if(value && typeof value === 'object' && typeof value.then === 'function'){
            setTimeout(()=>{
                value.then(resolve,reject)
            })
        }else{
            resolve(value)
        }
    })
}
Promise.reject = function(reason){
    return new Promise((reslove,reject)=>{
        reject(reason)
    })
}

module.exports = Promise