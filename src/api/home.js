// 用于处理home页面与后端服务器的交互
import axios from 'axios';
//引入jsonp 用于获取jsonp数据
import jsonp from '@/assets/js/jsonp';
// 调用配置文件 获取成功的状态码
import {SUCC_CODE,TIMEOUT,HOME_RECOMMEND_PAGE_SIZE,jsonpOptions} from './config';

//打乱数组顺序
const shuffle = (arr)=>{
    const arrLength = arr.length;
    let i = arrLength;
    let rndNum;

    while(i--){
        // 对i进行自减 当为0时不执行
        //如果随机的数 不与当前i的值相等 则将当前i和rndNum的对应值位置的元素调换位置
        if(i !== (rndNum = Math.floor(Math.random() * arrLength))){
            [arr[i],arr[rndNum]] = [arr[rndNum], arr[i]];
        }
    }

    return arr;
};


//获取幻灯片数据 -- ajax
export const getHomeSlider = ()=>{
    //获取数据后返回
    return axios.get('http://www.imooc.com/api/home/slider',{timeout:TIMEOUT}).then(res =>{
        //res是成功时返回到的数据 , get()的第二个参数为请求时间{timeout:xx} 值为毫秒
        //比如{timeout:10}为10毫秒 超时就会发出错误信息 一般使用10000(10秒)
        if(res.data.code === SUCC_CODE){
            //判断数据状态码
            //此时为一个Promise 直接再加上一个data =>{console.log(data);}即可获取到数据

            //模拟更新幻灯片
            let sliders = res.data.slider;
            // // 随机从幻灯片数组中 通过下标取到一个图片 
            // const slider = [sliders[Math.floor(Math.random()*sliders.length)]];
            // //filter会遍历数组中所有元素，如果判断条件是true，则把当前遍历的元素返回给新数组。
            // //通过filter循环遍历 sliders幻灯片数组 每一项通过随机数大于0.5即有50%的机会
            // //为true然后加入到新数组中 结束后返回一个新数组 
            // //逻辑便是 循环的每一项有50%的机会加入到新数组中返回出来
            // //在通过定义的shuffle方法 将数组进行随机打乱排序 
            // sliders = shuffle(sliders.filter(()=>Math.random()>=0.5));
            // if(sliders.length === 0){
            //     //如果通过filter导致没有一张图片 那么就将一开始的图片放入
            //     sliders = slider;
            // }
            return sliders; //将循环遍历的新幻灯片数组返回
            // return res.data.slider;  
        }
        //如果没有获取到对应的成功码就抛出错误
        throw new Error('没有成功获取到数据！');
    }).catch(err=>{
        if(err){
            //失败时候的回调返回的错误信息
            console.log(err);
        }
        //对超时进行提示等操作 比如刷新页面 替换值等 这是返回一个数组其中为一个报错的图片
        //这就会将其渲染到slider之中显示出来 这样就不会出现没获取到值的时候sliders没有内容
        return [{linkUrl:'https://www.imooc.con',picUrl:require('@/assets/img/404.png')}];
    });
};

//获取热门推荐数据 -- jsonp
export const getHomeRecommend = (page =1,psize=HOME_RECOMMEND_PAGE_SIZE)=>{
    //默认传入page为 1  psize为20
    const url = 'https://ju.taobao.com/json/tg/ajaxGetItemsV2.json';
    const params = {
        // 参数对象
        page,
        psize,
        type:0,
        frontCatId:''
    };
    return jsonp(url,params,jsonpOptions).then(res=>{
        // 引入成功时候返回res
        // console.log(res);
        if(res.code === '200'){
            return res;
        }
        //如果没有获取到对应的成功码就抛出错误
        throw new Error('没有成功获取到数据！');
    }).catch(err=>{
        // 捕获错误
        if(err){
            //失败时候的回调返回的错误信息
            console.log(err);
            //错误时候 相当于返回了undefined
        }
    });

}