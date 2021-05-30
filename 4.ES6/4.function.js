// 1.参数的默认值
// 优点：传参时可以省略某个参数，更好的阅读代码.
// 注意点：函数的参数都是默认声明的，所以不能再使用let或const来再次声明参数
// function fn(x=1,y=2){
//     let x = 2 //error
//     const x = 3 //error
// }
// 总结：当与解构赋值相结合时，可以在形参后设置一个默认值，那么传参时可忽略这个参数。 当传参传入对应的参数则会顶掉默认值


// 2.arguments
// arguments上类似于数组的对象，其内部用iterater接口
// console.log(typeof arguments) //'object'
// console.log(Object.prototype.toString.call(arguments)) //[object Arguments]


// 3.length属性
// 定义了默认值后，函数的length属性,将返回没有指定默认值的参数个数
// function fn(x,y=5,{z}={}){}
// console.log(fn.length)  //1
// 如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了.
// function fn(a,x=5,b){}
// console.log(fn.length) //1
// 函数的length属性，不包括 rest 参数。
// function fn(...rest){}
// console.log(fn.length) //0


// 4.作用域
// 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。
// 等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。