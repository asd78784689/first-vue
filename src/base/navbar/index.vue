<template>
    <div class="mine-navbar">
        <!-- 导航栏 分为左中右三个部分 通过插槽决定存在内容 -->
        <div class="mine-navbar-left">
            <slot name="left"></slot> 
            <!-- 通过插槽来接收内容 并以插槽的存在决定父元素是否存在 -->
        </div>
        <div class="mine-navbar-center">
            <slot name="center"></slot>
        </div>
        <div class="mine-navbar-right">
            <slot name="right"></slot>
        </div>
        <!-- 如果有传值就显示出来 用于作为头部标题-->
        <h1 class="mine-navbar-title" v-if="title">
            <!-- 因为flex布局与文字的溢出隐藏起冲突 所以用一个子元素包裹住 -->
            <span v-text="title" class="mine-navbar-text"></span>
        </h1>
    </div>
</template>

<script>
    export default{
        name:'MeNavBar',
        data(){
            return{

            }
        },
        props:{
            // 接收参数title
            title:{
                type:String,
                default:''
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "~@/assets/scss/mixins";

    .mine-navbar{
        @include flex-between();
        height: 50px;
        background-color: #fff;

        .mine-navbar-left{
            margin-left: 10px;
        }
        .mine-navbar-center{
            margin: 0 10px 0;
            flex:1;
        }
        .mine-navbar-right{
            margin-right: 10px;
        }
        .mine-navbar-title{
            position: absolute;
            top: 0;
            bottom: 0;
            left: 20%;
            right: 20%;
            @include flex-center();
            text-align: center;
        }   
        .mine-navbar-text{
            font-size: 18px;
            @include ellipsis();
            width: 100%;
            line-height: 1.5; 
        }
    }
    
</style>