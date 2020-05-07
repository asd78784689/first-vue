// 用于处理home页面点击商品后跳转的详情页与后端服务器的交互
import axios from 'axios';
import jsonp from '@/assets/js/jsonp';
import {jsonpOptions, TIMEOUT} from './config';


// 获取详情页结果数据--jsonp
export const getProductDetail = id => {
    const url = 'https://unszacs.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/';
    const params = {
        api:'mtop.taobao.detail.getdetail',
        ttid:'2017@taobao_h5_6.6.0',
        data:`{"itemNumId":"${id}"}`,
        appKey:12574478,
        dataType:'jsonp',
        type:'jsonp',
        v:'6.0'
      };

    // jsonpOptions.timeout = 100;

    return jsonp(url, params, jsonpOptions).then(res => {
        //通过封装的jsonp函数方法将params中的属性一一写到url之后然后去请求数据返回
        // console.log(res);   
        if (res.data) {
          // console.log(res);
          return res.data;
        }

        throw new Error('没有成功获取到数据！');
    }).catch(err => {
        if (err) {
          console.log(err);
        }
    }).then(res => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(res);
          }, 1000);
        });
    });
};
