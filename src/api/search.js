import axios from 'axios';
import jsonp from '@/assets/js/jsonp';
import {jsonpOptions, TIMEOUT} from './config';

// 获取热门搜索数据--ajax
//这里是慕课网处理好的接口 所以可以直接用ajax 不然也是得用jsonp获取
    
export const getSearchHotKeyword = () => {
  //https://so.m.jd.com/ware/hotKeyWord.action?_format_=json
  return axios.get('http://www.imooc.com/api/search/hot', {
    // timeout: 10
    timeout: TIMEOUT
  }).then(res => {
    // console.log(res);
    // res = JSON.parse(res.data.hotKeyWord);  //获取到的json数据转化为对象
    res = res.data.hotKeyWord;            //由于该接口返回的是json对象所以无需转换
    if (res && res.owner) { // succeed
      return res.owner;
    }

    throw new Error('没有成功获取到数据！');
  }).catch(err => {
    if (err) {
      console.log(err);
    }
  }).then(res => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(res);        //延迟一秒后执行 返回一个promise对象
      }, 1000);
    });
  });
};

// 获取搜索结果数据--jsonp
export const getSearchResult = keyword => {
  const url = 'https://suggest.taobao.com/sug';
  const params = {
    q: keyword,
    code: 'utf-8',
    area: 'c2c',
    nick: '',
    sid: null
  };

  // jsonpOptions.timeout = 100;

  return jsonp(url, params, jsonpOptions).then(res => {
    //通过封装的jsonp函数方法将params中的属性一一写到url之后然后去请求数据返回
    // console.log(res);   
    if (res.result) {
      // console.log(res);
      return res.result;
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
