<template>
    <div>
        <!-- 通用的slider组件 通过引入此文件 再通过来对需要slider的文件 进行包装设置构成业务组件  -->

        <!-- options属性 值为data中的变量  -->
        <swiper :options="swiperOption" :key="keyId">
            <!-- 用插槽接收slider 作为基础组件不用写死 -->
            <slot></slot>
            <!-- 分页器组件  -->
            <div class="swiper-pagination" v-if="pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    import {swiper} from 'vue-awesome-swiper';

    export default{
        name:"MeSlider",
        data(){
            return{
                keyId:Math.random()
            }
        },
        components:{
            swiper
        },
        props:{
            //接收参数
            direction:{
                type:String,
                default:'horizontal',  //默认水平滑动
                //通过传入的值value 判断是否为下面的两个值 如果不为-1就返回
                //防止传入的参数写错的  
                validator(value){
                    return ['horizontal','vertical'].indexOf(value) > -1;
                }
            },
            interval:{
                //通过值 决定是否开启轮播 且值为数字 决定轮播时间
                type:Number,
                default:3000,
                //通过传入的值value 判断是否为下面的两个值 如果不为-1就返回
                //防止传入的参数写错的  
                validator(value){
                    return value >= 0;
                }
            },
            loop:{
                // 滚动
                type:Boolean,
                default:true
            },
            pagination:{
                // 分页器
                type:Boolean,
                default:true
            },
            data:{
                type:Array,
                default(){
                    return [];
                }
            }
        },
        watch:{
            data(newData){
                if(newData.length === 0) return;

                this.swiperOption.loop = newData.length <=1 ? false : this.loop;
                this.keyId = Math.random();
            }
        },
        created(){
            this.init();
        },
        methods:{
            init(){
                this.swiperOption = {
                    watchOverflow:true, // 只有一个slide时候就不允许滑动
                    direction:this.direction, // 传入的滑动方式
                    autoplay:this.interval ? { // 是否自动播放
                        delay:this.interval,
                        disableOnInteraction:false  
                    } : false,
                    slidesPerView:1, // 设置slider容器 能够同时显示的slides数量
                    loop:this.data.length <= 1 ? false : this.loop ,  // 滚动
                    pagination:{  //分页器
                        el:this.pagination ? '.swiper-pagination' : null
                    }
                };
            }
        }
    }
</script>

<style scoped lang="scss">
    .swiper-container{
        width: 100%;
        height: 100%;
    }
</style>