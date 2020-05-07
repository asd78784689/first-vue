<template>
    <div class="cart">
        <header class="g-header-container">
            <!-- 通过判断决定是否加入header-transition这个class 这个class便是红色的背景 -->
            <cart-header ref="header"></cart-header>
        </header>
        <me-scroll ref="scroll">
            <div class="img-container">
                <img src="@/assets/img/cart.png" alt="">
            </div>
        </me-scroll> 
    </div>
</template>

<script>
    import CartHeader from './header';      //头部组件
    import MeScroll from '@/base/scroll/index';   //滚动条组件

    
    export default{
        data(){
            return{

            }
        },
        components:{
            'cart-header':CartHeader,
            'me-scroll':MeScroll,
            
        }
    }
</script>
<style scoped lang="scss">
    @import '~@/assets/scss/mixins';

    .cart{
        overflow: hidden;
        width: 100%;
        height: 100%;
        background-color:$bgc-theme;
    }
    .img-container{
        padding-top:50px;
        img{
            width: 100%;
        }
    }
</style>