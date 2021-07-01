function sum(...rest){
    let arr = [...rest]
    return  ()=> arr.reduce((pre,cur)=>{
        return pre+cur
    })
}
console.log(sum(1)==1)
// console.log(sum(1)(2)==3)
// console.log(sum(1)(2)(3)==6)