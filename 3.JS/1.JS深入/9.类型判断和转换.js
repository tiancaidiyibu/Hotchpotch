// 1.typeof
// 直接在计算机底层基于数据类型的值(二进制)进行检测
// 对于原始数据类型来说，除了null会被判定为object，对象存储在计算机中，都是以000开始的二进制存储，null也是
// typeof 普通对象/数组对象/正则对象/日期对象等等 'object'
// 可以判断undefined、object、boolean、number、string、object, func
// var date = new Date();
// var error = new Error();
// console.log(typeof date); // object
// console.log(typeof error); // object

// 2.Obejct.prototype.toString
// 可以判断 number, string, boolean, undefined, null, obj, array, date, error, reg, func, math, json, arguments

// 3.type API
// var class2type = {};
// 'Boolean Number String Function Array Date RegExp Object Error'.split(' ').map((item,index)=>{
//     class2type['[object '+ item + ']'] = item.toLowerCase()
// })
// function type(obj){
//     if(obj == null){
//         return obj + ''
//     }
//     return typeof obj === 'object'|| typeof obj === 'function' ?
//         class2type[Object.prototype.toString.call(obj)]|| 'object' :
//         typeof obj
// }

// 4.instanceof
// 检测当前实例是不是属于这个类
// 字面量创建的判断不精准
// console.log('sss' instanceof String)  //false
// 如果原型改变了，就会误判
// 基本类型不能检测

// function createInstanceof(left,right){
//     let left = left.__proto__
//     let o = right.prototype
//     while(true){
//         if(left === o){
//             return true
//         }
//         if(left === null){
//             return false
//         }
//         left = left.__proto__
//     }
// }




