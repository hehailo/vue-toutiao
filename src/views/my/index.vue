<template>
  <div class="my-container">
    <!-- 已登录 头部 -->
    <div class="header user-info" v-if="loginToken">
      <div class="base-info">
        <div class="left">
          <van-image
            class="avatar"
            src="https://www.bmw.com.cn/zh/_img/my-bmw.png"
            round
            fit="cover"
          />
          <span class="name">秦始皇</span>
        </div>
        <div class="right">
          <van-button size="mini" round to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>

    <!-- 未登录 头部-->
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <!-- 宫格导航 -->
    <van-grid class="grid-nav mb-9" column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>

    <!-- 消息通知 -->
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link class="mb-9" />
    <!-- 退出按钮 -->
    <van-cell
      v-if="loginToken"
      title="退出登录"
      @click="onLogout"
      class="logout-cell"
      clickable
    />
  </div>
</template>

<script>
import { getUserInfo } from "@/api/user";
import { mapState } from "vuex";
export default {
  name: "my",
  data() {
    return {
      userInfo: {},
    };
  },
  created() {
    if (this.loginToken) {
      this.loadUserInfo();
    }
  },
  computed: {
    ...mapState({
      loginToken: (state) => state.user.loginToken,
    }),
  },
  methods: {
    // 退出
    onLogout() {
      this.$dialog
        .confirm({
          title: "确认退出吗？",
        })
        .then(() => {
          // on confirm
          console.log("用户退出");
          this.$store.commit("USERTOKEN", null);
        })
        .catch(() => {
          // on cancel
          console.log("取消退出");
        });
    },
    // 获取用户信息
    async loadUserInfo() {
      try {
        let { data } = await getUserInfo();
        this.userInfo = data;
      } catch (error) {
        this.$toast.fail("获取数据失败，请稍后重试");
      }
    },
  },
};
</script>

<style scoped lang="less">
.my-container {
  width: 100%;
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }

  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
          margin-right: 23px;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
      .right {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }

  .grid-nav {
    .grid-item {
      height: 141px;
      i.iconfont {
        font-size: 45px;
      }
      .icon-shoucang {
        color: #eb5253;
      }
      .icon-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }

  .mb-9 {
    margin-bottom: 9px;
  }
}
</style>
