<!-- search头部header组件 -->
<template>
    <me-navbar class='header'>
        <i class="iconfont icon-back" slot="left" @click="goBack"></i>
        <me-search-box slot='center' placeholder="搜索框" @query="query"></me-search-box>
    </me-navbar>
</template>

<script>
    import MeNavBar from '@/base/navbar';
    import MeSearchBox from '@/base/search-box';

    export default{
        name:'SearchHeader',
        data(){
            return{

            }
        },
        components:{
            'me-navbar':MeNavBar,
            'me-search-box':MeSearchBox
        },
        methods:{
            query(query){
                // 将接收的query值再通过传递出去给父级组件用于调用显示对应模块
                this.$emit('query',query);
            },
            goBack(){
                // 返回上一级
                this.$router.back();
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '~@/assets/scss/mixins';
    .header{
        border-bottom: 1px solid $border-color;

        .iconfont{
            color: $icon-color;
            font-size: $icon-font-size;
        }

        .mine-search-box-wrapper{
            background-color: #f7f7f7;
        }
    }

</style>