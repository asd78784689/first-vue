//封装jsonp 方法 
import jsonp from 'jsonp';

//将数据中的值一一分离为属性名+值 并相连为字符串
const parseParam = (param) =>{
    // 例如传入的param={page:1,psize:20}
    let params = [];
    for(const key in param){
        // 循环数据对象 将属性与值组成一个数组加到params之中
        //encodeURIComponent() 函数可把字符串作为 URI 组件进行编码，供后台识别使用。
        params.push([key,encodeURIComponent(param[key])]);
    };
    // 循环后为 [[page,1],[psize,20]]

    //用map循环数组params 每一项用=相连 返回一个新的数组后 再将其各项以&相连为一个字符串返回出去
    return params.map(value => value.join('=')).join('&');
    //map后为 [page=1,psize=20]
    //再次join 便为 page=1&psize=20

}

// 暴露一个方法
export default(url,data,options) =>{
    // 对url进行修改 因为jsonp方法中的url后缀是带数据与值的 通过?开头 &相连多个数据
    url += (url.indexOf('?') < 0 ? '?' : '&') + parseParam(data);

    return new Promise((resolve,reject)=>{
        // 返回一个Promise
        jsonp(url,options,(err,data)=>{
            // 运行jsonp方法(npm安装了jsonp插件) 如果回调返回了err则为失败
            if(err){
                // Promise状态更为reject并传入err
                reject(err);
            }else{
                resolve(data);
            }
        })
    });
}