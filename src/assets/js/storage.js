// 缓存数据 
const storage = window.localStorage;

export default{
    // 返回多个api用于保存、获取、删除、清除
    set(key,val){
        if(val === undefined){
            return;
        }
        //通过序列化val 变为字符串作为一条item保存
        storage.setItem(key,serialize(val));
    },
    get(key,def){
        const val = deserialize(storage.getItem(key));
        return val === undefined ? def : val;
    },
    remove(key){
        storage.removeItem(key);
    },
    clear(){
        storage.clear();
    }
};

function serialize(val){
    // 用于将一个值转为字符串。该字符串符合 JSON 格式，并且可以被JSON.parse方法还原。
    return JSON.stringify(val);
}

function deserialize(val){
    // 如果val的值不是string就直接返回undefined 因为parse只能JSON的string转为对象
    if(typeof val !== 'string'){
        return undefined;
    }
    //为了处理解析错误 放在try...catch之中
    //紧跟在try块之后，包括一个catch子句它指定您希望捕获的异常类型。
    try{
        return JSON.parse(val);
    }catch(e){
        return val || undefined;
    }
}