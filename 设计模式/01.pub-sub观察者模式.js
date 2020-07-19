// 订阅/发布模式 （观察者）

// pub/sub 这个应该⼤家⽤到最⼴的设计模式了，
// 在这种模式中，并不是⼀个对象调⽤另⼀个对象的⽅法，⽽是⼀个对象订阅另⼀个对象的 特定活动并在
// 状态改编后获得通知。订阅者因此也成为观察者，⽽被观察的对象成为发布者或者主题。当发⽣了⼀个
// 重要事件时候 发布者会通知（调⽤）所有订阅者并且可能经常已事件对象的形式传递消息。



class Event {
    constructor(){
        this.callbacks = {}
    }

    $off(name){
        this.callbacks[name] = null
    }

    $emit(name, args){
        let cbs = this.callbacks[name]
        if(cbs){
            cbs.forEach(c=>{ 
                c.call(this, args)
            })
        }
    }

    $on(name,fn){
        (this.callbacks[name] || (this.callbacks[name] = [])).push(fn)
    }
    $once(name,fn){
        this.callbacks[name] = []
        this.callbacks[name].push(fn)
    }
    
}


let event = new Event()

// 监听
event.$on('fn1',(arg)=>{
    console.log('fn1',arg)
})
event.$on('fn2',(arg)=>{
    console.log('fn2',arg)
})

// 处罚
event.$emit('fn1',{name:'fn1'})
event.$emit('fn2',{name:'fn2'})
// 解绑
event.$off('fn1')
event.$emit('fn1',{name:'fn1'})
event.$on('fn1',(arg)=>{
    console.log('fn1',arg)
})
event.$emit('fn1',{name:'fn1'})

