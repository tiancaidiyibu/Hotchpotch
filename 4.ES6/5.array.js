const { log } = console
// 1.扩展运算符
// 可以理解成 rest运算符的逆向。
// 应用：
// (1).复制数组 ： es5通过concat来复制数组，这样改变新数组不会对原数组发生变化
// const arr1 = [1,2]
// const arr2 = [...arr1]  //或者
// const [...arr3] = arr1
// (2).合并数组 ==>浅拷贝
// const arr1 = [1,2]
// const arr2 = [3]
// const arr3 = [4,5]
// log([...arr1,...arr2,...arr3]) //[ 1, 2, 3, 4, 5 ]
// (3).与解构赋值结合
// 重点：如果扩展运算符用于解构赋值，那么只能放在最后一位，否则报错
// const [a, ...b] = [1,2,3,4] //a=1 b=[ 2, 3, 4 ]
// const [a, ...b] = [] //a=undefined b=[]
// const [...a, b] = [1,2,3,4]  //error
// (4).字符串 扩展运算符可以将字符串转化成数组
// const arr = [...'123'] //arr=[1,2,3]
// (5).实现了 Iterator 接口的对象
// 任何定义了遍历器（Iterator）接口的对象，都可以用扩展运算符转为真正的数组。
// const arr = [...new Set([1,2,3])] //arr = [1,2,3]




// 构造函数方法
// 1.Array.from(arrayLike[, mapFn[, thisArg]]) 
// 用于将两类对象转为真正的数组：类数组和 Iterator 接口的对象（包括 ES6 新增的数据结构 Set 和 Map）。
// let arrLike = {
//     '0': 'a',
//     '1': 'b',
//     length: 2
// }
// log(Array.prototype.slice.call(arrLike)) //[ 'a', 'b' ]
// log(Array.from(arrLike)) //[ 'a', 'b' ]
// 与扩展运算符区别:Array.from()可以将具有length属性的对象都转换成数组，而扩展运算符不行
// log([...arrLike])  //TypeError: arrLike is not iterable
// Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
// log(Array.from(arrLike,x=>x+'z'))  //[ 'az', 'bz' ]   等同于
// log(Array.from(arrLike).map(x=>x+'z'))

// 2.Array.of(element0[, element1[, ...[, elementN]]])：创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。
// Array.of() 和 Array 构造函数之间的区别在于处理整数参数：Array.of(7) 创建一个具有单个元素 7 的数组，而 Array(7) 创建一个长度为7的空数组（注意：这是指一个有7个空位(empty)的数组，而不是由7个undefined组成的数组）。 
// log(Array.of(7)) //[ 7 ]
// log(Array.of('a','b')) //[ 'a', 'b' ]
// log(new Array(7)) //[ <7 empty items> ]

// 3.Array.isArray(obj)



// 原型方法
// A.不改变原数组
// 1.Array.prototype.concat(value1[, value2[, ...[, valueN]]]) : 用于合并两个或多个数组。
// log([].concat(2))  //[2]
// log([].concat([2,3,[4]])) //[ 2, 3, [ 4 ] ]

// 2.Array.prototype.keys() :返回一个包含数组中每个索引键的Array Iterator对象。
// let keysArr = [1,2,3].keys()  //Object [Array Iterator] {}
// for (const iterator of keysArr) {
//     console.log(iterator)  //0 1 2
// }

// 3.Array.prototype.values() : 回一个新的 Array Iterator 对象，该对象包含数组每个索引的值
// let valuesArr = [1,2,3].values()  //Object [Array Iterator] {}
// for (const iterator of valuesArr) {
//     console.log(iterator)  // 1 2 3
// }

// 4.Array.prototype.entries(): 返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对。
// log([1,2,3,[4]].entries())  //Object [Array Iterator] {}

// 5.Array.prototype.includes(valueToFind[, fromIndex]) : 用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。
// log([1,2,3].includes(2)) //true
// log([1,2,3].includes(2,2)) //false

// 6.Array.prototype.indexOf(searchElement[, fromIndex]) : 返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。
// log([1,2,3,4,3,2].indexOf(4))  //3

// 7.Array.prototype.lastIndexOf(searchElement[, fromIndex]) : 返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找，从 fromIndex 处开始。 
// console.log([1,2,3].lastIndexOf(2)) //1
// console.log([1,2,3].lastIndexOf(2,-1)) //1

// 8.Array.prototype.join([separator]) : 将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符.
// log([1,2,3].join('')) //'123'
// log([1,2,3].join(' ')) //'1 2 3'
// log([1,2,3].join()) //1,2,3
// log([1,2,3].join('-'))  //1-2-3

// 9.Array.prototype.slice([beginIndex[, endIndex]]) : 返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。
// endIndex: 如果是负数，则endIndex+arrlength处结束，如果省略或者大于数组长度，则会endIndex=arrlength。
// log([0,1,2,3,4].slice(2,4)) //[2, 3]
// log([0,1,2,3,4,5].slice(2,-1)) //[2, 3, 4]

// 10.Array.prototype.toString() : 返回一个字符串，表示指定的数组及其元素。
// log([1,2,3,'a','b'].toString()) //1,2,3,a,b

// 11.Array.prototype.find(callback(value,index,array)[, thisArg]) : 返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
// 理解：寻找回调函数中满足条件的第一项的item返回
// log([1,2,3,4,2,3].find((item, index) => item>2)) //3

