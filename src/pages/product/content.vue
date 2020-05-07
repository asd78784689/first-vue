<!-- 详情页内容区域 -->
<template>
    <div class="content">
        <product-price :detailData="detailData" :title="product.item.title"></product-price>
        <product-rate :productData="product"></product-rate>
        <product-seller :productData="product"></product-seller>
    </div>
</template>

<script>
    import ProductPrice from './price';
    import ProductRate from './rate';
    import ProductSeller from './seller';

    export default{
        name:'ProductContent',
        data(){
            return{
                product : {
                    item:{
                        title:''
                    }
                },  //总数据
                detailData:{},  //商品价格等参数
            }
        },
        components:{
            'product-price':ProductPrice,
            'product-rate':ProductRate,
            'product-seller':ProductSeller,
        },
        props:{
            content:{
                type:Object,
                default:{}
            }
        },
        watch:{
            content(obj){
                this.product = obj;
                // console.log(this.product);
                this.detailData = JSON.parse(obj.apiStack[0].value);
                // 数据中的apiStack[0]为商品的数据 为json格式 所以要进行转化
                // console.log(this.detailData);
                // 这个data中 .delivery.from为发货地
                //  .delivery.postage为邮费
                //  .item.sellCount 为已售 
                //  .price.price.priceText为价格
                //  .vagueSellCount 为月销售
            }
        }
    }
</script>

<style scoped lang='scss'>
    @import '~@/assets/scss/mixins';
    
    .content{
        padding-bottom: 100px;
    }
</style>