<!-- search搜索栏 热门搜索组件 -->
<template>
    <div class="hot">
        <h4 class="hot-title">热门搜索</h4>
        <div class="loading-container" v-if="!hots.length">
            <me-loading></me-loading>
        </div>
        <ul class="hot-list" v-else>
            <!-- 有个点击事件 表示选中该项 -->
            <li class="hot-item" v-for="(item,index) in hots" :key="index" @click='$_selectItem(item.hotWord)'>{{item.hotWord}}</li>
        </ul>
    </div>
</template>
<script>
    import MeLoading from '@/base/loading';             //加载中组件
    import {getSearchHotKeyword} from '@/api/search';    //获取热门推荐数据
    import {searchMixin} from '@/assets/js/mixins';    //引入公共方法中的搜索mixin
    
    export default{


        data(){
            return{
                hots:[]
            }
        },
        components:{
            'me-loading':MeLoading
        },
        mixins:[searchMixin],    //这样就算是注册了import过来的mixin方法
        created(){
            // 
            this.getHotKeyword().then(()=>{
                this.$emit('loaded');
            });
        },
        methods:{
            getHotKeyword(){
                return getSearchHotKeyword().then(data=>{
                    return new Promise(resolve =>{
                        if(data){
                            this.hots = data;
                            // console.log(data);
                            resolve();  //只有加了这一步才会去执行then
                        }
                    })
                });
            },

        }
    }
</script>
<style scoped lang="scss">
    @import '~@/assets/scss/mixins';
    
    .hot{
        background-color: #fff;
        padding: 10px;
        
        &-title{
            font-size: 18px;
            font-weight: bold;
            margin-bottom:15px;
        }

        &-list{
            @include flex-between();
            justify-content: flex-start;
            flex-wrap:wrap;
            padding-right: 15px;
        }

        &-item{
            font-size: 14px;
            background-color: #ccc;
            padding: 5px;
            text-align: center;
            margin-right: 10px;
            margin-bottom: 10px;
            border-radius: 5px;
        }
    }
</style>