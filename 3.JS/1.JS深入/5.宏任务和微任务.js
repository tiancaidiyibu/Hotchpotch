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
    宏任务和微任务：
        macro-task(宏任务)：包括整体代码script, setTimeout，setInterval
        micro-task(微任务)：Promise, process.nextTick
*/