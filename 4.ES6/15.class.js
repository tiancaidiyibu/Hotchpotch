const { log } = console


// function P(x,y){
//     this.x = x;
//     this.y = y
// }
// P.prototype.say = function(){}
// 等同于
// class P{
//     constructor(x,y){
//         this.x = x;
//         this.y = y
//     }
//     say(){}
// }
//重点： ES6 的类，完全可以看作构造函数的另一种写法。
// log(P.prototype.constructor === P) //true
// 事实上，类的所有方法都定义在类的prototype属性上面。
// P.prototype = {
//     constructor(){},
//     say(){}
// }
// 因此，在类的实例上面调用方法，其实就是调用原型上的方法。
// class B{}
// const b = new B()
// log(b.constructor === B.prototype.constructor) //true
// log(b.constructor === B) //true
// 类的内部所有定义的方法，都是不可枚举的（non-enumerable）。

// constructor()方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor()方法，如果没有显式定义，一个空的constructor()方法会被默认添加。
// class P{} //等同于   class P{ constructor(){} }

// constructor()方法默认返回实例对象（即this），完全可以指定返回另外一个对象。
// class P{
//     constructor(){
//         return Object.create(null)
//     }
// }
// log(new P() instanceof P) //false
// function Fn(){
//     return {}
// }
// log(new Fn() instanceof Fn) //false


// 与 ES5 一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。
//定义类
// class Point {
//     constructor(x, y) {
//       this.x = x;
//       this.y = y;
//     }
//     toString() {
//       return '(' + this.x + ', ' + this.y + ')';
//     }
// }
// var point = new Point(2, 3);
// point.toString() // (2, 3)
// point.hasOwnProperty('x') // true
// point.hasOwnProperty('y') // true
// point.hasOwnProperty('toString') // false
// point.__proto__.hasOwnProperty('toString') // true
// 与 ES5 一样，类的所有实例共享一个原型对象
// var p1 = new Point(2,3);
// var p2 = new Point(3,2);
// p1.__proto__ === p2.__proto__

// 与 ES5 一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
// class A {
//     get prop(){
//         return 'get prop'
//     }
//     set prop(value){
//         console.log('set prop',value)
//     }
// }
// let a = new A()
// a.prop = 2 //set prop 2
// log(a.prop) //get prop
// 存值函数和取值函数是设置在属性的 Descriptor 对象上的。
// let descriptor = Object.getOwnPropertyDescriptor(A.prototype,'prop')
// log( 'get' in descriptor ) //true
// log( 'set' in descriptor ) //true

// class使用注意点
// （1）严格模式
// 类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。
//  (2）不存在提升:类不存在变量提升（hoist），这一点与 ES5 完全不同。
// new P() //error
// class P{}
// （3）name 属性:ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被Class继承，包括name属性。
// class Point {}
// Point.name // "Point"
// （4）Generator 方法
// （5）this 的指向
// 类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。
// class Logger {
//     printName(name = 'there') {
//       this.print(`Hello ${name}`);
//     }
//     print(text) { }
// }
// const logger = new Logger();
// const { printName } = logger;
// printName(); // TypeError: Cannot read property 'print' of undefined
// 上面代码，printName方法中的this，默认指向Logger类的实例。但是，如果将这个方法提取出来单独使用，this会指向该方法运行时所在的环境（由于 class 内部是严格模式，所以 this 实际指向的是undefined），从而导致找不到print方法而报错。
// 1.一个比较简单的解决方法是，在构造方法中绑定this，这样就不会找不到print方法了
// constructor() {
//     this.printName = this.printName.bind(this);
// }
// 2.另一种解决方法是使用箭头函数。箭头函数内部的this总是指向定义时所在的对象。



