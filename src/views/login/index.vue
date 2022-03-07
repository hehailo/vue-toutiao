<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" class="page-nav-bar">
        <van-icon slot="left" name="cross" size="18"  @click="$router.back()"/>
    </van-nav-bar>

    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        name="mobile"
        v-model="user.mobile"
        placeholder="用户名"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <!-- 倒计时 -->
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="sss后重新发送"
            @finish="isCountDownShow = false"
          />
          <!-- 短信发送按钮 -->
          <van-button
            v-else
            native-type="button"
            @click="onSendSms"
            class="send-sms-btn"
            size="small"
            round
            type="default"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <!-- 提交按钮 -->
      <div class="login-btn-wrap">
        <!-- 普通按钮为什么会触发表单提交 -->
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from "@/api/user";
export default {
  name: "Login",
  data() {
    return {
      // 控制倒计时
      isCountDownShow: false,
      user: {
        mobile: "13911111111", // 手机号
        code: "246810", // 验证码
        password: "123456",
      },
      userFormRules: {
        // 表单验证
        // 1、给 van-field 组件配置 rules 验证规则
        //   参考文档：https://youzan.github.io/vant/#/zh-CN/form#rule-shu-ju-jie-gou
        // 2、当表单提交的时候会自动触发表单验证
        //    如果验证通过，会触发 submit 事件
        //    如果验证失败，不会触发 submit
        mobile: [
          { required: true, message: "手机号不能为空" },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: "手机号格式错误" },
          // { validator: this.validator, message: "手机号长度不够！" },
        ],
        code: [
          { required: true, message: "验证码不能为空" },
          { pattern: /^\d{6}$/, message: "验证码格式错误" },
        ],
      },
    };
  },
  methods: {
    async onSubmit() {
      // 1.获取表单数据
      // 2.表单校验
      // 3.提交表单请求登录
      // 根据请求相应结果处理后续操作

      let user = this.user;
      // 加载提示
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true, //	是否禁止背景点击
        duration: 0, //展示时长(ms)，值为 0 时，toast 不会消失
      });

      // 发送请求
      try {
        let result = await login(user);
        this.$store.commit("USERTOKEN", result.data);
        this.$toast.success("登陆成功");
        this.$router.back();
      } catch (error) {
        if (error) {
          this.$toast.fail("手机号或验证码错误");
        } else {
          this.$toast.fail("登录失败，请稍后重试");
        }
      }
    },
    validator(val) {
      if (val.length != 11) {
        return false;
      } else {
        return true;
      }
    },
    async onSendSms() {
      // 1. 校验手机号
      /*
        通过 ref 可以获取到 Form 实例并调用实例方法，
        validate	验证表单，支持传入 name 来验证单个或部分表单项
      */
      try {
        // 验证通过
        await this.$refs.loginForm.validate("mobile");
        console.log("验证通过");
      } catch (error) {
        // 验证失败
        return console.log("验证失败", error);
      }

      // 2. 验证通过，显示倒计时
      this.isCountDownShow = true;

      // 3. 请求发送验证码
      try {
        await sendSms(this.user.mobile);
        this.$toast("发送成功");
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false;
        if (err.response.status === 429) {
          this.$toast("发送太频繁了，请稍后重试");
        } else {
          this.$toast("发送失败，请稍后重试");
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.login-container {
  .iconfont {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 160px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
