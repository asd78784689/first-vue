<template>
    <!-- 用transition标签包裹 可以进行定义动画样式的定义 以此进行显示隐藏的动画效果 -->
    <!-- name的值相当于class -->
    <transition name="mine-backtop">
        <a href="javascript:;" class="mine-backtop" v-show="visible" @click="backToTop">
            <i class="iconfont icon-backtop"></i>
        </a>
    </transition>
</template>
<script>
    export default{
        name:'MeBacktop',
        data(){
            return{

            }
        },
        props:{
            visible:{
                type:Boolean,
                default:false
            }
        },
        methods:{
            backToTop(){
                this.$emit('backtop');
            }
        }
    }
</script>
<style scoped lang='scss'>
    @import '~@/assets/scss/mixins';

    .mine-backtop{
        overflow: hidden;
        @include flex-center();
        // position: absolute;
        // 具体定位引用中设置
        // right:5px;
        // bottom: 40px;
        // z-index: 10;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background-color: rgba(0,0,0,.6);
        border: none;
        cursor: pointer;

        .iconfont{
            color: #fff;
            font-size: 38px;
        }
    }

    .mine-backtop{
        //显->隐 为 enter 隐->显为 leave
        //-active均为生效触发时的样式 也就是过程

        &-enter-active,
        &-leave-active{
            transition: opacity 0.4s;
        }
        
        // 隐-显的开头时 和显-隐的最后
        &-enter,&-leave-to{
            opacity:0;
        }


    }
</style>