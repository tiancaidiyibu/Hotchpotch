// 有一个楼梯，你一次只能往上走一阶或者两阶。请编写函数 climbStairs，它接受一个整数 n 作为参数，表示这个楼梯有多少阶。请你返回一个整数，表示这个楼梯一共有多少种走法。

function fn(n){
    if(n===1)return 1
    if(n===2)return 2
    return fn(n-1)+fn(n-2)
}
console.log(fn(3))

// fn(1) = 1
// fn(2) = 2
// fn(3) = fn(2)+fn(1)
// fn(4) = fn(3)+fn(2)



var climbStairs = function(n) {
    const res = [];
    res[0] = 1;
    res[1] = 1;
    for(let i=2;i<=n;i++) {
        res[i] = res[i-1] +res[i-2]
    }
    return res[n];
};
console.log(climbStairs(8));

