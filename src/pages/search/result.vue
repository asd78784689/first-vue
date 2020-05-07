<!-- search搜索栏 history历史纪录组件 -->
<template>
    <div class="result"> 
        <div class="loading-container" v-show="loading">
            <me-loading></me-loading>
        </div>
        <ul class="g-list" v-show="!loading && results.length">
            <li class="g-list-item" v-for="(item,index) in results" :key="index" @click='$_selectItem(item[0])'>
                <span class="g-list-text">{{item[0]}}</span>
            </li>
        </ul>
        <div class="no-result" v-show="!loading && !results.length">没有结果</div>
    </div>
</template>
<script>
    import MeLoading from '@/base/loading';
    import {getSearchResult} from '@/api/search';
    import {searchMixin} from '@/assets/js/mixins';

    export default{
        name:'SearchResult',
 
        data(){
            return{
                results:[],
                loading:false
            }
        },
        mixins:[searchMixin],
        props:{
            query:{
                type:String,
                default:''
            }
        },
        components:{
            'me-loading':MeLoading
        },
        watch:{
            query(query){
                this.getResults(query);
            }
        },
        methods:{
            getResults(keyword){
                if(!keyword){
                    return;
                }
                this.loading = true;
                getSearchResult(keyword).then( (data) =>{
                    if(data){
                        this.results = data;
                        this.loading = false;
                    }
                })
            }
        }
    }
</script>
<style scoped lang="scss">
    @import '~@/assets/scss/mixins';
    
    .result{
        background-color: #fff;

        .loading-container{
            padding-top: 20px;
            padding-bottom: 20px;
        }
    }
    .no-result{
        text-align:center;
        font-size: 18px;
        padding-top: 20px;
        padding-bottom: 20px;

    }
</style>