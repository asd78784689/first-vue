<template>
    <!-- 如果title设了值则会出现一个h1 居中作为标题存在 -->
    <me-navbar class='header' title="商品详情">
        <!-- 通过nav的插槽 将内容依据slot="(对应插槽的name值)"放置于对应插槽中 -->
        <i class="iconfont icon-back" slot="left" @click="goBack"></i>
        <i class="iconfont icon-cart" slot="right"></i>
    </me-navbar>
</template>
<script>
    import MeNavBar from '@/base/navbar';
   
    export default{
        name:"ProductHeader",
        data(){
            return {

            }
        },
        components:{
            'me-navbar':MeNavBar
        },
        methods:{
            goBack(){
                // 返回上一级
                this.$router.back();
            }
        }
    }
</script>
<style scoped lang='scss'>
    @import '~@/assets/scss/mixins';

    .header{
        &.mine-navbar{
            // background-color: transparent;
            // transition: background-color 0.5s;
            background-color: $header-bgc-translucent;
            color: #fff;
        }

        .iconfont{
            color: $icon-color-default;
            font-size: $icon-font-size;
        }

        
    }
</style>