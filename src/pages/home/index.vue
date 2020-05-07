<!-- home页面 -->
<template>
    <div class="home">
        <header class="g-header-container">
            <!-- 通过判断决定是否加入header-transition这个class 这个class便是红色的背景 -->
            <home-header :class="{'header-transition':isHeaderTransition}" ref="header"></home-header>
        </header> 
        <!-- 设置一个data属性  值是recommends的值 会同步更新 -->
        <!-- 这样才不会让滑动组件出问题 -->
        <me-scroll :data="recommends" pullDown pullUp @pull-down="pullToRefresh" @pull-up="pullToRecommend" @scroll="scroll" @scroll-end="scrollEnd" @pull-down-transition-end="pullDownTransitionEnd" ref="scroll">
            <home-slider ref="slider"></home-slider>
            <home-nav></home-nav>
            <!-- 当recommend的数据获取完成后便会发送这个loaded的状态信息 接收到并执行该方法  -->
            <home-recommend @loaded="getRecommends" ref="recommend"></home-recommend>
        </me-scroll>
        <div class="g-backtop-container">
            <me-backtop :visible='isBacktopVisible' @backtop="backToTop"></me-backtop>
        </div>
        <div class="g-backtop-container"></div>
        <!-- 嵌套children子路由时候 跳转的接受区域 -->
        <router-view></router-view>
        
    </div>
</template>

<script>
    import HomeHeader from './header';      //头部组件
    import HomeSlider from './slider';      //轮播图组件
    import HomeNav from './nav';            //导航面板组件
    import HomeRecommend from './recommend';      //组件
    import MeScroll from '@/base/scroll/index';   //滚动条组件
    import MeBacktop from '@/base/backtop';  //返回顶部组件
    import {HEADER_TRANSITION_HEIGHT} from './config';

    export default{
        data(){
            return{  
                recommends:[],
                isBacktopVisible:false,    //是否让回到顶部显示
                isHeaderTransition:false  //是否开启头部的过渡效果 
            }
        },
        components:{
            'home-header':HomeHeader,
            'home-slider':HomeSlider,
            'home-nav':HomeNav,
            'home-recommend':HomeRecommend,
            'me-scroll':MeScroll,
            'me-backtop':MeBacktop
        },
        methods:{
            changeHeaderStatus(translate){
                //改变头部样式
                if(translate > 0) {
                    //下拉时候 隐藏
                    this.$refs.header.hide();
                    return;
                }

                this.$refs.header.show();
                //如果移动距离大于设定的开启头部过渡高度时候就加上头部过渡的class
                //会从透明变成红色
                this.isHeaderTransition = -translate > HEADER_TRANSITION_HEIGHT;

            },
            backToTop(){
                //当点击时候返回顶部
                this.$refs.scroll  && this.$refs.scroll.scrollToTop();
            },

            updateScroll(){
                //更新滚动条组件的wrapper的高度 保证正常运行
            
            },
            getRecommends(recommends){
                // 通过获取到recommends数据后发送出来的loaded状态信息，
                //获取recommend数据并对当前的this.recommends进行更新
                //便能对scroll滚动条组件进行高度的更新操作
                this.recommends = recommends;
            },
            pullToRefresh(end){
                //触发了pull-down时候便会执行slider中的update去更新slider然后再执行
                //scroll中touchEnd里pull-down返回的end方法
                // 执行了slider的刷新再去执行scroll传入的end方法
                this.$refs.slider.update().then(end);

                //下拉刷新
                // setTimeout(()=>{
                //     console.log('刷新');
                //     end();
                // },1000);
            },
            pullToRecommend(end){
                // setTimeout(()=>{
                //     console.log('上拉刷新');
                //     end();
                // },1000);

                //触发了pull-up时候便会执行recommend中的update去更新recommend然后再执行
                //scroll中touchEnd里pull-up返回的end方法
                // 执行了recommend的刷新再去执行scroll传入的end方法
                // 要保证update返回的会是一个promise对象 才能使用then方法
                this.$refs.recommend.update().then(end).catch(err=>{
                    if(err){
                        console.log(err);
                    }
                    end();
                    // 如果执行到这里 就代表了没有数据进行加载了
                    //那么就禁止上拉加载的环节 并将上拉的loading的文字进行替换为没有更多数据了
                });
            },
            scroll(translate){
                //监听滚动 滚动结束后如果距离超过了设定的距离就变为红色
                this.changeHeaderStatus(translate);
            },
            pullDownTransitionEnd(){
                // 下拉结束
                this.$refs.header.show();
            },
            scrollEnd(translate,scroll,pulling){
                // 滚动过渡结束后触发
                // 通过判断translate的距离决定是否显示按钮 下拉是正 上拉为负
                // 如果移动的距离已经超过了可视区域的高度 也就是超过了一屏幕的距离
                //用pulling判定是否在执行下拉动画效果中 
                //下拉时候如果动画正在执行时候不能用 所以只有没执行动画加载中时才能执行
                if(!pulling){this.changeHeaderStatus(translate);}
                this.isBacktopVisible = translate < 0 && -translate > scroll.height;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '~@/assets/scss/mixins';

    .home{
        overflow: hidden;
        width: 100%;
        height: 100%;
        background-color:$bgc-theme;
    }

</style>