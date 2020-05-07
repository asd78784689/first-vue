<!-- 个人中心资产 -->
<template>
    <div class="assets">
        <div class="assets-top">
            <div class="assets-title">
                <img src="./img/assets.png" alt=""><span>我的资产</span>
            </div>
        </div> 
        <ul class="assets-list">
            <li class="assets-item" v-for="(item,index) in items">
                <p class="assets-name">{{item.name}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    import {assetssArr} from './config';

    export default{
        name:'PersonalAssets',
        data(){
            return{
                
            }
        },
        created(){
            this.init();
        },
        methods:{
            init(){
                this.items = assetssArr;
            }
        }
    }
</script>
<style scoped lang="scss">
    @import '~@/assets/scss/mixins';

    .assets{
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

        }
        &-name{
            margin-top: 7px;
            font-size: 16px;
        }
    }
</style>