<!-- 详情页内容区商家栏 -->
<template>
    <div class="content-seller">
            <div class="seller-top">
                <div class="seller-img-wrapper">
                    <img :src="shopIcon" alt="">
                </div>
                <div class="seller-nick">
                    <p class="seller-title">{{sellerNick}}</p>
                    <div class="icon-wrapper">
                        <img :src="creditLevelIcon" alt="" class="shop-icon">
                    </div>
                </div>
            </div>
            <div class="seller-evaluates">
                <ul class="seller-list">
                    <li class="seller-item" v-for="(item,index) in evaluates" :key="index">{{item.title}} {{item.score}}</li>
                </ul>
            </div>
        </div>
</template>

<script>

    export default{
        name:'ProductSeller',
        data(){
            return{
                shopIcon:'',
                evaluates:[],
                sellerNick:'',
                creditLevelIcon:'',
            }
        },
        props:{
            productData:{
                type:Object,
                default:{}
            }
        },
        watch:{
            productData(obj){
                this.init(obj);
            }
        },
        methods:{
            init(obj){
                this.shopIcon = obj.seller.shopIcon;
                this.sellerNick = obj.seller.sellerNick;
                this.creditLevelIcon = obj.seller.creditLevelIcon;
                this.evaluates = obj.seller.evaluates;
            }
        }
    }
</script>

<style scoped lang='scss'>
    @import '~@/assets/scss/mixins';
    
    .content-seller{
        border-bottom:5px solid #ccc;
        padding: 10px 5px;

        .seller-top{
            @include flex-center();
            justify-content: flex-start;

            .seller-img-wrapper{
                border: 1px solid #000;
                margin-right: 5px;
                flex: 0 0 auto;
                width:13.06667vw;

                img{
                    width: 100%;
                    display: block;
                }
            }
            .seller-nick{
                margin-top: 5px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
            }
            .seller-title{
                @include ellipsis();
                // line-height: 44px;
                font-size: 3.73333vw;
                margin-bottom: 8px;
            }
            .icon-wrapper{
                display: flex;

                .shop-icon{
                    width: auto;
                    height: 3.2vw;
                    display: block;
                }
            }
        }
        .seller-evaluates{
            margin-top: 4.26667vw;
        }
        .seller-list{
            @include flex-center();
        }
        .seller-item{
            flex: 1;
            text-align: center;
            font-size: 3.2vw;   
        }
    }

</style>