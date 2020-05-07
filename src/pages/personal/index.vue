<template>
    <div class="personal">
        <header class="g-header-container">
            <!-- 通过判断决定是否加入header-transition这个class 这个class便是红色的背景 -->
            <personal-header ref="header"></personal-header>
        </header>
        <me-scroll ref="scroll">
            <div class="img-container">
                <!-- <img src="@/assets/img/personal.png" alt=""> -->
            </div>
            <personal-user></personal-user>
            <personal-order></personal-order>
            <personal-assets></personal-assets>
            <personal-service></personal-service>
        </me-scroll> 
    </div>
</template>

<script>
    import PersonalHeader from './header';      //头部组件
    import PersonalUser from './user';
    import PersonalOrder from './order';
    import PersonalAssets from './assets';
    import PersonalService from './service';
    import MeScroll from '@/base/scroll/index';   //滚动条组件

    export default{
        data(){
            return{

            }
        },
        components:{
            'personal-header':PersonalHeader,
            'personal-user':PersonalUser,
            'personal-order':PersonalOrder,
            'personal-assets':PersonalAssets,
            'personal-service':PersonalService,
            'me-scroll':MeScroll,
        }
    }
</script>

<style scoped lang="scss">
    @import '~@/assets/scss/mixins';

    .personal{
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
