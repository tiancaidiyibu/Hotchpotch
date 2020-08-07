// function createObj(){
//     var obj = new Object()
//     const constructor = [].shift.call(arguments)
//     obj.__proto__ = constructor.prototype
//     const res = constructor.apply(obj,arguments)
//     return typeof res === 'object'?res:obj
// }


// function createInstanceof(left,right){
//     let O = right.prototype
//     left = left.__proto__
//     while(true){
//         if(left === null){
//             return false
//         }
//         if(O===left){
//             return true
//         }
//         left = left.__proto__
//     }
// }