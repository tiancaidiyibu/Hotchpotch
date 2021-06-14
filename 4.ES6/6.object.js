const { log } = console


// 1.属性名表达式
// obj.foo = true;
// obj['a' + 'bc'] = 123;
// 注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]，这一点要特别小心。

// 2.属性描述符：数据描述符和存取描述符这两种描述符都是对象，二者不能同时存在
// (1).数据描述符：是一个具有值的属性，可写也不可写。 同时具有以下可选键值:
// value:默认值undefined。就是该属性对应的值。
// writable:默认值为false。当且为true时，value才能被赋值运算符改变。
// (2).存取描述符：是由getter-setter函数对 描述的属性。
// get:默认值undefined。给属性提供getter方法。访问该属性，执行getter方法。方法执行时没有参数传入，但是会传入this对象（由于继承关系，这里的this并不一定是定义该属性的对象）。
// set:默认值undefined。给属性提供setter方法。当属性值修改时，触发执行该方法。该方法将接受唯一参数，即该属性新的参数值。
// 两种描述符共同存在的可选键值：
// configuratble:默认值为false.只有为true时，该属性中的描述符才能够被改变，也可以删除
// enumerable:默认值为false。只有为true时，该属性才能出现在对象的可枚举属性中。例：Object.keys(),for...in等


// 3.属性的可枚举性和遍历
// 有四个操作会忽略enumerable为false的属性。
// (1).for...in循环：只遍历对象自身的和继承的可枚举的属性。
// (2).Object.keys()：返回对象自身的所有可枚举的属性的键名。
// (3).JSON.stringify()：只串行化对象自身的可枚举的属性。
// (4).Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。
// ES6 一共有 5 种方法可以遍历对象的属性。
// (1).for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。
// (2).Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。
// (3).Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。
// (4).Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。
// (5).Reflect.ownKeys返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。
// 重点：ES6 规定，所有 Class 的原型的方法都是不可枚举的。
// Object.getOwnPropertyDescriptor(class {foo() {}}.prototype, 'foo').enumerable  // false


// 3.super : 指向当前对象的原型。


// 4.对象的扩展运算符
// 对象的解构赋值用于从一个对象取值，相当于将目标对象自身的所有可枚举的（enumerable）、但尚未被读取的属性，分配到指定的对象上面。所有的键和它们的值，都会拷贝到新对象上面。
// let {a:d=2,b,...c} = {a:1,b:2,e:3,f:4}
// log(d,b,c)  //1 2 { e: 3, f: 4 }
// 由于解构赋值要求等号右边是一个对象，所以如果等号右边是undefined或null，就会报错，因为它们无法转为对象。
// let { ...z } = null; // 运行时错误
// let { ...z } = undefined; // 运行时错误
// 解构赋值必须是最后一个参数，否则会报错。
// let { ...x, y, z } = someObject; // 句法错误
// let { x, ...y, ...z } = someObject; // 句法错误
// 重点： 解构赋值是浅拷贝。另外，扩展运算符的解构赋值，不能复制继承自原型对象的属性。
// 扩展运算符后面不是对象，则会自动将其转为对象。
// console.log({...2}) // {}  扩展运算符后面是整数2，会自动转为数值的包装对象Number{2}。由于该对象没有自身属性，所以返回一个空对象。
// console.log({...true})  // {} 
// console.log({...undefined}) // {} 
// console.log({...null}) // {} 
// 如果扩展运算符后面是字符串，它会自动转成一个类似数组的对象，因此返回的不是空对象。
// log({...'hello'}) // {0: "h", 1: "e", 2: "l", 3: "l", 4: "o"}



// 静态方法
// 1.Object.assign(target, ...sources) : 用于将自身所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
// 只会拷贝源对象自身的并且可枚举的属性到目标对象。不拷贝继承的属性(例如Object.create（))。
// 如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后面的源对象的属性将类似地覆盖前面的源对象的属性。
// let obj1 = {a:1,b:2}
// let obj2 = {c:3}
// let obj3 = {d:4}
// log(Object.assign(obj1,obj2,obj3)) //{ a: 1, b: 2, c: 3, d: 4 }

// 2.Object.create(proto[, propertiesObject]) : 创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
// propertiesObjectg给新对象添加自身属性
// let o = {}
// let o2 = Object.create(o,{
//     p:{
//         value:42,
//         writable:true,
//         configurable:true,
//         enumerable:true
//     }
// })
// log(o2.__proto__ === o) //true
// log(o2.p) //42
// log(o2.__proto__.p) //undefined
// 拓展字面量创建对象
// o = Object.create(Object.prototype);
// console.log(o.__proto__===Object.prototype)  //true

