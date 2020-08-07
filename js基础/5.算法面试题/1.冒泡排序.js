let arr = [2,3,5,621312,2322,44545]
// 冒泡排序
// function bubbleSort (arr){
//     let len = arr.length
//     for(var i = 0;i<len;i++){
//         for(j=0;j<len-i-1;j++){
//             if(arr[j]>arr[j+1]){
//                 var temp = arr[j+1]
//                 arr[j+1] = arr[j]
//                 arr[j] = temp
//             }
//         }
//     }
// }
// 快读排序
function quickSort (arr){
    if(arr.length<=1){
        return arr
    }
    let left = []
    let right = []
    let current = arr.splice(0,1)
    for(let i = 0;i<arr.length;i++){
        if(arr[i]<current){
            left.push(arr[i])
        }else{
            right.push(arr[i])
        }
    }
    return quickSort(left).concat(current,quickSort(right))
}
const res = quickSort(arr)
console.log(res)