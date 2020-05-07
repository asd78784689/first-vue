<!-- category 分类页 -->
<template>
    <div class="category">
        <header class="g-header-container">
            <!-- 通过判断决定是否加入header-transition这个class 这个class便是红色的背景 -->
            <category-header  ref="header"></category-header>
        </header>
        <div class="g-content-container">
            <div class="sidebar">
                <!-- 通过点击返回对应id -->
                <category-tab @switch-tab="getCurrentId"></category-tab>
            </div>
            <div class="main">
                <!-- 用对应id进行内容渲染 -->
                <category-content :curId="curId"></category-content>
            </div>
        </div> 
    </div>
</template>

<script>
    import CategoryHeader from './header';      //头部组件
    import CategoryTab from './tab';         //tab部组件
    import CategoryContent from './content';      //content部组件

    export default{
        data(){
            return{
                curId:''
            }
        },
        components:{
            'category-header':CategoryHeader,
            'category-tab':CategoryTab,
            'category-content':CategoryContent
        },
        methods:{
            getCurrentId(id){
                this.curId = id;
            }
        }
    }
</script>
<style scoped lang='scss'>
    @import '~@/assets/scss/mixins';

    .category{
        overflow: hidden;
        width: 100%;
        height: 100%;
        background-color:$bgc-theme;

        .g-content-container{
            padding-top: 50px;
            display: flex;
            height: 100%;

            .sidebar{
                width: 80px;
                height: 100%;
            }
            .main{
                flex: 1;
                height: 100%;
            }
        }
    }

</style>