// 3.Object.defineProperty(obj,prop,descriptor) :会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
// var o={}
// Object.defineProperty(o, 'a', {
//     value : 37,
//     writable : false,
//     enumerable : true,
//     configurable : true
// });
// log(o)  //{a:37}
// o.a = 34
// log(o) ////{a:37}
// var o={}
// var bValue;
// Object.defineProperty(o, 'b', {
//   get : function(){
//     return bValue;
//   },
//   set : function(newValue){
//     bValue = newValue;
//   },
//   enumerable : true,
//   configurable : true
// });
// o.b = 38;// 对象o拥有了属性b，值为38
// console.log(bValue) //38
// console.log(o.b,o)  //38 { b: [Getter/Setter] }
// 重点1：该方法允许精确添加或修改对象的属性。通过赋值操作添加的普通属性是可枚举的，能够在属性枚举期间呈现出来（for...in 或 Object.keys 方法）， 这些属性的值可以被改变，也可以被删除。
// 这个方法允许修改默认的额外选项（或配置）。默认情况下，使用 Object.defineProperty() 添加的属性值是不可修改的。
// let obj = {a:1}
// console.log(Object.getOwnPropertyDescriptor(obj,'a'))  //{ value: 1, writable: true, enumerable: true, configurable: true }
// 重点2:在ES6中，由于 Symbol类型的特殊性，用Symbol类型的值来做对象的key与常规的定义或修改不同，而Object.defineProperty 是定义key为Symbol的属性的方法之一。

// 4.Object.defineProperties(obj,props) : 直接在一个对象上定义新的属性或修改现有属性，并返回该对象。 
// 重点：属性中必须存在enumerable属性描述符
// let obj = {}
// Object.defineProperties(obj,{
//     'a':{
//         value:1,
//         enumerable:true,
//         writable:true,
//         configurable:true
//     },
//     'b':{
//         value:23,
//         enumerable:true,
//     },
//     'c':{
//         value:33,
//         configurable:true
//     },
//     'd':{
//         value:344,
//         writable:true
//     },
//     'e':{
//         enumerable:true
//     }
// }) 
// console.log(obj) //{ a: 1, b: 23, e: undefined }

// 5.Object.entries(obj) : 返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致。
// 区别:entries循环的是自身的可枚举属性,for-in循环自身和原型链上的可枚举属性。
// log(Object.entries({a:1,b:2})) //[ [ 'a', 1 ], [ 'b', 2 ] ]
// let obj = {a:1}
// let obj2 = {c:3}
// Object.setPrototypeOf(obj,obj2)
// Object.defineProperty(obj,'b',{
//     value:2,
//     enumerable:false
// })
// log(Object.entries(obj))  //[ [ 'a', 1 ] ]
// new Map() 构造函数接受一个可迭代的entries。借助Object.entries方法你可以很容易的将Object转换为Map:
// let obj = {a:1,b:2}
// let map = new Map(Object.entries(obj))
// log(map)  //Map { 'a' => 1, 'b' => 2 }

// 6.Object.fromEntries(iterable) : 是Object.entries()的逆操作，用于将一个键值对数组转为对象。
// log(Object.fromEntries([['a',1],['b',2]])) //{ a: 1, b: 2 }
// 用法：该方法的一个用处是配合URLSearchParams对象，将查询字符串转为对象。
// log(Object.fromEntries(new URLSearchParams('foo=bar&a=2'))) //{ foo: 'bar', a: '2' }
// let str = 'foo=bar&a=2'
// log(Object.fromEntries(str.split('&').map(item=>{
//     return item.split('=')
// }))) //{ foo: 'bar', a: '2' }

// 7.Object.freeze(obj) : 可以冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的属性描述符。
// 此外，冻结一个对象后该对象的原型也不能被修改。freeze() 返回和传入的参数相同的对象。
// const obj = {prop:42}
// Object.freeze(obj)
// obj.prop=1
// console.log(obj.prop)  //42
// 区别：如果一个属性的值是个对象，则这个对象中的属性是可以修改的，除非它也是个冻结对象
// let obj = {
//     a:{
//         b:2
//     }
// }
// Object.freeze(obj)
// obj.a = 2
// obj.a.b = 3
// log(obj) //{ a: { b: 3 } }
// 数组作为一种对象，被冻结，其元素不能被修改。没有数组元素可以被添加或移除。
// let arr = [1,2,3]
// Object.freeze(arr)
// arr[0] = 5
// console.log(arr)  // [ 1, 2, 3 ]

// 8.Object.seal(obj) : 封闭一个对象，阻止添加新属性并将所有现有属性configurable为false。当前属性的值只要原来是可写的就可以改变。
// 密封：不能增加属性，并且属性描述符configurable改为false，也就是不能够修改其他属性描述符

