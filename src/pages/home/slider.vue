<template>
    <div class="slider-wrapper">
        <!-- 放置于home页面上的slider组件  -->
        <!-- slider组件接收 direction(水平滑动)、interval(开启轮播的延迟)、loop(滚动)、pagination(分页器) 这四个属性参数-->
        <!-- 通过分开传属性值 达到容易阅读和检查数据 -->
        
        <!-- 加载中组件 当slider.length不存在时候显示 -->
        <me-loading v-if="!sliders.length"></me-loading>

        <!-- 当sliders的长度为0就不渲染了 -->
        <!-- 使用ajax通过服务器获取数据进行slider的渲染时 因为其为异步操作 而渲染slider不是，会出现还未有数据加载就已经渲染了一次slider 这样就会触发swiper中自带的一些如单张slide时不滚动 没有无缝等效果 所以通过v-if判断sliders的长度 决定是否渲染 只有获取到数据时候才渲染他 这样就不会使原本设置的效果失效！-->
        <!-- 用了加载中组件 只有当sliders.length有值才会替换掉loading -->
        <me-slider :direction="direction" :interval="interval" :loop="loop" :pagination="pagination" :data="sliders" v-else>
        <!-- 通过slot插槽 接收到由v-for循环出来的多个slide -->
            <swiper-slide v-for="(item,index) in sliders" :key="index">
                <a :href="item.linkUrl" class="slider-link">
                    <img :src="item.picUrl" class="slider-img">
                </a>
            </swiper-slide>
        </me-slider>

    </div>
</template>

<script>
    //在基础组件上包装一层形成业务组件 
    //引入base中的通用slider组件再通过设置形成业务组件
    import MeSlider from '@/base/slider/index';
    import {swiperSlide} from 'vue-awesome-swiper';
    // 获取配置信息文件 并通过解构赋值将sliderOptions获取到
    import {sliderOptions} from './config';
    // 获取ajax返回数据
    import {getHomeSlider} from '@/api/home';
    //loading组件
    import MeLoading from '@/base/loading/index';

    export default{
        name:"HomeSlider",
        data(){
            return{
                sliders:[],
                direction:sliderOptions.direction,
                loop:sliderOptions.loop,
                interval:sliderOptions.interval,
                pagination:sliderOptions.pagination
            };
        },
        components:{
            'me-slider':MeSlider,
            'me-loading':MeLoading,
            swiperSlide
        },
        methods:{
            update(){
                //用于外部调用 执行一次getSliders方法 更新一下sliders 
                return this.getSliders();
            },
            getSliders(){
                // 这个方法执行后为一个promise 执行then方法获取data数据并赋值
                return getHomeSlider().then(data =>{
                    //将sliders赋值 用于遍历
                    this.sliders = data;
                });
            }
        },
        created(){
            //获取远程数据
            // console.log(getHomeSlider());
            this.getSliders();
        }
    }
</script>

<style scoped lang="scss">
    .slider-wrapper{
        overflow: hidden;
    }
    .slider-link{
        display: block;
    }
    .slider-link,.slider-img{
        width: 100%;
        height: 100%;
    }
</style>