// 12.Array.prototype.findIndex(callback(value,index,array)[, thisArg]) : 返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。
// 理解：寻找回调函数中满足条件的第一项的index返回
// log([1,2,3,3,2,1].findIndex((item,index)=>item>2))  //2

// 13.Array.prototype.some(callback(value,index,array)[, thisArg]) : 测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。
// 理解：寻找回调函数中满足条件，只要有一项满足就返回true
// log([1,2,3,4,3,2].some((item,index)=>item>3)) //true

// 14.Array.prototype.every(callback(value,index,array)[, thisArg]) : 测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。
// 理解：寻找回调函数中满足条件，必须全部满足就返回true
// log([1,2,3,4,3,2,1].every(item=>item>3)) //false

// 15.Array.prototype.filter(callback(value,index,array)[, thisArg]) : 创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。
// 理解：寻找回调函数中满足条件，满足条件的item组成新数组返回
// log([1,2,3,4,3,2,1].filter(item => item>2)) //[ 3, 4, 3 ]

// 16.Array.prototype.map(callback(value,index,array)[, thisArg]) : 创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
// log([1,2,3,4,3,2,1].map(item => item*2))  //[2, 4, 6, 8, 6, 4, 2]

// 17.Array.prototype.forEach(callback(value,index,array)[, thisArg]) : 对数组的每个元素执行一次提供的函数。
// "123nssa".split('').forEach(item=>console.log(item)) //1 2 3 4 n s s a

// 18.Array.prototype.reduce(callback(previousValue,currentValue,index,array)[initalValue]) : 对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
// let arr = ['A','B','C','B','C','B']
// let newArr = arr.reduce((pre,item,index)=>{
//     if(item in pre){
//         pre[item]++
//     }else{
//         pre[item] = 1
//     }
//     return pre
// },{})
// log(newArr)  //{ A: 1, B: 3, C: 2 }
// let arr = [1,2,3,[2,[3]],[2,[3,[4]]]]
// function newArr(arr){
//     return arr.reduce((pre,item,index)=>{
//         return pre.concat(Array.isArray(item)&&newArr(item)||item)
//     },[])
// }
// log(newArr(arr))

// 19.Array.prototype.flat([depth]): 会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
// let arr = [1,2,3,[2,[3]],[2,[3,[4]]]]
// log(arr.flat(3))



// B.改变原数组
// 1.Array.prototype.copyWithin(target[, start[, end]]) : 浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度,但会改变数组组成
// target: 复制序列到该位置。如果是负数，target 将从末尾开始计算。target>arr.length将不会发生拷贝。如果target在start之后，复制的序列将会被修改以符合arr.length
// start: 复制元素的起始，如果是负数，start从末尾开始计算。如果start被忽略，copyWithin将从0开始计算。
// end: 复制元素结束的位置。但不包括end结束的这个元素。如果是负数，则从末尾开始计算。如果被忽略，copyWithin将会一直复制到数组末尾。
// let arr = [1,2,3]
// log(arr.copyWithin(2)) //[1,2,1]  arr=[1,2,1]
// log(arr.copyWithin(-2)) //[1,1,2]
// log(arr.copyWithin(-2,-3,-1)) //[1,1,2]

// 2.Array.prototype.fill(value[, start[, end]]) : 用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引
// let arr = [1,2,3]
// arr.fill(6)
// log(arr) //[6,6,6]

// 4.Array.prototype.pop() : 从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。
// let arr=[1,2,3]
// log(arr.pop(),arr) //3  ,  arr=[1,2]

// 5.Array.prototype.push(ele,[, eleN]) : 将一个或多个元素添加到数组的末尾，并返回该数组的新长度。
// let arr = [1,2,3]
// log(arr.push(4),arr) //4   ,  arr=[1,2,3,4]

// 6.Array.prototype.shift() : 从数组中删除第一个元素，并返回该元素的值。
// let arr = [1,2,3]
// log(arr.shift(),arr) //1   ,  arr=[2,3]

// 7.Array.prototype.unshift(element1, ..., elementN) : 将一个或多个元素添加到数组的开头，并返回该数组的新长度(该方法修改原有数组)
// let arr = [1,2,3]
// log(arr.unshift(6),arr)  //4  , arr=[6,1,2,3]

// 8.Array.prototype.reverse() : 将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组。
// let arr = [1,2,3]
// log(arr.reverse(), arr) //[ 3, 2, 1 ]  arr=[ 3, 2, 1 ]
// log('sdsds33211'.split('').reverse().join(''))  //'11233sdsds'

// 9.Array.prototype.sort([compareFunction]) : 用原地算法对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的
// let arr = [1,2,3,4,4,23,2,34,345,2]
// console.log(arr.sort((a,b)=&gt;a-b)) //[1,2,2,2,3,4,4,23,34,345]
// console.log(arr.sort((a,b)=&gt;b-a)) //[345, 34, 23, 4, 4,3,  2,  2, 2, 1]

// 10.Array.prototype.splice(start[, deleteCount[, item1[, item2[, ...]]]]) : 通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。
// start:指定修改的开始位置（从0计数）。如果start>length，则从数组末尾开始添加内容；start<0，则表示从start+length）；如果|start|>length，则表示开始位置为第0位。
// deleteCount:移除元素的个数
// let arr = [1,2,3,4,5]
// log(arr.splice(0,2,7),arr) //[1,2] ,  arr=[7,3,4,5]
























































