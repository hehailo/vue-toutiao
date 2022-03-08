<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <!-- 按钮 -->
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
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
      >
        <!-- 文章列表 -->
        <ArticleList :channel="channel" />
      </van-tab>
      <!-- 占位 -->
      <div slot="nav-right" class="placeholder"></div>
      <!-- 汉堡按钮 -->
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isChennelEditShow = true"
      >
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="isChennelEditShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 
      channels 传递我的频道给频道编辑弹窗
      update-active 子组件改变当前频道
     -->
      <ChannelEdit
        :myChannels="channels"
        :active="active"
        @update-active="onUpdateActive"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from "@/api/user";
import ArticleList from "./components/ArticleList.vue";
import ChannelEdit from "./components/ChannelEdit.vue";
import { mapState } from "vuex";
import { getItem } from "@/utils/storage";
export default {
  name: "home",
  data() {
    return {
      active: 0,
      channels: [],
      isChennelEditShow: false,
    };
  },
  components: {
    ArticleList,
    ChannelEdit,
  },
  created() {
    this.loadChannels();
  },
  computed: {
    ...mapState({
      loginToken: (state) => state.user.loginToken,
    }),
  },
  methods: {
    async loadChannels() {
      try {
        let channels = [];
        if (this.loginToken) {
          // 已登录，请求获取用户频道列表
          let { data } = await getUserChannels();
          console.log("已登录", data);
          this.channels = data.channels;
        } else {
          // 未登录，判断是否有本地的频道列表数据
          const localChannels = getItem("TOUTIAO_CHANNELS");
          console.log(localChannels);
          if (localChannels) {
            channels = localChannels;
          } else {
            let { data } = await getUserChannels();
            console.log("未登录", data);
            channels = data.channels;
          }
        }
        this.channels = channels;
      } catch (error) {
        this.$toast.fail("获取频道数据失败");
      }
    },
    onUpdateActive(newIndex, isChennelEditShow = true) {
      // 更新选中频道
      this.active = newIndex;
      // 挂壁编辑频道弹层
      this.isChennelEditShow = isChennelEditShow;
    },
  },
};
</script>

<style scoped lang="less">
.home-container {
  margin-bottom: 100px;
  padding-top: 174px;

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
    min-width: 228px;
    font-size: 30px;
    color: #777777;
  }

  .van-tab--active {
    color: #333333;
  }

  .van-tabs__wrap {
    position: fixed;
    top: 92px;
    z-index: 1;
    left: 0;
    right: 0;
    height: 82px;
  }

  .van-tabs__nav {
    padding-bottom: 0;
  }

  .van-tabs__nav--line.van-tabs__nav--complete {
    padding: 0;
  }

  .van-tabs__line {
    bottom: 8px;
    width: 36px !important;
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
