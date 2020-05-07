//成功的状态码 通过这个js 方便修改状态码的值 
export const SUCC_CODE = 0;
// 请求时间 毫秒为单位 
export const TIMEOUT = 30000;
//home页面的recomm的页面item数量
export const HOME_RECOMMEND_PAGE_SIZE = 20;
//jsonp插件方法的option信息
export const jsonpOptions = {
    param:'callback', // 指定回调的查询字符串参数的名字 默认为callback
    timeout:TIMEOUT, //发出超时的时间 默认为60000 0为禁止 
    // prefix:'__jp', // 处理jsonp相应的全局回调函数的前缀 默认为__jp
    // name:'callback', //   处理jsonp相应的全局回调函数的名称 默认为prefix+递增计时器    
}