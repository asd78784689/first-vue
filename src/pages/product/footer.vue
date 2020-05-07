<template>
    <div class="footer">
        <ul class="nav-list">
            <li class="nav-item" v-for="(item,index) in navs" :key="index">
                <a :href="item.linkUrl" class="nav-link">
                    <img :src="item.picUrl" class="nav-pic">
                    <span>{{item.text}}</span>
                </a>
            </li>
        </ul>
        <div class="footer-btns">
            <button class="footer-btn btn-cart">加入购物车</button>
            <button class="footer-btn btn-buy">马上抢</button>
        </div>
    </div>
</template>
<script>
    import {navItems} from './config';

    export default{
        name:"ProductFooter",
        data(){
            return{
                navs : navItems
            }
        }

    }  
</script>

<style scoped lang='scss'>
    @import '~@/assets/scss/mixins';

    $footer-height:50px;

    .footer{
        @include flex-center();
        background-color: #fff;
        .nav-list{
            width: 33.33%;
            @include flex-center();

            .nav-item{
                @include flex-center();
                flex: 1;
                height: $footer-height;
            }

            .nav-link{
                @include flex-center(column);
            }
        }
        .nav-pic{
            width: 20px;
            margin-bottom: 5px;
        }

        .footer-btns{
            flex: 1;
            height: $footer-height;
            @include flex-center();
            
            .footer-btn{
                flex: 1;
                height: 100%;
                color: #fff;
            }
            .btn-cart{
                background-color: rgb(255,149,1);
            }
            .btn-buy{
                background-color: #f04040;
            }
        }
    }
</style>

