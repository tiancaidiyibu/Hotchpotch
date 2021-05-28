async function eachLimit (limit,arr,iteratorFn){
    const res = []
    const activeList = []
    for(const item  of arr){
        console.log(item)
        const p = iteratorFn(item)
        res.push(p)
        const e = p.then(()=>{
            activeList.splice(activeList.indexOf(e),1)
        },()=>{
            
        })
        activeList.push(e)
        while(activeList.length>=limit){
            await Promise.race(activeList)
        }
    }
    return Promise.all(res)
}



async function test() {
    // const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i));
    function timeout (i){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve(i)
            },i)
        })
    }
    const results = await eachLimit(2, [1000, 5000, 3000, 2000,10000,3000], timeout);
    console.log(results);
}
test()