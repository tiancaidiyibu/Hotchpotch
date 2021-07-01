// function fn1 () {
//     console.log('f1')
// }
// function fn2 () {
//     console.log('f2')
// }
// function fn3 () {
//     console.log('f3')
// }


// function compose (...func){
//     if(func.length === 0){
//         return args=>args
//     }
//     if(func.length === 1){
//         return func(args)
//     }
//     return func.reduce((prev,v)=>(...args)=>v(prev(args)))
// }

// compose(fn1,fn2,fn3)()




// async function fn1(next) { 
//     console.log("fn1"); 
//     await next(); 
//     console.log("end fn1");
// }
// async function fn2(next) { 
//     console.log("fn2"); 
//     await delay();
//     await next(); 
//     console.log("end fn2");
// }
// function fn3(next) { 
//     console.log("fn3");
// }

// function delay() {
//     return new Promise((reslove, reject) => {
//     setTimeout(() => { 
//         reslove();
//     }, 2000); })
// }

// function compose(middlewares){
//     return function(...args){
//         return dispatch(0)
//         function dispatch(i){
//             let fn = middlewares[i]
//             if(!fn){
//                 return Promise.resolve()
//             }
//             return Promise.resolve(
//                 fn(function next(){
//                     return dispatch(i+1)
//                 })
//             )
//         }
//     }
// }
// compose([fn1, fn2, fn3])()





