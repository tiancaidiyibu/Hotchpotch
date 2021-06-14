// 事件流有三个阶段
    // 事件捕获阶段
    // 处于目标阶段
    // 事件冒泡阶段

// 事件捕获（event capturing）：通俗的理解就是，当鼠标点击或者触发dom事件时，浏览器会从根节点开始由外到内进行事件传播，即点击了子元素，如果父元素通过事件捕获方式注册了对应的事件的话，会先触发父元素绑定的事件
// 事件冒泡（dubbed bubbling）：与事件捕获恰恰相反，事件冒泡顺序是由内到外进行事件传播，直到根节点

// 事件流阻止
// event.preventDefault()：取消事件对象的默认动作以及继续传播
// event.stopPropagation()/ event.cancelBubble = true：阻止事件冒泡。


// 事件委托：利用浏览器的冒泡机制，因为时间在冒泡阶段会传到父节点上，由父节点监听的监听函数统一处理多个子元素的事件
