
/* 
https://juejin.cn/post/6844903782229213197#heading-2
*/


function Person(name,age){
    this.name = name
    this.age = age
    this.eat = function(){
        console.log(age + '岁的' + name + '在吃饭')
    }
}
// let p1 = new Person ('ikki',24)
// let p2 = new Person ('ikki',24)
// p1.eat() //24岁的ikki在吃饭
// p2.eat() //24岁的ikki在吃饭
// console.log(p1.eat === p2.eat) //false

function Person(name,age){
    this.name = name
    this.age = age
    this.eat = function(){
        console.log(age + '岁的' + name + '在吃饭')
    }
}
Person.prototype.eat = function(age,name){
    console.log(age + '岁的' + name + '在吃饭'+'haha')
}
let p1 = new Person ('ikki',24)
let p2 = new Person ('ikki',24)
console.log(p1.eat === p2.eat) 
p1.eat() //24岁的ikki在吃饭 
p1.__proto__.eat('kka',2) //kka岁的2在吃饭haha



