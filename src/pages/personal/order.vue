<!-- 个人中心订单 -->
<template>
    <div class="order">
        <div class="order-top">
            <div class="order-title">
                <img src="./img/order.png" alt=""><span>我的订单</span>
            </div>
            <div class="order-wrap">
                <p>查看我的全部订单</p>
            </div>
        </div> 
        <ul class="order-list">
            <li class="order-item" v-for="(item,index) in items">
                <img :src="item.picUrl" alt="">
                <p class="order-name">{{item.name}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    import {ordersArr} from './config';

    export default{
        name:'PersonalOrder',
        data(){
            return{
                
            }
        },
        created(){
            this.init();
        },
        methods:{
            init(){
                this.items = ordersArr;
            }
        }
    }
</script>
<style scoped lang="scss">
    @import '~@/assets/scss/mixins';

    .order{
        background-color: #fff;
        border-bottom: 15px solid #ccc;
        &-top{
            position: relative;
            border-bottom: 1px solid #ccc;
            padding: 0 10px;
            height: 50px;
            line-height:50px;
            font-size: 16px;
        }
        &-wrap{
            position: absolute;
            right: 30px;
            top: 0;

        }
        &-wrap::after{
            content: '>';
            display: inline-block;
            position: absolute;
            right: -30px;
            top: -1px;
            font-size: 24px;
            color: #ccc;
        }
        &-title{

            img{
                width: 32px;
                vertical-align: middle;
                margin-right: 20px;
            }
        }
        &-list{
            @include flex-center();
            
        }
        &-item{
            flex: 1;
            margin: 13px 0;
            @include flex-center(column);

            img{
                width: 36px;
            }
        }
        &-name{
            margin-top: 7px;
            font-size: 16px;
        }
    }
</style>