<template>
    <!-- 如果title设了值则会出现一个h1 居中作为标题存在 -->
    <me-navbar class='header' title='购物车'>
        <!-- 通过nav的插槽 将内容依据slot="(对应插槽的name值)"放置于对应插槽中 -->
        <i class="iconfont icon-msg" slot="right"></i>
    </me-navbar>
</template>

<script>
    import MeNavBar from '@/base/navbar';
    
    export default{
        name:'CartHeader',
        data(){
            return{

            }
        },
        components:{
            'me-navbar':MeNavBar,
        },
    }
</script>
<style scoped lang="scss">
    @import '~@/assets/scss/mixins';

    .header{
        // background-color: transparent;
        &.mine-navbar{
            // background-color: transparent;
            // transition: background-color 0.5s;
            background-color: #fff;
        }

        .iconfont{
            color: $icon-color;
            font-size: $icon-font-size;
        }

    }

</style>