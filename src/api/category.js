// 用于处理home页面与后端服务器的交互
import axios from 'axios';
// 调用配置文件 获取成功的状态码
import {SUCC_CODE,TIMEOUT} from './config';

//axios提供的 用于取消前一次请求
const CancelToken = axios.CancelToken;
// 接收取消方法 用于取消请求
let cancel;

//获取内容数据 -- ajax
export const getCategoryContent = (id)=>{
    // 如果有值就说明要当前请求还未完成那么就取消前一次的请求重新发送
    cancel && cancel('取消了前一次的请求');
    cancel = null;

    //这里是慕课网处理好的接口 所以可以直接用ajax 不然也是得用jsonp获取
    //获取数据后返回 通过``模板字符串将传入的id一并传输过去
    return axios.get(`http://www.imooc.com/api/category/content/${id}`,
            { timeout:TIMEOUT,
              cancelToken:new CancelToken(function executor(c){  //每次请求都会发送一个值然后赋值给cancel这个变量
                 cancel = c;
              })
        }).then(res =>{
        //res是成功时返回到的数据 , get()的第二个参数为请求时间{timeout:xx} 值为毫秒
        //比如{timeout:10}为10毫秒 超时就会发出错误信息 一般使用10000(10秒)
        if(res.data.code === SUCC_CODE){
            //判断数据状态码
            //此时为一个Promise 直接再加上一个data =>{console.log(data);}即可获取到数据
            return res.data.content;
            
        }
        //如果没有获取到对应的成功码就抛出错误
        throw new Error('没有成功获取到数据！');
    }).catch(err=>{
        if(axios.isCancel(err)){ //取消前一次的请求
            //失败时候的回调返回的错误信息
            console.log(err);
        }else{
            //handle error
            console.log(err);
        }
        //对超时进行提示等操作 比如刷新页面 替换值等 这是返回一个数组其中为一个报错的图片
        //这就会将其渲染到slider之中显示出来 这样就不会出现没获取到值的时候sliders没有内容
        // return [{linkUrl:'https://www.imooc.con',picUrl:require('@/assets/img/404.png')}];
    });
};