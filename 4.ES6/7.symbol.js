const { log } = console

// 概述 ：独一无二的基础数据类型
// 注意，Symbol函数前不能使用new命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。
// 也就是说，由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。
// let syb = new Symbol('a') //TypeError: Symbol is not a constructor
// 如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值。
// const obj = {
//     toString(){
//         return 'ab'
//     }
// }
// log(Symbol(obj)) //Symbol(ab)
// Symbol 值不能与其他类型的值进行运算，会报错。
// let sym = Symbol(12)
// log('i am'+sym) //TypeError: Cannot convert a Symbol value to a string
// Symbol 值可以显式转为字符串。
// log(String(Symbol('ab')),typeof String(Symbol('ab'))) //Symbol(ab) string
// Symbol 值也可以转为布尔值，但是不能转为数值。
// log(Boolean(Symbol(12))) //true
// log(Number(Symbol(12))) //TypeError: Cannot convert a Symbol value to a number
// Symbol 值作为对象属性名时，不能用点运算符。
// const mySymbol = Symbol();
// const a = {};
// a.mySymbol = 'Hello!';
// a[mySymbol] // undefined
// a['mySymbol'] // "Hello!"


// 1.Symbol.prototype.description 创建symbol时候，可以添加一个描述
// let sym = Symbol('asdf')
// log(sym.description) //'asdf'

