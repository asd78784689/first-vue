// 一个配置文件 用于保存所有的配置信息 方便修改
// 暴露一个常量 
// slider的配置信息
export const sliderOptions = {
    direction:'horizontal',
    loop:true,
    interval:0,
    pagination:true
};

const prefix = 'mall-product';  //缓存的前缀
const suffix = 'key';            //缓存的键值
export const PRODUCT_CONTENT_KEY = `${prefix}-content-${suffix}`; //将所有缓存内容保存
export const PRODUCT_CONTENT_UPDATE_TIME_INTERVAL = 1 * 24 * 60 * 60 * 1000;
// export const CATEGORY_CONTENT_UPDATE_TIME_INTERVAL = 10 * 1000;//缓存的保存时间

// 导航项item
export const navItems = [
    {
        linkUrl:'https://www.imooc.com',
        picUrl:require('./img/dianpu.png'),
        text:'店铺'
    },
    {
        linkUrl:'https://www.imooc.com',
        picUrl:require('./img/kefu.png'),
        text:'客服'
    },
    {
        linkUrl:'https://www.imooc.com',
        picUrl:require('./img/shoucang.png'),
        text:'收藏'
    }];
