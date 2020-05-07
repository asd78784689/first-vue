<!-- 个人中心用户 -->
<template>
    <div class="user">
        <div class="user-head">
            <img src="./img/personal.png" alt="">
        </div>
        <ul class="user-btns">
            <li class="user-btn" v-for="item in btns">{{item}}</li>
        </ul>
    </div>
</template>

<script>
    
    export default{
        name:'PersonalUser',
        data(){
            return{
                btns:['注册','登录']
            }
        }
    }
</script>
<style scoped lang="scss">
    @import '~@/assets/scss/mixins';

    .user{
        
        height: 165px;
        background-color: rgb(222, 24, 27);
        @include flex-center(column);
        border-bottom: 15px solid #ccc;


        &-head{
            width: 70px;
            height: 70px;
            border-radius: 50%;
            overflow: hidden;
            background-color: #fff;
            text-align:center;
            line-height: 70px;

            img{
                width: 42px;
                vertical-align: middle;
            }
        }

        &-btns{
            @include flex-center();
            width: 100%;
            padding: 0 30px;
            margin-top: 10px;
        }
        
        &-btn{
            flex:1;
            font-size: 24px;
            color: #fff;
            text-align:center;
            border-right: 2px solid #fff;
        }
        &-btn:last-child{
            border-right: none;
        }
    }
</style>