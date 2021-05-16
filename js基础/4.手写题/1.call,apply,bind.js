// Function.prototype.apply = function (context,arr){
//     let context = context||window
//     context.fn = this
//     let res 
//     if(!arr){
//         res = context.fn()
//     }else{
//         res = context.fn(...args)
//     }
//     delete context.fn
//     return res
// }

// Function.prototype.call = function (context,...args){
//     let context = context||window
//     context.fn = this
//     let res = context.fn(...args)
//     delete context.fn
//     return res
// }

// Function.prototype.bind = function (context){
//     let self = this
//     let args = [].slice.call(arguments,1)
//     var foundFunc =  function(){
//         self.apply(this instanceof foundFunc?this:context,args.concat([].slice.call(arguments)))
//     }
//     foundFunc.prototype = this.prototype
//     return foundFunc
// }


