let arr = [12,3,4,5,2]
function bubbleSort(arr){
    var n = arr.length
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n-i-1; j++) {
            if(arr[j]>arr[j+1]){
                var temp = arr[j+1]
                arr[j+1] = arr[j]
                arr[j] = temp
            }
        }
    }
    return arr
}
console.log(bubbleSort(arr)) 
