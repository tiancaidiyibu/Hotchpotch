// 定义：ECMAScript中所有函数的参数都是按值传递的。(基本类型就是直接拷贝值传递过去，引用类型则是拷贝一份指针传递过去)

// 基本类型是按值传递，就是拷贝一份数值
// var value = 1;
// function foo(v) {
//     v = 2;
//     console.log(v); //2
// }
// foo(value);
// console.log(value) // 1
// 很好理解，当传递 value 到函数 foo 中，相当于拷贝了一份 value，假设拷贝的这份叫 _value，函数中修改的都是 _value 的值，而不会影响原来的 value 值。


// 所谓按引用传递，就是传递对象的引用，函数内部对参数的任何改变都会影响该对象的值，因为两者引用的是同一个对象。
// var obj = {
//     value: 1
// };
// function foo(o) {
//     o.value = 2;
//     console.log(o.value); //2
// }
// foo(obj);
// console.log(obj.value) // 2
// var obj = {
//     value: 1
// };
// function foo(o) {
//     o = 2;
//     console.log(o); //2
// }
// foo(obj);
// console.log(obj.value) // 1


// 其实是基本类型是按值传递的，引用类型是共享传递的，因为其实引用类型也是传递的时候是传递的对象的引用副本