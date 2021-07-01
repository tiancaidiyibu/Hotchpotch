// 常见时间复杂度(Big O notation):    （按时间排名）
// 1.常数复杂度：O(1)   并不代表常数只是1，也可能是2，3，4等，但用O(1)表示
// 2.对数复杂度：O(log n)
// 3.线性复杂度：O(n)
// 4.平方：O(n^2)
// 5.立方：O(n^3)
// 6.指数：O(2^n)
// 7.阶乘：O(n!)

// 常数复杂度：O(1) 
// var n = 1
// n = n+1

// 线性时间复杂度 O(n)
// for (let index = 0; index < array.length; index++) {
//     const element = array[index];
// }

// 平方时间复杂度 O(n^2)
// for (let index = 0; index < array.length; index++) {
//     for (let i = 0; i < array.length; i++) {
//         const element = array[i];    
//     }
// }

// 拓展：线性时间复杂度 O(n) 并不是 O(2n)
// for (let index = 0; index < array.length; index++) {
//     const element = array[index];
// }
// for (let i = 0; i < array.length; i++) {
//     const element = array[i];
// }

// 对数复杂度：O(log n)  2^x=n ==> x=log2(n)
// for(let i = 1; i <n;i = i*2){
//     console.log(i);
// }

// 指数复杂度：O(k^n) 
// function fib(n){
//     if(n<=2)return n
//     return fib(n-1)+fib(n-2)
// }


// 递归分析时间复杂度分析：画出树形结构（递归树）,分析每层的节点数
// F(n) = F(n-1)+F(n-2)
// function fib(n){
//     if(n<=2)return n
//     return fib(n-1)+fib(n-2)
// }

// 二分查找  O(log n)
// 二叉树遍历  前序，中序，后序  O(n)
// 二位矩阵 O(n)
// 合并排序 O(nlog n)
// 图的遍历 O(n)
// DFS，BFS O(n)






