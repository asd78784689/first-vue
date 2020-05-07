<template>
    <!-- 如果title设了值则会出现一个h1 居中作为标题存在 -->
    <me-navbar class='header' v-show="visible">
        <!-- 通过nav的插槽 将内容依据slot="(对应插槽的name值)"放置于对应插槽中 -->
        <!-- <div class="search-wrapper" slot="center"><i class="iconfont icon-search"></i>开学季有礼，好货5折起</div> -->
        <me-search-box fake slot='center' placeholder="开学季有礼,好货五折起" @query="getQuery" @click.native="goToSearch"></me-search-box>
        <i class="iconfont icon-msg" slot="right"></i>
    </me-navbar>
</template>

<script>
    import MeNavBar from '@/base/navbar';
    import MeSearchBox from '@/base/search-box';


    export default{
        name:"CategoryHeader",
        data(){
            return{
                visible:true
            }
        },
        components:{
            'me-navbar':MeNavBar,
            'me-search-box':MeSearchBox
        },
        methods:{
            show(){
                this.visible = true;
            },
            hide(){
                this.visible = false;
            },
            getQuery(query){
                console.log(query);
            },
            goToSearch(){
                // 路由跳转到search页面
                this.$router.push('/search');
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '~@/assets/scss/mixins';

    .header{
        // background-color: transparent;
        &.mine-navbar{
            // background-color: transparent;
            background-color: $header-bgc-translucent;
        }


        .iconfont{
            color: $icon-color-default;
            font-size: $icon-font-size;
        }

        .search-wrapper{
            background-color: #fff;
            border-radius: 15px;
            padding: 5px;
            display: flex;
            align-items: center;

            i{
                font-size: 20px;
                margin-right: 10px;
                color: #ccc;
            }
        }
    }

    
    
</style>