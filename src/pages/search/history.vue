<!-- search搜索栏 history历史纪录组件 -->
<template>
    <div class="history" v-if="historys.length"> 
        <h4 class="history-title">历史搜索</h4>
        <!-- 因为要给ul下的li做动画效果 但是transition不能直接包裹li 所以 要用transition-group 通过tag="ul"这个属性值能够使其在渲染时候为ul标签 还相当于有transition标签包住了每一条的li -->
        <transition-group name='list' tag="ul" class="g-list">
            <li class="g-list-item" v-for="item in historys" :key="item" @click="$_selectItem(item)">
                <span class="g-list-text">{{item}}</span>
                <!-- 用.stop阻止冒泡 不然会触发li上面的click事件 -->
                <i class="iconfont icon-delete" @click.stop="removeItem(item)"></i>
            </li>
        </transition-group>
        <a href="javascript:;" class="history-btn" @click="showConfirm"><i class="iconfont icon-clear"></i>清空历史搜索</a>
    </div>
</template>
<script>
     import storage from '@/assets/js/storage';
     import {SEARCH_HISTORY_KEYWORD_KEY} from './config';
     import {searchMixin} from '@/assets/js/mixins';

    export default{
        name:'SearchHistory',
 
        data(){
            return{
                historys:[]
            }
        },
        mixins:[searchMixin],
        created(){
            this.getKeyword().then(()=>{
                this.$emit('loaded');
            });
        },
        methods:{
            getKeyword(){
                this.historys = storage.get(SEARCH_HISTORY_KEYWORD_KEY,[]);
                return new Promise(resolve=> resolve());
            },
            removeItem(keyword){
                
                // .filter()进行过滤操作 缓存数组中每一项进行循环 如果值不等于被点击项的文字
                //就返回最后组成一个新的数组 
                this.historys = this.historys.filter(val => val !== keyword);
            
                //重新设置缓存数据
                storage.set(SEARCH_HISTORY_KEYWORD_KEY,this.historys);
                setTimeout(()=>{
                    // 因为有动画效果的删除 所有发送信息不能太快 不然更新失败
                    this.$emit('remove-item');
                },100);
                // this.$emit('remove-item');
            },
            showConfirm(){
                //曝出一个状态信息 用于显示一个弹窗 提示是否清空
                this.$emit('show-confirm');
            },
            clear(){
                // 清空缓存数据
                storage.remove(SEARCH_HISTORY_KEYWORD_KEY);
            },
            update(){
                //进行更新 再次获取数据 
                this.getKeyword();
            }
        }
    }
</script>
<style scoped lang="scss">
    @import '~@/assets/scss/mixins';
    
    .history{
        padding-bottom: 30px;
        background-color: #fff;

        &-title{
            height: 34px;
            line-height: 34px;
            padding: 0 10px;
            font-size: $font-size-l;
            font-weight: bold;
        }

        &-btn{
            @include flex-center();
            width: 80%;
            height: 40px;
            background:none;
            border: 1px solid #ccc;
            border-radius: 4px;
            margin: 0 auto;
            color: #686868;
        }
    }

    .list{
        // 实现了在100毫秒内高度变为0
        &-enter-active,&-leave-active{
            transition: height 0.1s;
        }
        &-enter,&-leave-to{
            height: 0;
        }
    }
</style>