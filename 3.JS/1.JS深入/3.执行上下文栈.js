// js可执行代码分为：全局代码，函数代码，eval代码

// 当js执行代码时，先遇到全局代码，因此会向执行上下文栈中压入一个全局执行上下文globalContext，只有当整个程序执行结束，ECStack才会被清空。
// 所有ECStack最底部永远是全局执行上下文globalContext  ====>>>>>  ECStack = [ globalContext ]

/* 
执行上下文有3个重要的属性,分别是：
1.变量对象(VO)
2.作用域链
3.this
*/

// 1 变量对象
// 变量对象是与当前执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明。
// 全局上下文的变量对象就是全局对象，例如window。
// 函数上下文中用活动对象(AO)来表示变量对象，AO其实和VO是同一个东西，但是AO只能在进入当前执行上下文时这个执行上下文的变量对象才被激活。
// AO是进入函数执行上下文的时候被创建的，通过函数的arguments属性来进行初始化。  
// 执行上下文分为两个阶段：分析和执行，也就是：
// 1.1 进入执行上下文(还没有执行代码)，这时候变量对象包括：
// 1.1.1 函数的所有形参（由名称和对应值组成的一个变量对象的属性被创建，没有实参，属性值设为undefined）
// 1.1.2 函数声明（由名称和对应值（函数对象(function-object)）组成一个变量对象的属性被创建，如果变量对象已经存在相同名称的属性，则完全替换这个属性）
// 1.1.3 变量声明（由名称和对应值（undefined）组成一个变量对象的属性被创建；如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性）
// function foo(a) {
//     var b = 2;
//     function c() {}
//     var d = function() {};
//     b = 3;
// }
// foo(1);
// 进入执行上下文后,这时候AO是：
// AO = {
    // arguments: {
    //     0: 1
    //     length: 1
    // },
    // a: 1,
    // b: undefined,
    // c: reference to function c(){},
    // d: undefined
// }
// 1.2 代码执行（在代码执行阶段，会顺序执行代码，根据代码，修改变量对象的值）
// AO = {
//     arguments: {
//         0: 1,
//         length: 1
//     },
//     a: 1,
//     b: 3,
//     c: reference to function c(){},
//     d: reference to FunctionExpression "d"
// }

// 2 作用域链
// 当查找变量的时候，会先从当前执行上下文的变量对象中查找，如果没有找到，就会从词法层面的父级执行上下文的变量对象中查找，一直找到全局执行上下文的变量对象。
// 这样由多个执行上下文的变量对象构成的链表就叫做作用域链
// 2.1 函数创建
// JS词法作用域中，函数作用域在函数被定义的时候就决定了。因为函数有个内部属性[[scope]]。
// [[scope]]当函数创建的时候，就会保存所有父变量对象到其中，你可以理解 [[scope]] 就是所有父变量对象的层级链，但是注意：[[scope]] 并不代表完整的作用域链！
// 例子：
// function foo(){
//     function bar(){}
// }  函数被创建时，各自的[[scope]]为：
// foo.[[scope]] = [ globalcontext.VO ]
// bar.[[scope]] = [ foocontext.AO , globalcontext.VO ]
// 2.2 函数激活
// 当函数激活时，进入函数上下文，创建 VO/AO 后，就会将活动对象添加到作用链的前端。这时候执行上下文的作用域链，Scope = [AO].concat([[Scope]]);


// 剖析
// var scope = "global scope";
// function checkscope(){
//     var scope = "local scope";
//     function f(){
//         return scope;
//     }
//     return f();
// }
// checkscope();
// 1.首先执行全局上下文，将全局执行上下文压入到执行上下文栈中
// ECStack = [ globalContext ]
// 2.全局执行上下文初始化，vo，this，scope
// globalContext = {
//     Scope: [globalContext.VO],
//     VO: [global, scope, checkscope],
//     this: globalContext.VO
// }
// 3.在初始化的同时，函数checkscope被创建，保存父级作用域到函数scope属性中
// checkscope.[[scope]] = [ globalContext.VO ]
// 4.执行函数，创建函数执行上下文，将函数上下文压入到执行上下文栈中
// ECStack = [ checkscopeContext, globalContext ]
// 5.函数执行上下文初始化，复制scope属性创建作用域链，用arguments创建活动对象，初始化活动对象，加入形参，实参，函数声明，变量声明，将活动对象放到作用域链顶端
// checkscopeContext = {
//     Scope: [AO,globalContext.VO],
//     AO: {
//         arguments: {
//             length: 0
//         },
//         scope: undefined,
//         f: reference to function f(){}
//     }
//     this: undefined
// }
// 6.f函数被创建，保存父级作用域到函数scope属性中
// 7.执行 f 函数，创建 f 函数执行上下文，f 函数执行上下文被压入执行上下文栈
// ECStack = [fContext,checkscopeContext,globalContext ];
// 8.执行f函数上下文初始化，复制scope创建作用域链，用arguments创建活动对象，初始化活动对象，加入实参，形参，函数声明，变量声明，将活动对象放到作用域链顶端
// 9.f 函数执行，沿着作用域链查找 scope 值，返回 scope 值
// 10.f 函数执行完毕，f 函数上下文从执行上下文栈中弹出
// 11.checkscope 函数执行完毕，checkscope 执行上下文从执行上下文栈中弹出




// 闭包就是能够访问自由变量的函数，自由变量也就是既不是函数的参数，也不是函数的局部变量的变量 ==》》闭包=函数+函数能够访问的自由变量
// 从实践的角度来说：
// 1.当前创建他的上下文已经销毁了，但它还是存在(比如内部函数从父函数中返回)
// 2.在代码中能够获取自由变量
// 最大的作用就是隐藏变量，内部函数总是可以访问其所在的外部函数的参数以及函数
