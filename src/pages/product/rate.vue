<!-- 详情页内容区评价栏 -->
<template>
    <div class="content-rate"> 
        <div class="rate-top">
            商品评价({{totalCount}})
        </div>
         <div class="rate-center">
            <ul class="rate-list">
                <li class="rate-item" v-for="(item,index) in keywords">
                    <a href="javascript:;" class="rate-link">
                        {{item.word}}({{item.count}}) 
                    </a>
                </li>
            </ul>
        </div>
        <div class="rate-bottom">
            <div class="rate-user">
                <img :src="headPic" alt=""><span>{{userName}}</span>
            </div>
            <div class="rate-userContent">{{content}}</div>
            <div class="rate-time">{{dateTime}} {{skuInfo}}</div>
        </div>
    </div> 
</template>

<script>

    export default{
        name:'ProductRate',
        data(){
            return{
                totalCount:'',
                keywords:[],
                headPic:'',
                userName:'',
                content:'',
                dateTime:'',
                skuInfo:'',
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
                this.totalCount = obj.rate.totalCount;
                this.keywords = obj.rate.keywords;
                this.headPic = obj.rate.rateList[0].headPic;
                this.userName = obj.rate.rateList[0].userName;
                this.content = obj.rate.rateList[0].content;
                this.dateTime = obj.rate.rateList[0].dateTime;
                this.skuInfo = obj.rate.rateList[0].skuInfo;
            }
        }
    }
</script>

<style scoped lang='scss'>
    @import '~@/assets/scss/mixins';
    
    .content-rate{

        border-bottom:5px solid #ccc;
        padding: 10px 5px;

        .rate-top{
            font-size: 14px;
            margin-bottom:5px;
        }
        .rate-center{
            margin-bottom: 5px;

        }
        .rate-list{
            @include flex-between();
            justify-content: flex-start;
            flex-wrap: wrap;
        }
        .rate-item{
            border-radius: 5px;
            background-color: rgb(255,236,237);
            margin-right: 5px;
            margin-bottom: 5px;
            padding: 10px;
        }
        .rate-bottom{
        
        }
        .rate-user{
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            img{
                width: 32px;
                border-radius: 50%;
                margin-right: 5px;
            }

        }
        .rate-userContent{
            @include multiline-ellipsis();
            margin-bottom: 10px;
            color: #000; 
            line-height: 1.2;
        }
        .rate-time{
            @include multiline-ellipsis();
            line-height:1.1;
        }
    }
</style>