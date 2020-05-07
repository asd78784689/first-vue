<!-- scroll 滚动条组件 -->
<!-- 通过提供插槽 相当于提供了一个容器用于存放内容的区域 -->
<!-- 使用滚动条组件呢 是因为顶部和底部均为absolute的元素 然后让内容区域是一个独立的元素  -->
<!-- 只滚动内容区域而不移动父元素 所以需要滚动条的存在-->
<!-- 且一定要可视区也就是容器要比内部的wrapper的高度小而不是相等或大于 不然无法实现滚动 -->
<!-- 页面中基本所有滚动操作均在该组件上完成 -->

<template>
    <swiper :options="swiperOption" ref="swiper">
        <div class="mine-scroll-pull-down" v-if="pullDown">
            <me-loading :text="pullDownText" inline ref="pullDownLoading"></me-loading>
        </div>
        <swiper-slide>
            <slot></slot>
        </swiper-slide>
        <div class="mine-scroll-pull-up" v-if="pullUp">
            <me-loading :text="pullUpText" inline ref="pullUpLoading"></me-loading>
        </div>
        <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
    </swiper>
</template>

<script>
    import {swiper,swiperSlide} from 'vue-awesome-swiper';
    import MeLoading from '@/base/loading';
    // 引入配置文件
    import {PULL_DOWN_HEIGHT,PULL_DOWN_TEXT_INIT,PULL_DOWN_TEXT_START,PULL_DOWN_TEXT_ING,PULL_DOWN_TEXT_END,PULL_UP_HEIGHT,PULL_UP_TEXT_INIT,PULL_UP_TEXT_START,PULL_UP_TEXT_ING,PULL_UP_TEXT_END} from './config'

    export default{
        name:"MeScroll",
        data(){
            return{
                
            }
        },
        components:{
            swiper,swiperSlide,
            'me-loading':MeLoading
        },
        props:{
            scrollbar:{
                type:Boolean,
                default:true
            },
            data:{
                type:[Array,Object]
            },
            pullDown:{
                // 是否使用下拉刷新
                type:Boolean,
                default:false
            },
            pullUp:{
                // 是否使用上拉刷新
                type:Boolean,
                default:false
            },
            // pullDownText:{
                // type:String,
                // default:'加载中'
            // }
        },
        watch:{
            //watch侦听器，当数据变化时会执行 这个数据是props接受的数据  异步操作
            //这里监听了data的数据变化    这里的data是props中的data属性而不是组件数据的data
            data(){
                this.update();
            }
        },
        created(){
            this.init();
        },
        methods:{
            init(){
                this.pulling = false;  //是否正在上拉下拉
                this.pullDownText = PULL_DOWN_TEXT_INIT;
                this.pullUpText = PULL_UP_TEXT_INIT;
                this.swiperOption = {
                    direction: 'vertical', // 传入的滑动方式 垂直滚动
                    slidesPerView: 'auto', // 设置slider容器 能够同时显示的slides数量
                    freeMode: true,  // 自由模式 不限制滚动距离
                    setWrapperSize:true, //  设置swiper下的wrapper容器对应的高度
                    scrollbar:{
                        el:this.scrollbar ? '.swiper-scrollbar' : null,
                        hide:true  //是否自动隐藏
                    },
                    on:{
                        // 绑定监听事件 sliderMove当slider移动时候触发
                        //touchEnd 触摸结束时触发
                        //transitionEnd 过渡结束时候触发
                        sliderMove:this.scroll,
                        touchEnd:this.touchEnd,
                        transitionEnd:this.scrollEnd
                    }
                };
            },

            scrollToTop(speed,runCallbacks){
                //自定义api 用于滚动到顶部 
                //slideTo为返回到第几个幻灯片 由于滚动组件只有一个会返回到顶部
                this.$refs.swiper && this.$refs.swiper.swiper.slideTo(0,speed,runCallbacks);
            },

            scrollEnd(){
                //发送scroll-end状态信息  方便在外部监听 
                //防止滑动过快时的判断出错 传pulling用于判定当前是否正在下拉的动画中
                this.$emit('scroll-end',this.$refs.swiper.swiper.translate,this.$refs.swiper.swiper,this.pulling);
            },

            update(){
                //执行swiper中自带的update()事件 用于更新swiper
                //this.$refs获取当前组件中所有含有ref属性的值（相当于html元素中的class属性） 
                this.$nextTick(()=>{
                    // 当dom渲染完毕时候触发
                    this.$refs.swiper && this.$refs.swiper.swiper.update();
                })
            },

            scroll(){
                //滚动事件
                const swiper = this.$refs.swiper.swiper;

                // 在滚动时 发送scroll状态信息 方便在外部监听
                //可通过该事件判断是否能够显示返回顶部的按钮
                this.$emit('scroll',swiper.translate,this.$refs.swiper.swiper);

                //如果正在下拉/上拉
                if(this.pulling){return;}

                if(swiper.translate > 0){
                    //下拉为正值  上拉为负值
                    if(!this.pullDown) return;
                    //如果pullDown为false 即不使用下拉刷新那么就直接return

                    if(swiper.translate > PULL_DOWN_HEIGHT){
                        //如果滑动距离大于所设高度 则进行文本的更新和页面的内容刷新
                        //但是直接使用this.pullDownText = ** 的方式更新文本
                        //会出现bug 即替换文本重新渲染时候会发生跳转
                        this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START);
                    }else{
                        //如果滑动距离小于所设高度
                        this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_INIT);
                    }
                }else if(swiper.isEnd){
                    //下拉为正值  上拉为负值  swiper.isEnd为到达了底部
                    if(!this.pullUp) return;
                    //如果pullDown为false 即不使用下拉刷新那么就直接return
                    //是否超过了上拉距离

                    //swiper.$warpperEl表示可滚动区域的外层元素 然后通过css获取其高度
                    //相当于获取了swiper中的wrapper这个元素的高度
                    // 位移距离+显示区域高度 - 预设的上拉距离 > 所有内容高度 
                    //abs为绝对值
                    const totalHeight = parseInt(swiper.$wrapperEl.css('height'));
                    const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > totalHeight;
                    if(isPullUp){
                        //如果滑动距离大于所设高度 则进行文本的更新和页面的内容刷新
                        //但是直接使用this.pullDownText = ** 的方式更新文本
                        //会出现bug 即替换文本重新渲染时候会发生跳转
                        this.$refs.pullUpLoading.setText(PULL_UP_TEXT_START);
                    }else{
                        //如果滑动距离小于所设高度
                        this.$refs.pullUpLoading.setText(PULL_UP_TEXT_INIT);
                    }
                }
            },
            touchEnd(){
                //触摸结束时 即松开手时 触发
                const swiper = this.$refs.swiper.swiper;
                //如果下拉距离已超过了限定值说明要进行刷新操作

                 //如果正在下拉/上拉
                if(this.pulling){return;}

                if(swiper.translate > PULL_DOWN_HEIGHT){
                    //下拉为正值  上拉为负值 这里是超过了设定的下拉高度
                    if(!this.pullDown) return;
                    //如果pullDown为false 即不使用下拉刷新那么就直接return
                    
                    this.pulling = true;

                    swiper.allowTouchMove = false; //禁止触摸
                    // 设置过渡速度和位移高度
                    swiper.setTransition(swiper.params.speed);
                    swiper.setTranslate(PULL_DOWN_HEIGHT);
                    swiper.params.virtualTranslate = true; //定住不给回弹
                    // 改变文字
                    this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_ING);
                    //发出一个状态信息 可从调用中根据该信息使用回调函数
                    //并传过去一个方法 用于当回调结束后将禁止触摸的事项恢复
                    this.$emit('pull-down',this.pullDownEnd);
                }else if(swiper.isEnd){
                    //下拉为正值  上拉为负值  swiper.isEnd为到达了底部
                    if(!this.pullUp) return;
                    //如果pullDown为false 即不使用下拉刷新那么就直接return
                    //是否超过了上拉距离

                    //swiper.$warpperEl表示可滚动区域的外层元素 然后通过css获取其高度
                    //相当于获取了swiper中的wrapper这个元素的高度 也就是执行了dom操作
                    // 位移距离+显示区域高度 - 预设的上拉距离 > 所有内容高度 
                    //abs为绝对值
                    const totalHeight = parseInt(swiper.$wrapperEl.css('height'));
                    const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > totalHeight;
                    if(!this.pullDown) return;
                    //如果pullDown为false 即不使用下拉刷新那么就直接return
                    
                    this.pulling = true;

                    swiper.allowTouchMove = false; //禁止触摸
                    // 设置过渡速度和位移高度
                    swiper.setTransition(swiper.params.speed);
                    swiper.setTranslate(-(totalHeight + PULL_UP_HEIGHT - swiper.height));
                    swiper.params.virtualTranslate = true; //定住不给回弹
                    // 改变文字
                    this.$refs.pullUpLoading.setText(PULL_UP_TEXT_ING);
                    //发出一个状态信息 可从调用中根据该信息使用回调函数
                    //并传过去一个方法 用于当回调结束后将禁止触摸的事项恢复
                    this.$emit('pull-up',this.pullUpEnd);
                }


            },
            pullDownEnd(){
                //恢复触摸
                const swiper = this.$refs.swiper.swiper;
                //更改为false
                this.pulling = false;
                // 改变文字
                this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_END);
                swiper.allowTouchMove = true; //允许触摸
                swiper.params.virtualTranslate = false; //取消定住
                // 设置过渡速度和位移高度
                swiper.setTransition(swiper.params.speed);
                swiper.setTranslate(0);
                setTimeout(()=>{
                    // 延迟对应速度时间 使下拉过渡结束后发送信息用于显示头部
                    this.$emit('pull-down-transition-end');
                },swiper.params.speed);
            },
            pullUpEnd(){
                //恢复触摸
                const swiper = this.$refs.swiper.swiper;
                //更改为false
                this.pulling = false;
                // 改变文字
                this.$refs.pullUpLoading.setText(PULL_UP_TEXT_END);
                swiper.allowTouchMove = true; //允许触摸
                swiper.params.virtualTranslate = false; //取消定住
            }
        }
    }
</script>

<style scoped lang="scss">
    //父元素container的高度是可视区域的宽高
    .swiper-container{
        overflow: hidden;
        width: 100%;
        height: 100%;
    }
    // 让内容区域的高度靠子元素撑开 这样才能出现滚动条
    .swiper-slide{
        height: auto;
    }

    //下拉刷新
    .mine-scroll-pull-down{
        position: absolute;
        left: 0;
        bottom: 100%;
        width:100%;
        height: 80px;
    }
    //上拉刷新
    .mine-scroll-pull-up{
        position: absolute;
        left: 0;
        top: 100%;
        width:100%;
        height: 30px;
    }
</style>
