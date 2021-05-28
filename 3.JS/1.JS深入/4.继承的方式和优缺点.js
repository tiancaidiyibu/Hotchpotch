// 1.原型链继承
/* 
    缺点：
        1.引用类型的属性被所有实例共享
        2.创建子实例时候，不能向父构造函数传参
*/
// function Parent(){
//     this.name = ['ikki','lucky']
// }
// Parent.prototype.getName = function(){
//     console.log(this.name);
// }
// function Child(){}
// Child.prototype = new Parent()
// var child1= new Child()
// child1.name.push('haha')
// var child2= new Child()
// console.log(child1.name) //[ 'ikki', 'lucky', 'haha' ]
// console.log(child2.name) //[ 'ikki', 'lucky', 'haha' ]  造成了引用类型的属性被所有实例共享
// console.log(child1.__proto__.__proto__ === Parent.prototype) //true

// 2.构造函数继承
/* 
    优点：
        1.避免了引用类型的属性被所有实例共享
        2.可以在 子构造函数 中向 父构造函数 传参
    缺点：
        1.方法都在构造函数中定义，每次创建实例都会创建一遍方法。
        2.父构造函数的原型不会被继承
*/
// function Parent (age) {
//     this.names = ['kevin', 'daisy'];
//     this.age = age
// }
// Parent.prototype.getName = function(){
//     console.log(this.name);
// }
// function Child (age) {
//     Parent.call(this,age);
// }
// var child1 = new Child(65);
// child1.names.push('yayu');
// console.log(child1.names); // ["kevin", "daisy", "yayu"]
// console.log(child1.age) //65
// var child2 = new Child(60);
// console.log(child2.names); // ["kevin", "daisy"]
// console.log(child2.age) //60

// 3.组合继承
/* 
    缺点：
        1.两次调用了父构造函数，因此子实例和子实例的原型都有相同的父级属性
*/
// function Parent (name) {
//     this.name = name;
//     this.colors = ['red', 'blue', 'green'];
// }
// Parent.prototype.getName = function () {
//     console.log(this.name)
// }
// function Child (name, age) {
//     Parent.call(this, name);
//     this.age = age;
// }
// Child.prototype = new Parent();
// var child1 = new Child('kevin', '18');
// console.log(child1.colors, child1.__proto__.colors,child1.colors === child1.__proto__.colors)  //[ 'red', 'blue', 'green' ] [ 'red', 'blue', 'green' ] false
// child1.colors.push('black');
// console.log(child1.name); // kevin
// console.log(child1.age); // 18
// console.log(child1.colors); // ["red", "blue", "green", "black"]
// var child2 = new Child('daisy', '20');
// console.log(child2.name); // daisy
// console.log(child2.age); // 20
// console.log(child2.colors); // ["red", "blue", "green"]


// 4.原型式继承 : 就是 ES5 Object.create 的模拟实现，将传入的对象作为创建的对象的原型。
/* 
    缺点：
        1.包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。
*/
// function createObj(o){
//     function Fn(){}
//     Fn.prototype = o
//     return new Fn()
// }  
// var person = {
//     name:'ikki',
//     friends:['daisy', 'kelly']
// }
// var person1 = createObj(person);
// var person2 = createObj(person);
// person1.name= 'pig'
// console.log(person2.name) //ikki    修改person1.name的值，person2.name的值并未发生改变，并不是因为person1和person2有独立的 name 值，而是因为person1.name = 'person1'，给person1添加了 name 值，并非修改了原型上的 name 值。
// person1.friends.push('taylor');
// console.log(person2.friends); // ["daisy", "kelly", "taylor"]
// console.log(person1.__proto__.friends);

// 5. 寄生式继承: 创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。
/*
    缺点：
        1.跟借用构造函数模式一样，每次创建对象都会创建一遍方法。
*/
// function createObj(o){
//     var clone = Object.create(o)
//     clone.sayName = function(){
//         console.log('hi')
//     }
//     return clone
// }

// 6. 寄生组合式继承
// function Parent (name) {
//     this.name = name;
//     this.colors = ['red', 'blue', 'green'];
// }
// Parent.prototype.getName = function () {
//     console.log(this.name)
// }
// function Child (name, age) {
//     Parent.call(this, name);
//     this.age = age;
// }

// var F = function(){}
// F.prototype = Parent.prototype
// Child.prototype = new F()
// // 或者
// function createPrototype(Child,Parent){
//     var prototype = Object.create(Parent.prototype)
//     prototype.constructor = Child
//     Child.prototype = prototype
// }
// createPrototype(Child,Parent)
// var child = new Child('ikki',18)
