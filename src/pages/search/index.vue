<!-- search搜索页面 -->
<template>
    <transition name="search">
        <div class="search">
            <header class="g-header-container">
                <search-header @query="getQuery"></search-header>
            </header>
            <div class="g-content-container">
                <me-scroll ref="scroll">
                    <search-hot @loaded="updateScroll" v-show="!query"></search-hot>
                    <!-- 当清空历史搜索按钮被点击时候触发show-confirm -->
                    <search-history @loaded="updateScroll" @remove-item="updateScroll"  @show-confirm="showConfirm" ref="history"  v-show="!query"></search-history>
                    <search-result  v-show="query" :query="query"></search-result>
                </me-scroll>
            </div> 
            <me-confirm msg="确定要清空吗？" ref="confirm" @cancel="cancelConfirm" @confirm="clearAllSearchHistorys"></me-confirm>
        </div>
    </transition>
</template>

<script>
    import SearchHeader from './header';
    import SearchHot from './hot';
    import SearchHistory from './history';
    import MeScroll from '@/base/scroll';      
    import MeConfirm from '@/base/confirm';
    import SearchResult from './result';

    export default{
        data(){
            return{
                query:''
            }
        },
        components:{
            'search-header':SearchHeader,
            'me-scroll':MeScroll,
            'search-hot':SearchHot,
            'search-history':SearchHistory,
            'me-confirm':MeConfirm,
            'search-result':SearchResult
        },
        methods:{
            getQuery(query){
                // console.log(query);
                this.query = query;
            },
            updateScroll(){
                // console.log(1);
                setTimeout(()=>{
                    this.$refs.scroll && this.$refs.scroll.update();
                },100);
            },
            showConfirm(){
                //显示一个弹窗
                this.$refs.confirm.show();
            },
            cancelConfirm(){
                console.log('取消');
            },
            clearAllSearchHistorys(){
                console.log('确定');
                // 通过接口 让历史搜索中的缓存数据被清除
                this.$refs.history.clear();
                //更新滑动
                this.$refs.history.update();
            },
            
        }
    }
</script>

<style scoped lang="scss">
    @import '~@/assets/scss/mixins';

    
    .search{
        // overflow: hidden;
        // width: 100%;
        // height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: $search-z-index;
        background-color:$bgc-theme;
        height:100%;

        .g-content-container{
            padding-top: 50px;
            height: 100%;
        }
    }

    .search{
        // 动画效果
        &-enter-active,&-leave-active{
            transition: all .3s;
        }
        // 显->隐藏的最终阶段 和 隐藏->显开始时 的状态为 
        &-enter,&-leave-to{
            transform: translate3d(100%,0,0);
        }
    }

</style>