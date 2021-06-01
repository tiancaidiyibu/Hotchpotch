/* 
    事件循环：
        1.当执行任务时，同步任务进入主线程，异步任务进入事件表中并注册函数。
        2.当异步任务指定的事情完成时，事件表(event table)会将这个函数移入事件队列(event queue)中等待
        3.主线程的任务执行完毕，会去事件队列读取等待的函数，进入到主线程执行。
        4.这种不断重复的过程称为，事件循环
    注意点：  
        1.只有当主线程任务执行完成后，才会去执行异步队列当中的函数，这样就造成了如果主线程执行非常慢，异步任务的已经完成，但还是会在异步队列中等到调用
        2.关于setTimeout要补充的是，即便主线程为空，0毫秒实际上也是达不到的。根据HTML的标准，最低是4毫秒。
*/

/*
    不同类型的任务会对应的事件队列，这里就分为宏任务和微任务：
        macro-task(宏任务)：包括整体代码script, setTimeout，setInterval
        micro-task(微任务)：Promise, process.nextTick
*/
// js运行机制
// 1.首先js 是单线程运行的，在代码执行的时候，将不同函数的执行上下文压入执行栈中
// 2.在执行同步代码的时候，如果遇到异步事件，js并不会一直等待异步返回结果，而是将这个事件挂起，继续执行执行栈中的其他任务
// 3.在同步任务执行结束后，再把异步事件对应的回调函数加入到和当前执行栈中不同的另一个异步队列中执行
// 4.任务队列分为宏任务和微任务，当前执行栈的事件执行完毕后，会首先判断微任务中是否存在任务可以执行，如果有的话，就将微任务压入到执行栈中
// 5.当微任务队列的任务执行完成后再去判断宏任务队列中的任务
setTimeout(function() {
    console.log('setTimeout'); //4
})
new Promise(function(resolve) {
    console.log('promise');     //1
}).then(function() {
    console.log('then'); //3
})
console.log('console'); //2



console.log('1');
setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})


// 1 7 6 8 2 4 3 5 9 11 10 12