// 静态方法
// 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
// 注意，如果静态方法包含this关键字，这个this指的是类，而不是实例。
// class F{
//     static bar(){
//         this.baz()
//     }
//     static baz(){
//         console.log('hello')
//     }
//     baz(){
//         console.log('你好')
//     }
// }
// F.bar() //hello
// 父类的静态方法，可以被子类继承。
// 静态方法也是可以从super对象上调用的。
// class C extends F{
//     static ex(){
//         return super.bar()
//     }
// }
// C.bar() //hello
// C.ex() //hello

// 实例属性除了定义在constructor()方法里面的this上面，也可以定义在类的最顶层。
// class IncreasingCounter {
//     _count = 0;
//     get value() {
//       console.log('Getting the current value!');
//       return this._count;
//     }
//     increment() {
//       this._count++;
//     }
// }
// 这种新写法的好处是，所有实例对象自身的属性都定义在类的头部，看上去比较整齐，一眼就能看出这个类有哪些实例属性。

// 静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。
// class Foo{}
// Foo.prop = 1
// log(Foo.prop) //1
// 或者新写法
// class Foo{
//     static prop = 2
// }
// log(Foo.prop)  //2



// Class 可以通过extends关键字实现继承，继承了父类的所有属性和方法。
// 子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，
// 得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。
// class ColorPoint extends Point {
//     constructor(x, y, color) {
//       super(x, y); // 调用父类的constructor(x, y)
//       this.color = color;
//     }
//     toString() {
//       return this.color + ' ' + super.toString(); // 调用父类的toString()
//     }
// }
// ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。
// ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。
// 如果子类没有定义constructor方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有constructor方法。
// class Child extends Parent{} //等于
// class Child extends Parent {
//     constructor(...args){
//         super(...args)
//     }
// }
// 另一个需要注意的地方是，在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，基于父类实例，只有super方法才能调用父类实例。
// class Parent{
//     constructor(x,y){
//         this.x = x
//         this.y = y
//     }
// }
// class Child extends Parent {
//     constructor(x, y, color){
//         this.color = color //error
//         super(x,y)
//         this.color = color
//     }
// }
// let child = new Child(1,2,'red')
// log(Object.getPrototypeOf(Child) === Parent) //true


// super这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。
// 第一种情况，super作为函数调用时，代表父类的构造函数。(只能在constructor中存在)
// super内部的this指的是B的实例，因此super()在这里相当于A.prototype.constructor.call(this)
// 第二种情况，super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
// 这里需要注意，由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。
// 如果属性定义在父类的原型对象上，super就可以取到。
// ES6 规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。
// 由于this指向子类实例，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。
// class A {
//     constructor(){
//         this.n = 2
//     }
//     p() {
//       return 2;
//     }
//     foo(){
//         console.log(this.n)
//     }
// }
// A.prototype.x = 3;
// class B extends A {
//     constructor() {
//       super();
//       this.n = 1
//       console.log(super.p()); // 2
//       console.log(super.n) //undefined
//       console.log(super.x) //3
//     }
//     m(){
//         super.foo()
//     }
// }
// let b = new B();
// b.m() //1

// 如果super作为对象，用在静态方法之中，这时super将指向父类，而不是父类的原型对象
// 在子类的静态方法中通过super调用父类的方法时，方法内部的this指向当前的子类，而不是子类的实例。
// class Parent {
//     constructor() {
//         this.x = 1;
//     }
//     static print() {
//         console.log(this.x);
//     }
//     static myMethod(msg) {
//       console.log('static', msg);
//     }
//     myMethod(msg) {
//       console.log('instance', msg);
//     }
// }
// class Child extends Parent {
//     constructor() {
//         super();
//         this.x = 2;
//     }
//     static x = 3
//     static myMethod(msg) {
//       super.myMethod(msg);
//     }
//     myMethod(msg) {
//       super.myMethod(msg);
//     }
//     static m() {
//         super.print();
//     }
// }
// Child.myMethod(1); // static 1
// var child = new Child();
// child.myMethod(2); // instance 2
// Child.m() //3

// 由于对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字。
// var obj = {
//     toString() {
//       return "MyObject: " + super.toString();
//     }
// };
// obj.toString(); // MyObject: [object Object]

