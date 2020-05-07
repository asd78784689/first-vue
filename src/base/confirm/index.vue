<!-- confirm 弹窗组件 -->
<template>
    <transition name="mine-confirm">
        <div class="mine-confirm-wrapper" v-show="visible">
            <div class="mine-confirm">
                <div class="mine-confirm-title">{{title}}</div>
                <div class="mine-confirm-msg">{{msg}}</div>
                <div class="mine-confirm-btns">
                    <button class="mine-confirm-btn mine-confirm-cancel" @click="cancel">{{cancelBtnText}}</button>
                    <button class="mine-confirm-btn mine-confirm-ok" @click="confirm">{{confirmBtnText}}</button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    

    export default{
        name:'MeConfirm',
        data(){
            return{
                visible:false
            }
        },
        props:{
            msg:{
                type:String,
                default:'确定执行此操作吗？'
            },
            title:{
                type:String,
                default:''
            },
            cancelBtnText:{
                type:String,
                default:'取消'
            },
            confirmBtnText:{
                type:String,
                default:'确定'
            },
        },
        methods:{
            show(){
                this.visible = true;
            },
            hide(){
                this.visible = false;
            },
            cancel(){   
                this.hide();
                this.$emit('cancel');
            },      
            confirm(){
                this.hide();
                this.$emit('confirm');
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '~@/assets/scss/mixins';

    .mine-confirm-wrapper{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: $search-popup-z-index;
        @include flex-center();
        background-color: $modal-bgc;

    }

    .mine-confirm{
        overflow: hidden;
        width: 88%;
        background-color: #fff;
        border-radius: 10px;
        font-size: 16px;
    
        &-title{
            padding: 20px 15px 0;
            font-size: 18px;
            text-align: center;
            @include ellipsis();

            & + .mine-confirm-msg{
                padding-top: 20px;
                padding-bottom: 20px;
            }
        }

        &-msg{
            padding:40px 15px;
            text-align: center;
            line-height: 1.5;
        }
        
        &-btns{
            @include flex-center();
        }

        &-btn{
            flex: 1;
            height: 44px;
            line-height: 44px;
            background: none;
            border: none;
        }

        &-cancel{
            border-top: 1px solid #e3e5e9;
        }

        &-ok{
            background-color: #f23030;
            color: #fff;
        }
    }

    .mine-confirm{
        // 这一个confirm是transition的name opacity作用于整体 也就是遮罩层的透明度 
        &-enter-active,&-leave-active{
            transition: opacity .3s;
        }
        &-enter,&-leave-to{
            opacity: 0;
        }
        // 开始进行显示时 执行关键帧动画效果 从0-1.1-1的放大效果
        &-enter-active{
            .mine-confirm{
                // 这一个则是弹窗的框
                animation: bounce-in .3s;
            }
        }
    }

    //https://cn.vuejs.org/v2/guide/transitions.html#CSS-动画
    @keyframes bounce-in{
        0%{
            transform: scale(0);
        }
        50%{
            transform: scale(1.1);
        }
        100%{
            transform: scale(1);
        }
    }

</style>