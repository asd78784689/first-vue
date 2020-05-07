<!-- loading组件 用于显示加载中 -->
<template>
    <!-- 通过传入的inline的值决定是否加入.mine-loading-inline这个class -->
    <div class="mine-loading" :class="{'mine-loading-inline': inline }">
        <!-- 图标 -->
        <span class="mine-loading-indicator" v-if="indicator === 'on'">
            <slot><img src="./loading.gif" alt="loading"></slot>
        </span>
        <span class="mine-loading-text" v-if="loadingText">{{loadingText}}</span>
    </div>
</template>

<script>
    
    export default{
        name:"MeLoading",
        data(){
            return{
                loadingText : this.text
            }
        },
        props:{
            indicator:{   //图标是否打开
                type:String,
                default:'on',
                validator(value){
                    //对传入值进行判断
                    return ['on','off'].indexOf(value) > -1;
                }
            },
            text:{       //文字内容
                type:String,
                default:'加载中...'
            },
            inline:{    //是否图标与文字为一行
                type:Boolean,
                default:false
            }
        },
        methods:{
            setText(newText){
                // 不能通过方法传入的值直接更改为通过props传入的参数值
                // 所以要通过在data中定义一个变量用于接收props接受的参数
                // 而方法则可以通过修改这个变量的值达到修改的目的
                this.loadingText = newText;
            }
        },
        watch:{
            text(newText){
                //这里监听text属性的值 是为了防止项目中会有对props中的text传值
                //做了一个双重保护
                this.loadingText = newText;
            }
        }   
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/mixins';

    .mine-loading{
        overflow:hidden;
        width: 100%;
        height: 100%;
        @include flex-center(column);
        
        &.mine-loading-inline{
            // 同时存在这两个类时 将flex的方向更为row
            flex-direction: row;
            .mine-loading-indicator ~ .mine-loading-text{
                // ~临近的选择器
                margin-top:0;
                margin-left: 6px;
            }
        }
    }

    .mine-loading-indicator ~ .mine-loading-text{
        // ~临近的选择器
        margin-top:6px;
    }

</style>