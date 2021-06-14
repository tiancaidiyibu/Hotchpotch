// 重点：解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。

// 1.数组的解构赋值
// 匹配模式：只要等号两边的模式相同，左边的变量就会被赋予对应的值。（并且从左到右按顺序解构）.如果解构不成功，变量的值就等于undefined。
// let [a,[[b],c]] = [1,[[2],3]]  // a=1b=2c=3
// let [ , , c] = [1,2,3]  //c=3
// let [a,...b] = [1,2,3,4] //a=1 b=[2,3,4]
// let [a,b,...c] = [1] //a=1 b=undefined c=[]

// 重点：只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。
// let [a,b] = new Set([1,2]) //a=1 b=2

// ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。
// let [x = 1] = [] //x=1
// let [x = 1] = [undefined];  //x=1
// let [x = 1]=[null] ;   //x=null

// 默认值可以引用解构赋值的其他变量，但该变量必须已经声明。
// let [x = 1, y = x] = [];     // x=1; y=1
// let [x = 1, y = x] = [2];    // x=2; y=2
// let [x = 1, y = x] = [1, 2]; // x=1; y=2
// let [x = y, y = 1] = [];     // ReferenceError: y is not defined



// 2.对象的解构赋值
// 匹配模式:
    // 1.数组的解构是有序的，对象却是无序的. 如果解构失败，变量的值是undefined
    // 2.对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
// let {bar,foo,c} = {foo:'a',bar:'b'} //foo=a,bar=b,c=undefined
// let {a:b} = {a:1}  //b=1

// 对象的解构赋值可以取到继承的属性
// const obj1 = {}
// const obj2 = {prop:1}
// Object.setPrototypeOf(obj1,obj2)
// const {prop} = obj1   //prop=1

// 默认值：默认值生效的条件是，对象的属性值严格等于undefined。
// var {x: y = 3} = {x: 5};  //y=5
// var {x = 3} = {x: undefined};  //x=3
// var {x = 3} = {x: null};  //x=null

// 由于数组是特殊的对象，那么可以对数组进行对象属性的解构赋值。例如
// [a,b,c]==>{0:a,1:b,2:c}  
// let {0:first,2:last}=[1,2,3] //first:1;last:3



// 3.字符串的解构赋值
// 匹配模式：字符串会被转换成类数组的对象，类数组最具有length属性
// const [a,b,c,d,e] = 'hello'  //a=h,b=e,c=l.d=l,e=o
// const {0:a,1:b,length:len} = 'hello' //a=h,b=e,len=5



// 4.数值和布尔值的解构赋值
// 匹配模式：解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
// let { toString:s } = 123 
// console.log(s) //[Function: toString]
// s === Number.prototype.toString // true
// let {toString: s} = true;
// s === Boolean.prototype.toString // true
// 数值和布尔值的包装对象都有toString属性，因此变量s都能取到值。



// 5.函数的解构赋值
// 匹配模式：可以理解为当不传入实参时：那么按照正常进行解构。当传入实参时，则实参会顶替掉解构的右半部分。例如：{x:b,y:z}={x:3,y:4}//b=3;z=4
// function add([x, y]){
//     return x + y;
// }
// add([1, 2]); // 3

// function fn ({x:b,y:z}={x:1,y:2}){
//     console.log(b,z) 
// }
// fn({x:3,y:4}) //b=3;z=4
// fn({x:3}) //b=3;z=undefined
// fn({}) //b=undefined;z=undefined
// fn() //b=1;z=2


