<!-- category分类页内容区 -->
<template>
    <div class="content-wrapper">
        <div class="loading-container" v-if="isLoading">
            <!-- 不用loading-wrapper的话为整一个的遮罩加载 -->
            <!-- <me-loading></me-loading> -->
            <div class="loading-wrapper">
                <!-- 有的话为一个方框包裹着的加载中样式 -->
                <me-loading></me-loading>
            </div>
        </div>
        <me-scroll ref="scroll" :scrollbar="true" @scroll-end="scrollEnd" >
            <div class="content">
                <div class="pic" v-if="content.banner">
                    <a :href="content.banner.linkUrl" class="pic-link">
                        <!-- @load 为加载完成后触发 -->
                        <img @load="updateScroll" :src="content.banner.picUrl" alt="" class="pic-img">
                    </a>
                </div>
                <div class="section" v-for="(section,index) in content.data" :key="index">
                    <h4 class="section-title">{{section.name}}</h4>
                    <ul class="section-list">
                        <li class="section-item" v-for="(item,i) in section.itemList" :key="i">
                            <a :href="item.linkUrl" class="section-link">
                                <p class="section-pic" v-if="item.picUrl">
                                    <img v-lazy="item.picUrl" alt="" class="section-img">
                                </p>
                                <p class="section-name">{{item.name}}</p>
                            </a>    
                        </li>
                    </ul>
                </div>
            </div>
        </me-scroll>
        <div class="g-backtop-container">
            <me-backtop @backtop="backToTop" :visible="isBackTopVisible"></me-backtop>
        </div>
    </div>
</template>

<script>
    import MeLoading from '@/base/loading';
    import MeScroll from '@/base/scroll/index';   //滚动条组件
    import MeBacktop from '@/base/backtop';  //返回顶部组件
    import {getCategoryContent} from '@/api/category'; //ajax请求content内容
    import storage from '@/assets/js/storage';  //客户端缓存数据
    import {CATEGORY_CONTENT_KEY,CATEGORY_CONTENT_UPDATE_TIME_INTERVAL} from './config';
    
    export default{
        name:"CategoryContent",
        data(){
            return{
                content:{},
                isBackTopVisible:false,
                isLoading:true
            }
        },
        props:{
            curId:{
                type:String,
                default:''
            }
        },
        watch:{
            curId(id){
                // console.log(id);
                this.isLoading = true;
                // 获取数据之后 在执行将loading隐藏的操作
                this.getContent(id).then(()=>{

                    this.isLoading = false;
                    this.backToTop(0);
                    setTimeout(()=>{
                        this.updateScroll();
                    },1000);
                    // this.updateScroll();
                });
            }
        },
        components:{
            'me-loading':MeLoading,
            'me-scroll':MeScroll,
            'me-backtop':MeBacktop
        },
        methods:{
            backToTop(speed){
                //当点击时候返回顶部 传一个速度值决定到达顶部的速度 0基本就是瞬间回到顶部
                this.$refs.scroll  && this.$refs.scroll.scrollToTop(speed);
            },
            getContent(id){
                //从缓存中进行加载操作
                let contents = storage.get(CATEGORY_CONTENT_KEY);
                let updateTime;
                const curTime = new Date().getTime();

                if(contents && contents[id]){
                    // 缓存中如果获取得到内容
                    updateTime = contents[id].updateTime || 0;
                    if(curTime - updateTime <= CATEGORY_CONTENT_UPDATE_TIME_INTERVAL){
                        // 如果当前时间-缓存中对应数据的更新时间 的时间间隔小的话
                        //表示可以使用缓存localstorage中的数据
                        return this.getContentByLocalStorage(contents[id]);
                    }else{
                        //如果大于说明数据已经超时了需要从服务器重新获取
                        return this.getContentByHTTP(id).then(()=>{
                            // 从服务器端获取到数据后 执行回调
                            //将数据、id值、时间在localstorage之中进行对应更新
                            this.updateLocalStorage(contents,id,curTime);
                        });
                    }
                }else{
                    // 缓存中获取不到内容
                    return this.getContentByHTTP(id).then(()=>{
                        this.updateLocalStorage(contents,id,curTime);
                    });
                }


                // //根据id值获取相应数据进行渲染  用return 才能用then接着使用回调
                // return getCategoryContent(id).then(data =>{
                //     if(data){
                //         this.content = data;
                //     }
                // });
            },
            getContentByLocalStorage(contents){
                //从缓存中获取数据 然后赋值给content用于渲染
                //然后返回promise的resolve成功的回调 用于之后then的使用
                this.content = contents.data;
                return Promise.resolve();
            },
            getContentByHTTP(id){
                //从服务器端获取数据
                //根据id值获取相应数据进行渲染  用return 才能用then接着使用回调
                return getCategoryContent(id).then(data =>{
                    return new Promise(resolve =>{
                        // 如果获取到了数据才会进行返回 且返回一个promise对象
                        // 不然当获取不到数据时候 执行更新缓存的updateLocalStorage方法会报错
                        if(data){
                            this.content = data;
                            resolve();
                        }
                    });
                });
            },
            updateLocalStorage(contents,id,curTime){
                //对缓存数据进行对应更新
                //contents为获取到的总缓存数据 
                //将对应id的数据进行清空 再赋值data和updateTime作为更新时间
                //再通过引入的storage中的set()方法将其设置到localStorage之中
                contents = contents || {};
                contents[id] = {};
                contents[id].data = this.content;
                // contents[id].id = id;
                contents[id].updateTime = curTime;
                storage.set(CATEGORY_CONTENT_KEY,contents);
            },
            updateScroll(){
                //banner图加载出后进行高度更新
                this.$refs.scroll && this.$refs.scroll.update();
            },
            scrollEnd(translate,scroll,pulling){
                // 滚动过渡结束后触发
                // 通过判断translate的距离决定是否显示按钮 下拉是正 上拉为负
                // 如果移动的距离已经超过了可视区域的高度 也就是超过了一屏幕的距离
                this.isBackTopVisible = translate < 0 && -translate > scroll.height;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '~@/assets/scss/mixins';

    .content-wrapper{
        position: relative;
        height: 100%;
    }

    .loading-container{
        position: absolute;
        top: 0;
        left: 0;
        z-index:$category-popup-z-index;
        @include flex-center();
        width: 100%;
        height: 100%;
        // 不用-wrapper包裹的便使用该背景色 将为整一个的加载中遮罩
        // background-color: $modal-bgc;
        
        .mine-loading{
            color: #fff;
            font-size: 14px;
        }
    }

    .loading-wrapper{
        width: 50%;
        padding: 30px 0;
        background-color: $modal-bgc;
        border-radius: 4px;
    }

    .content{
        padding:0 10px;

        .pic{
            margin: 10px 0;
        }
        .pic-img{
            width: 100%;
        }
        .section{
            margin-bottom: 15px;

            &-title{
                font-weight:bold;
                font-size: $font-size-l;
                margin-bottom:10px;
            }

            &-list{
                width: 100%;
                background-color: #fff;
                display: flex;
                flex-wrap: wrap;
                // justify-content: center;
                align-items: center;
                padding: 10px 0 ;
            }
            &-item{
                width: 33.33%;
            }
            &-link{
                @include flex-center(column);
            }
            &-img{
                width: 100%;
            }
        }
    }
    .g-backtop-container{
        bottom: 20px;
    }
</style>