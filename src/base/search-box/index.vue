<!-- 通用的search-box搜索栏组件 -->
<template>
  <div class="mine-search-box-wrapper">
    <i class="iconfont icon-search"></i>
    <!-- div的用于跳转到搜索页面 而input则是真正的搜索栏 -->
    <div class="mine-search-box" v-if="fake">{{placeholder}}</div>      
    <input
      class="mine-search-box"
      type="text"
      title="搜索框"
      :placeholder="placeholder"
      ref='input'
      v-if="!fake"
      v-model="query"           
    >
    <!-- 用v-model进行数据双向绑定 input常用到的 当输入框的内容发生改变 v-model对应的参数会发生改变 而v-model绑定的参数发生改变input中的值也会发生改变 -->
    <i
      class="iconfont icon-close" @click="reset" v-show="query"      
    ></i>
  </div>
</template>

<script> 
  import {debounce} from '@/assets/js/util';  //函数节流组件 用于减少请求次数

  export default {
    name: 'MeSearchBox',
    data(){
      return{
        query:''
      }
    },
    props:{
      placeholder:{
        type:String,
        default:'请输入搜索内容'
      },
      fake:{
        type:Boolean,
        default:false
      }
    },
    watch:{
      query:debounce(function (){
        //该方法先设立了一个timer 每次请求都会判断是否存在 然后清除掉之前的请请求
        //然后再一定的延迟后才发送出这条状态信息 这样每次请求都会有一定的延迟就不是实时进行请求判断
        this.$emit('query',this.query);
      })
    },
    methods:{
      focus(){
        // 获取焦点
        this.$refs.input &&  this.$refs.input.focus();
      },
      clear(){
        //清楚数据
        this.query = '';
      },
      reset(){
        this.clear();
        this.focus();
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/scss/mixins";

  $search-box-height: 30px;

  .mine-search-box-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    height: $search-box-height;
    padding: 0 7px;
    background-color: #fff;
    border-radius: $search-box-height / 2;
  }

  .iconfont {
    color: $icon-color;
    font-size: $icon-font-size-sm;
    font-weight: bold;
  }

  .mine-search-box {
    flex: 1;
    background: none;
    border: none;
    margin: 0 6px;
    color: #666;
    line-height: 1.5;
  }
</style>