// 9.Object.preventExtensions(obj) : 让一个对象变的不可扩展，也就是永远不能再添加新的属性(但是可以删除或者修改)。
// 扩展：不能增加属性

// 10.Object.getOwnPropertyDescriptor(obj,prop) : 返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）
// let obj = {a:1}
// log(Object.getOwnPropertyDescriptor(obj,'a')) //{ value: 1, writable: true, enumerable: true, configurable: true }

// 11.Object.getOwnPropertyDescriptors(obj) : 用来获取一个对象的所有自身属性的描述符。
// 拓展：浅拷贝
// let obj = {a:1}
// log(Object.create(Object.getPrototypeOf(obj),Object.getOwnPropertyDescriptors(obj)))

// 12.Object.getOwnPropertyNames() : 返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。
// let obj = {a:1,b:2,c:3}
// let arr = [1,2,3,4]
// log(Object.getOwnPropertyNames(obj)) //[ 'a', 'b', 'c' ]
// log(Object.getOwnPropertyNames(arr)) //[ '0', '1', '2', '3', 'length' ]

// 13.Object.getOwnPropertySymbols() 方法返回一个给定对象自身的所有 Symbol 属性的数组。

// 14.Object.keys(obj) : 返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 。

// 15.Object.values(obj) : 返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用for...in循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。

// 16.Object.getPrototypeOf(obj) : 返回指定对象的原型(内部[[prototy]]属性的值)
// const prototype1 = {};
// const object1 = Object.create(prototype1);
// console.log(Object.getPrototypeOf(object1) === prototype1) //true

// 17.Object.is(value1, value2) : 判断两个值是否是相同的值。
// let arr = []
// arr1 = arr
// console.log(Object.is(arr,arr1)) //true
// let foo = {a:1}
// let bar = {a:1}
// console.log(Object.is(foo,bar)) //false
// console.log(Object.is(undefined,undefined)) //true
// console.log(Object.is(null,undefined)) //false
// console.log(Object.is(0,-0)) //false
// console.log(Object.is(0,+0)) //true

// 18.Object.isExtensible(obj) : 判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）。
// 重点：默认情况下，对象是可扩展的：即可以为他们添加新的属性。以及它们的 __proto__ 属性可以被更改。
// Object.preventExtensions，Object.seal 或 Object.freeze 方法都可以标记一个对象为不可扩展（non-extensible）。
// let obj = {}
// Object.seal(obj)
// log(Object.isExtensible(obj)) //false

// 19.Object.isSealed(obj) : 判断一个对象是否被密封。
// 重点： 密封对象是指那些不可扩展的，且所有自身属性都不可配置且因此不可删除（但不一定是不可写）的对象。
// 如果是空对象进行preventExtensions，那么isSealed为true
// let obj = {}
// let obj1 = {a:1}
// Object.preventExtensions(obj)
// console.log(Object.isSealed(obj))  //true
// Object.preventExtensions(obj1)
// console.log(Object.isSealed(obj1)) //false

// 20.Object.isFrozen(obj) :判断一个对象是否被冻结。
// 重点：一个对象是冻结的是指它不可扩展，所有属性都是不可配置的，且所有数据属性（即没有getter或setter组件的访问器的属性）都是不可写的。
// let obj={a:1}
// Object.seal(obj)
// console.log(Object.isFrozen(obj)) //false
// Object.preventExtensions(obj)
// console.log(Object.isFrozen(obj)) //false
// Object.freeze(obj)
// console.log(Object.isFrozen(obj))//true


// 原型方法
// 1.Object.prototype.hasOwnProperty(prop) : 返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。
// 所有继承了 Object 的对象都会继承到 hasOwnProperty 方法。这个方法可以用来检测一个对象是否含有特定的自身属性；和 in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。
// let obj = {a:1}
// log(obj.hasOwnProperty('a')) //true
// log(obj.hasOwnProperty('hasOwnProperty')) //false

// 2.Object.prototype.isPrototypeOf(object) : 用于测试一个对象是否存在于另一个对象的原型链上。
// 区别：isPrototypeOf() 与 instanceof 运算符不同。在表达式 "object instanceof AFunction"中，object 的原型链是针对 AFunction.prototype 进行检查的，而不是针对 AFunction 本身。

// 3.Object.prototype.propertyIsEnumerable(prop) ： 返回一个布尔值，表示指定的属性是否可枚举。
// let obj = {a:1} 
// log(obj.propertyIsEnumerable('a')) //true

// 4.Object.prototype.toString() : 返回一个表示该对象的字符串。

// 5.Object.prototype.valueOf() : 返回指定对象的原始值。