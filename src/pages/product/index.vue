<!-- 商品详情页 -->
<template>
    <transition name="product" appear>
        <div class="product">
            <header class="g-header-container">
                <product-header ref="header"></product-header>
            </header>
            <div class="loading-container" v-if="isLoading">
                <!-- 不用loading-wrapper的话为整一个的遮罩加载 -->
                <!-- <me-loading></me-loading> -->
                <div class="loading-wrapper">
                    <!-- 有的话为一个方框包裹着的加载中样式 -->
                    <me-loading></me-loading>
                </div>
            </div>
            <me-scroll ref="scroll">
                <product-slider ref="slider" :picSliders="sliders"></product-slider>
                <product-content :content="products"></product-content>
            </me-scroll>
            <product-footer class="g-footer-container"></product-footer>
        </div>
    </transition>
</template>

<script>
    import MeLoading from '@/base/loading';
    import MeScroll from '@/base/scroll';
    import ProductHeader from './header';
    import ProductFooter from './footer';
    import ProductSlider from './slider';
    import ProductContent from './content';

    import {getProductDetail} from '@/api/product';
    import storage from '@/assets/js/storage';  //客户端缓存数据
    import {PRODUCT_CONTENT_KEY,PRODUCT_CONTENT_UPDATE_TIME_INTERVAL} from './config';

    export default{
        name:'Product',
        data(){
            return{
                isLoading:false,
                products:{},
                sliders:[]
            }
        },
        components:{
            'me-loading':MeLoading,
            'me-scroll':MeScroll,
            'product-header':ProductHeader,
            'product-footer':ProductFooter,
            'product-slider':ProductSlider,
            'product-content':ProductContent
        },
        created(){
            this.getProduct().then( () =>{
                this.isLoading = false;
                setTimeout(()=>{
                    this.updateScroll();
                },1000);
            });
        },
        methods:{
            getProduct(){
                // console.log(this.$route.params.id);
                if(!this.$route.params.id){
                    return;
                }
                this.isLoading = true;
                let id = this.$route.params.id;
                //从缓存中进行加载操作
                let contents = storage.get(PRODUCT_CONTENT_KEY); //缓存数据
                let updateTime;
                const curTime = new Date().getTime();

                if(contents && contents[id]){
                    // 缓存中如果获取得到内容
                    updateTime = contents[id].updateTime || 0;
                    if(curTime - updateTime <= PRODUCT_CONTENT_UPDATE_TIME_INTERVAL){
                        // 如果当前时间-缓存中对应数据的更新时间 的时间间隔小的话
                        //表示可以使用缓存localstorage中的数据
                        return this.getProductByLocalStorage(contents[id]);
                    }else{
                        //如果大于说明数据已经超时了需要从服务器重新获取
                        return this.getProductByHTTP(id).then(()=>{
                            // 从服务器端获取到数据后 执行回调
                            //将数据、id值、时间在localstorage之中进行对应更新
                            this.updateLocalStorage(contents,id,curTime);
                        });
                    }
                }else{
                    // 缓存中获取不到内容
                    return this.getProductByHTTP(id).then(()=>{
                        this.updateLocalStorage(contents,id,curTime);
                    });
                }
            },
            getProductByLocalStorage(contents){
                //从缓存中获取数据 然后赋值给content用于渲染
                //然后返回promise的resolve成功的回调 用于之后then的使用
                return new Promise(resolve =>{
                    setTimeout(()=>{
                        // 放在异步中 才会让数据成功获取到之后更新
                        this.products = contents.data;
                        // console.log(this.products);
                        this.sliders = contents.data.item.images;
                        resolve();
                    },1000);
                });
            },
            getProductByHTTP(id){
                //从服务器端获取数据
                //根据id值获取相应数据进行渲染  用return 才能用then接着使用回调
                return getProductDetail(id).then(data =>{
                    return new Promise(resolve =>{
                        // 如果获取到了数据才会进行返回 且返回一个promise对象
                        // 不然当获取不到数据时候 执行更新缓存的updateLocalStorage方法会报错
                        if(data){
                            this.products = data;
                            console.log(this.products);
                            this.sliders = data.item.images;
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
                contents[id].data = this.products;
                // contents[id].id = id;
                contents[id].updateTime = curTime;
                storage.set(PRODUCT_CONTENT_KEY,contents);
            },
            updateScroll(){
                // 进行高度更新 
                this.$refs.scroll && this.$refs.scroll.update();
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '~@/assets/scss/mixins';
    .product{
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        z-index: $product-z-index;
        width: 100%;
        height: 100%;
        background-color: #fff;

        .g-header-container+.swiper-container{
            padding-top: 50px;
            padding-bottom: 50px;
        }
        
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

    .product{
        // 动画效果
        &-enter-active,&-leave-active{
            transition: all .3s;
        }
        // 显->隐藏的最终阶段 和 隐藏->显开始时 的状态为 
        &-enter,&-leave-to{
            transform: translate3d(100%,0,0);
        }
    }
</style>