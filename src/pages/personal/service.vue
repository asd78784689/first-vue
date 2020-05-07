<!-- 个人中心服务 -->
<template>
    <div class="service">
        <ul class="service-list">
            <li class="service-item" v-for="(item,index) in items" :key="index">
                <img :src="item.picUrl" alt="">
                <p class="service-name">{{item.name}}</p>
            </li>
        </ul>
        <div class="service-bottom">
            <p>客服热线400-123-8888(8:00-22:00)</p>
            <p>拨打前请记录您的UID 0</p>
        </div>
    </div>
</template>

<script>
    import {serviceArr} from './config';

    export default{
        name:'PersonalService',
        data(){
            return{
                
            }
        },
        created(){
            this.init();
        },
        methods:{
            init(){
                this.items = serviceArr;
            }
        }
    }
</script>
<style scoped lang="scss">
    @import '~@/assets/scss/mixins';

    .service{
        padding-bottom: 15px;

        &-list{
            
        }
        &-item{
            @include flex-center();
            justify-content: flex-start;
            background-color: #fff;
            border-bottom: 1px solid #ccc;
            padding: 10px 7px;
            position: relative;
            img{
                width: 32px;
                vertical-align: middle;
                margin-right: 20px;
            }
        }
        &-item::before{
            content: '>';
            display: inline-block;
            font-size: 28px;
            position: absolute;
            top: 50%;
            margin-top: -14px;
            right: 10px;
            color: #ccc;
        }
        &-name{
            font-size: 16px;
        }
        &-bottom{
            padding: 15px 10px 15px 15px;
            
            p{
                font-size: 16px;
                margin-top:5px;
            }
        }
    }
</style>