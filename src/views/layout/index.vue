<template>
  <div class="layout-container">
    <router-view></router-view>
    <!--导航区 -->
    <!-- 
        route: 开启路由模式 
    -->
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item to="/">
        <i slot="icon" class="iconfont icon-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="iconfont icon-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="iconfont icon-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="iconfont icon-31wode"></i>
        <span class="text">{{$store.state.user.loginToken ? "我的":"未登录"}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "layout",
  data() {
    return {
      active: 0,
    };
  },
  watch: {},
  mounted() {},
  filters: {},
  components: {},
};
</script>

<style scoped lang="less">
.layout-container {
    width: 100;
  .layout-tabbar {
    i.iconfont {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>
