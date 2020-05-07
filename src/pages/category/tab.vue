<template>
    <me-scroll :scrollbar="false" ref="scroll">
        <!-- <div>111</div> -->
        <ul class="tab">
            <!-- 只有被点击项的id与当前id相同才会高亮 -->
            <li class="tab-item" :class="{'tab-item-active':item.id === curId}" v-for="(item,index) in items" :key="index" @click="switchTab(item.id)">
                <a href="javascript:;" :dataId="item.id">{{item.name}}</a>
            </li>
        </ul>
    </me-scroll>
</template>

<script>
    import MeScroll from '@/base/scroll/index';   //滚动条组件
    import {categoryNames} from './config';
    
    export default{
        name:"CategoryTab",
        data(){
            return{
                curId:''
            }
        },
        components:{
            'me-scroll':MeScroll
        },
        created(){
            this.init();
        },
        methods:{
            init(){
                 // 一定要用一个变量去接受config中导入的参数再去使用v-for
                this.items = categoryNames;
                // 初次进入就让第一个item为被选中
                this.switchTab(this.items[0].id);
            },
            switchTab(id){
                if(this.curId === id){
                    //如果当前点击的为目前显示的 便直接返回不做操作
                    return;
                }
                // 让curId为当前被点击项的id值 并发送状态信息传去id值
                this.curId = id;
                this.$emit('switch-tab',id);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '~@/assets/scss/mixins';

    $tab-item-height:46px;

    .tab{
        width: 100%;
        padding-bottom:10px;
        // overflow-x: hidden;
        // overflow-y: auto;

        &-item{
            width: 100%;
            height: $tab-item-height;
            background-color: #fff;
            border-right: 1px solid $border-color;
            border-bottom: 1px solid $border-color;
            font-size: $font-size-l;
            color: #080808;
            font-weight: bold;
            text-align: center;
            line-height: $tab-item-height;
            @include ellipsis();

            &:last-child{
                border-bottom: none;
            }
        }

        &-item-active{
            background:none;
            border-right: none;
            a{
                color:#f23030;
            }
            // color: #f23030;
        }
    }
</style>