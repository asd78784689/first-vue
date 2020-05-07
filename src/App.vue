<template>
  <div id="app" class="g-container">
    <div class="g-view-container">
      <keep-alive>
        <!-- 保持alive 不然每次路由切换后页面得重新从头开始加载 -->
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="g-footer-container">
      <c-tabbar></c-tabbar>
    </div>
    <!-- <img src="./assets/logo.png"> -->
  </div>
</template>

<script>
  import CTabbar from './components/tabbar';
export default {
  name: 'App',
  components:{
    'c-tabbar':CTabbar
  }
}
</script>

<style lang="scss">

</style>
