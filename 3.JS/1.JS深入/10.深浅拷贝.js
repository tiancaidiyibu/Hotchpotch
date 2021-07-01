// 深拷贝简版
// 存在问题
// 1、并不能复制不可枚举的属性以及 Symbol 类型
// 2、只是针对普通的引用类型的值做递归复制，而对于 Array、Date、RegExp、Error、Function 这样的引用类型并不能正确地拷贝；
// 3、对象的属性里面成环，即循环引用没有解决。
// function deepCopy(obj){
//     if(! typeof obj === 'object') return
//     let newObj = obj instanceof Array ? [] : {}
//     for (const key in obj) {
//         if (obj.hasOwnProperty(key)) {
//             newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
//         }
//     }
//     return newObj
// }

// 深拷贝二版
// 1.

function deepCopy(obj){
    if(! typeof obj === 'object') return
    let newObj = obj instanceof Array ? [] : {}
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj
}