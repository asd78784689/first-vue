// 可复用函数 只有调用时候放在methods中混合起来
import storage from '@/assets/js/storage';       //缓存数据组件
import {SEARCH_HISTORY_KEYWORD_KEY} from '@/pages/search/config';  //缓存的key值

export const searchMixin = {
    methods:{
        $_selectItem(keyword){
            //被点击项 传入他的文字
            // 先在缓存中获取一次 如果没有值就设为一个数组
            let keywords = storage.get(SEARCH_HISTORY_KEYWORD_KEY,[]);
        
            if(keywords.length !== 0){
                // 如果缓存数组长度不为0 
                // .filter()进行过滤操作 缓存数组中每一项进行循环 如果值不等于被点击项的文字
                //就返回最后组成一个新的数组 
                keywords = keywords.filter(val => val !== keyword);
            }
            //将被点击项放到缓存数组中的开头
            keywords.unshift(keyword);
            //重新设置缓存数据
            storage.set(SEARCH_HISTORY_KEYWORD_KEY,keywords);
            //跳转的页面 将点击项的文字拼接进去
            location.href = `https://s.m.taobao.com/h5?event_submit_do_new_search_auction=1&_input_charset=utf-8&topSearch=1&atype=b&searchfrom=1&action=home%3Aredirect_app_action&from=1&sst=1&n=20&buying=buyitnow&q=${keyword}`;
            
        }
    }
}