//函数节流
export const debounce = (func,delay = 200) =>{
    let timer = null;
    //执行后返回一个函数 接受参数 
    //将之前的timer清除 然后在设定的延迟后 让func方法先改变this指向为this后传递args
    return function(...args){
        timer && clearTimeout(timer);
        timer = setTimeout(()=>{
            func.apply(this,args);
        },delay);
    };
};