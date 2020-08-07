// function create(proto){
//     function Fn(){}
//     Fn.prototype = proto
//     return new Fn()
// }

// function Parent(name){
//     this.name = name
// }
// Parent.prototype.say=function(){
//     console.log('我是爸爸')
// }
// function Child(name,age){
//     Parent.call(this,name)
//     this.age = age
// }
// Child.prototype = Object.create(Parent.prototype)
// Child.prototype.constructor = Child
// var child = new Child('cxk', 'father');
