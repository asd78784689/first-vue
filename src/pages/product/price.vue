<!-- 详情页内容区价格栏 -->
<template>
    <div class="content-price">
        <div class="price-top">
            <p class="price-left">￥<span>{{priceText}}</span></p>
            <span class="price-right">{{sellCount}}件已售</span>
        </div>
        <div class="price-bottom">
            <p class="price-title">{{title}}</p>
            <div class="deliery-box">
                <span class="delivery-postage">{{postage}}</span>
                <span class="month-sold">月销量 {{vagueSellCount}}件</span>
                <span class="delivery-price">{{from}}</span>
            </div>
        </div>
    </div>
</template>

<script>

    export default{
        name:'ProductPrice',
        data(){
            return{
                priceText:'',
                sellCount:'',
                postage:'',
                vagueSellCount:'',
                from:''
            }
        },
        props:{
            detailData:{
                type:Object,
                default:{}
            },
            title:{
                type:String,
                default:''
            }
        },
        watch:{
            detailData(obj){
                this.detailData = obj;
                // console.log(this.detailData);
                this.initData(obj);
            },
            title(str){
                this.title = str;
            }
        },
        methods:{
            initData(obj){
                this.priceText = obj.price.price.priceText;
                this.sellCount = obj.item.sellCount;
                this.postage = obj.delivery.postage;
                this.vagueSellCount = obj.item.vagueSellCount;
                this.from = obj.delivery.from;
            }
        }
    }
</script>

<style scoped lang='scss'>
    @import '~@/assets/scss/mixins';
    
    .content-price{
        border-bottom:5px solid #ccc;

        .price-top{
            height: 40px;
            line-height: 40px;
            background: linear-gradient(to right, rgb(238,54,136) , rgb(210,46,57));
            position: relative;
            color: #fff;
            
        }
        .price-left{
            margin-left: 10px;
            font-size: 12px;
            span{
                font-size: 16px;
            }
        }
        .price-right{
            position: absolute;
            height: 30px;
            line-height: 30px;
            // display: inline;
            right: 0;
            top: 0;
            font-size: 12px;
            padding: 0 7px;
            margin-top: 5px;
            margin-right: 10px;
            border-radius:5px;
            background-color: rgb(203,49,68);
            // background-color: #000;
        }
        
        .price-bottom{
            padding: 5px;
        }
        .price-title{
            font-size: 14px;
            @include multiline-ellipsis();
            padding-right: 10px;
            line-height: 1.1;
        }
        .deliery-box{
            margin-top: 10px;
            @include flex-between();
        }
    }
</style>