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
// 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。 等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。
// var x = 1
// function fn(x, y = x ){
//     console.log(y)  //3
// }
// fn(3)


// 5.rest参数
// ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。 
// function push(array, ...items) {
//     items.forEach(function(item) {
//       array.push(item);
//       console.log(item);  //1   2    3
//     });
// }
// var a = [];
// push(a, 1, 2, 3)
// 注意，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。
// function fn(x , ...rest ,y){ } //error


// 6.箭头函数
// 由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。
// 注意点：
// （1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。==》简单说就是this指向父亲
// （2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。（箭头函数内部的this指向是固定的）
// （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
// （4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
// （5）由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。
