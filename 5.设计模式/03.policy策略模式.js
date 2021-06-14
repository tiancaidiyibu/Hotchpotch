// 策略模式的定义：定义⼀系列的算法，把他们⼀个个封装起来，并且使他们可以相互替换。
// 策略模式的⽬的就是将算法的使⽤算法的实现分离开来。
// ⼀个基于策略模式的程序⾄少由两部分组成。第⼀个部分是⼀组策略类（可变），策略类封装了具体的
// 算法，并负责具体的计算过程。第⼆个部分是环境类Context（不变），Context接受客户的请求，随后
// 将请求委托给某⼀个策略类。要做到这⼀点，说明Context中要维持对某个策略对象的引⽤


// 奖⾦计算，绩效为 S 的⼈年 终奖有 4 倍⼯资，绩效为 A 的⼈年终奖有 3 倍⼯资，⽽绩效为 B 的⼈年终奖是 2 倍⼯资
// var calculateBonus = function( performanceLevel, salary ){
//     if ( performanceLevel === 'S' ){
//         return salary * 4;
//     }
//     if ( performanceLevel === 'A' ){
//         return salary * 3;
//     }
//     if ( performanceLevel === 'B' ){
//         return salary * 2;
//     }
// };
// calculateBonus( 'B', 20000 ); // 输出:40000
// calculateBonus( 'S', 6000 ); // 输出:24000


// 新的策略，就扩展这个对象
// 可以使用配置文件
// var obj = {
//     S:4,
//     A:3,
//     B:2
// }
// var strategies = {
//     "S": function( salary ){
//         return salary * 4;
//     },
//     "A": function( salary ){
//         return salary * 3;
//     },
//     "B": function( salary ){
//         return salary * 2;
//     }
// };
// var calculateBonus = function( level, salary ){
//     // 使用策略   
//     return strategies[ level ]( salary );
// };
// console.log( calculateBonus( 'S', 20000 ) );// 输出:80000
// console.log( calculateBonus( 'A', 10000 ) );// 输出:30000



