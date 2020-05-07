<!-- home页面 热卖推荐组件  -->
<template>
    <div class="recommend">
        <h3 class="recommend-title">热卖推荐</h3>
        <div class="loading-container" v-if="!recommends.length">
            <me-loading inline></me-loading>
        </div>
        <ul class="recommend-list" v-else>
            <li class="recommend-item" v-for="(item,index) in recommends" :key="index">
                <router-link class="recommend-link"
                 :to="{name:'home-product',params:{id:item.baseinfo.itemId}}">
                    <!-- 通过路由跳转到home下的product详情页 并传入对应点击项的id值 用于渲染 --> 
                    <!-- 使用v-lazy懒加载图片 -->
                    <p class="recommend-pic"><img v-lazy="item.baseinfo.picUrl" alt="" class="recommend-img"></p>
                    <p class="recommend-name">{{item.name.shortName}}</p>
                    <p class="recommend-origPrice"><del>￥{{item.price.origPrice}}</del></p>
                    <p class="recommend-info">
                        <span class="recommend-price">￥<strong class="recommend-price-num">{{item.price.actPrice}}</strong></span>
                        <span class="recommend-count">{{item.remind.soldCount}}件已售</span>
                    </p>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    //获取数据
    import {getHomeRecommend} from '@/api/home';
    //加载中组件
    import MeLoading from '@/base/loading';

    export default{
        name:"HomeRecommend",
        data(){
            return{
                recommends:[],  //数据
                curPage:1,      //当前页
                totalPage:1  //总页数
            }
        },
        components:{
            'me-loading':MeLoading
        },
        created(){
            // 创建成功时候调用的生命周期函数
            //创建成功时候就获取一次数据
            this.getRecommend();
            // console.log(this.recommends);
        },
        methods:{
            getRecommend(){
                //如果当前页大于总页数就返回
                if(this.curPage > this.totalPage){
                    return Promise.reject(new Error('没有更多数据了'));
                }
                //为了让update调用后能够使用then进行回调 所以转化为promise对象
                return getHomeRecommend(this.curPage).then(data=>{
                    return new Promise(resolve =>{
                        if(data){
                            //如果有数据才继续 因为报错是没有返回值的
                            //将返回的itemList与当前recommends合并为一个数组
                            this.recommends = this.recommends.concat(data.itemList);
                            // console.log(this.recommends);
                            this.totalPage = data.totalPage;
                            this.curPage += 1;
                            // 数据获取到并赋值于data之中后 发送出一个loaded的状态信息
                            // 然后在引入页面中的组件标签中用@loaded的形式去接受这个信息
                            //然后触发一些js
                            this.$emit('loaded',this.recommends);
                            resolve();
                        }
                    })
                });
            },

            update(){
                // 更新数据
                return this.getRecommend();
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "~@/assets/scss/mixins";

    .recommend{

        &-title{
            position: relative;
            width: 100%;
            padding: 10px 0;
            font-size: $font-size-l;
            text-align: center;

            &:before,&:after{
                position: absolute;
                content: '';
                top: 50%;
                width: 40%;
                height: 1px;
                background-color: #ddd;
            }
            &:before{
                left: 0;
            }
            &:after{
                right: 0;
            }
        }

        &-list{
            @include flex-between();
            flex-wrap:wrap; 
        }

        &-item{
            width: 49%;
            background-color: #fff;
            box-shadow: 0 1px 1px 0 rgba(0,0,0,.12);
            margin-bottom: 8px;
        }

        &-link{
            display: block;
        }

        &-pic{
            // 外部容器为49%的宽 图片容器便是100%,但高度没有随着更改
            //为了让图片呈现为一个正方形 即宽高相等 就通过padding-top的值设为100%
            //它便取宽度的值作为top值 此时让图片img通过absolute定位到顶部
            //宽高设为100% 便会呈现为一个正方形
            width: 100%;
            position: relative;
            padding-top: 100%;
            margin-bottom: 5px;
        }

        &-img{
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
        }

        &-name{
            height: 36px;
            padding: 0 5px;
            margin-bottom: 8px;
            line-height: 1.5;
            // 两行超出时候显示省略号
            @include multiline-ellipsis();
        }

        &-origPrice{
            padding: 0 5px;
            margin-bottom:8px;
            color: #ccc;
        }

        &-info{
            @include flex-between();
            padding: 0 5px;
            margin-bottom: 8px;
        }

        &-price{
            color: #e61414;
        }

        &-price-num{
            font-size: 20px;
        }

        &-count{
            color: #999;
        }
    }

    .loading-container{
        padding-top: 100px;
    }
</style>
