const { log } = console


// Set
// 创建方式:const set = new Set([iterable])
// ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
// log([...new Set([1,2,3,1,12,4,2])])  //[ 1, 2, 3, 12, 4 ]
// 向 Set 加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。
// let set = new Set()
// set.add(1).add('1')
// log(set) //Set { 1, '1' }
// Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，它类似于精确相等运算符（===），主要的区别是向 Set 加入值时认为NaN等于自身，而精确相等运算符认为NaN不等于自身。因此两个对象总是不相等的
// let set = new Set()
// set.add(NaN).add(NaN)
// log(set) //Set { NaN }

// Set 实例的属性和方法
// let set = new Set([1,2,3,4,5])
// 实例属性
// (1).Set.prototype.size 返回Set实例的成员总数
// log(set.size) //5
// (2).Set.prototype.constructor：构造函数，默认就是Set函数。
// log(set.constructor) //[Function: Set]
// 实例方法：操作方法（用于操作数据）和遍历方法（用于遍历成员）
// 操作方法：
// (1).Set.prototype.add(value)：添加某个值，返回 Set 结构本身。 (支持链式操作)
// (2).Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
// (3).Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
// (4).Set.prototype.clear()：清除所有成员，没有返回值。
// set.add(6).add(7)
// log(set) //Set { 1, 2, 3, 4, 5, 6, 7 }
// log(set.delete(3)) //true
// log(set) //Set { 1, 2, 4, 5, 6, 7 }
// log(set.has(3)) //false
// set.clear()
// log(set) //Set {}
// 遍历方法:
// Set.prototype.keys()：返回键名的遍历器
// Set.prototype.values()：返回键值的遍历器
// Set.prototype.entries()：返回键值对的遍历器
// Set.prototype.forEach(callback[,thisArg])：使用回调函数遍历每个成员



// WeakSet
// WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。
// 1.WeakSet 的成员只能是对象，而不能是其他类型的值。




// Map
// 创建方式：const map = new Map([Iterator])
// 似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。
// const map = new Map()
// const o = {a:1}
// map.set(o,'haha')
// log(map.get(o)) //'haha'
// 任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构都可以当作Map构造函数的参数。这就是说，Set和Map都可以用来生成新的 Map。 
// const map = new Map(Object.entries({a:1}))
// log(map.has('a')) //true
// log(map.get('a')) //1
// 注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。
// const map = new Map();
// map.set(['a'], 555);
// map.get(['a']) // undefined

// 实例的属性和操作方法
// 属性
// (1).Map.prototype.size 实例的键值对个数
// const map = new Map(Object.entries({a:1}))
// log(map.size) //1

// 方法
// Map.prototype.set(key, value)为 Map 对象添加或更新一个指定了键（key）和值（value）的（新）键值对。
// Map.prototype.get(key) 读取key对应的键值，如果找不到key，返回undefined。
// Map.prototype.has(key) 方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。
// Map.prototype.delete(key) delete方法删除某个键，返回true。如果删除失败，返回false。
// Map.prototype.clear() 清除所有成员，没有返回值。

// Map.prototype.keys()：返回键名的遍历器。
// Map.prototype.values()：返回键值的遍历器。
// Map.prototype.entries()：返回所有成员的遍历器。
// Map.prototype.forEach(callback[, thisArg])：遍历 Map 的所有成员。



