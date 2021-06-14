function createAjax(){
    const xhr = new XMLHttpRequest() 
    xhr.open('get','index.html',true)
    xhr.send(null)
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4&&xhr.status ==200 || xhr.status ==304){
            console.log(xhr.responseXML)
        }
    }
}