<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar">
      <!-- 按钮 -->
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>

    <!--频道列表 -->
    <!--
      通过 v-model 绑定当前激活标签对应的索引值，默认情况下启用第一个标签
      通过 animated 属性可以开启切换标签内容时的转场动画
      通过 swipeable 属性可以开启滑动切换标签页
    -->
    <van-tabs v-model="active" class="channel-tabs" animated swipeable>
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
        >{{ channel.name }}内容 1</van-tab
      >
      <!-- 占位 -->
      <div slot="nav-right" class="placeholder"></div>
      <!-- 汉按钮 -->
      <div slot="nav-right" class="hamburger-btn">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from "@/api/user";
export default {
  name: "home",
  data() {
    return {
      active: 0,
      channels: [],
    };
  },
  created() {
    console.log("122323");
    this.loadChannels();
  },
  methods: {
    async loadChannels() {
      try {
        let { data } = await getUserChannels();
        console.log(data);
        this.channels = data.channels;
      } catch (error) {
        this.$toast.fail("获取频道数据失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: unset !important;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
}

/deep/ .channel-tabs {
  .van-tab {
    border-right: 1px solid #edeff3;
    min-width: 200px;
    font-size: 30px;
    color: #777777;
  }

  .van-tab--active {
    color: #333333;
  }

  .van-tabs__nav {
    padding-bottom: 0;
  }

  .van-tabs__line {
    bottom: 8px;
    width: 31px !important;
    height: 6px;
    background-color: #3296fa;
  }

  .placeholder {
    flex-shrink: 0; //不压缩
    width: 66px;
    height: 82px;
  }

  .hamburger-btn {
    position: fixed;
    right: 0;
    width: 66px;
    height: 82px;
    background-color: #fff;
    background-color: rgba(255, 255, 255, 0.902);
    // 内部布局
    display: flex;
    justify-content: center;
    align-items: center;
    i.toutiao {
      font-size: 33px;
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      width: 2px;
      height: 58px;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
}
</style>
