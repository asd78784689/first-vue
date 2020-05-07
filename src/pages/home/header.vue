<template>
    <!-- 如果title设了值则会出现一个h1 居中作为标题存在 -->
    <me-navbar class='header' v-show="visible">
        <!-- 通过nav的插槽 将内容依据slot="(对应插槽的name值)"放置于对应插槽中 -->
        <i class="iconfont icon-scan" slot="left"></i>
        <me-search-box fake slot='center' placeholder="开学季有礼,好货五折起" @query="getQuery" @click.native="goToSearch"></me-search-box>
        <!-- 在组件上使用事件时候要在事件名后加上.native表示使用原生组件方法 不然触发不了 像div、p这一类原生的html就不需要! -->
        <i class="iconfont icon-msg" slot="right"></i>
    </me-navbar>
</template>

<script>
    import MeNavBar from '@/base/navbar';
    import MeSearchBox from '@/base/search-box';

    export default{
        name:"HomeHeader",
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
            background-color: transparent;
            transition: background-color 0.5s;
            // background-color: $header-bgc-translucent;
        }
        &.header-transition{
            background-color:  $header-bgc-translucent;
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