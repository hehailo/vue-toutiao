<template>
  <van-button
    v-if="isFollowed"
    class="follow-btn"
    round
    size="small"
    :loading="followLoading"
    @click="onFollow"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="followLoading"
    @click="onFollow"
    >关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from "@/api/user";
export default {
  name: "FollowUser",
  data() {
    return {
      followLoading: false,
    };
  },

  props: {
    isFollowed: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: [Number, String, Object],
      required: true,
    },
    test: Object,
  },
  methods: {
    async onFollow() {
      this.test.name = "ddddd";
      this.followLoading = true;
      try {
        if (this.isFollowed) {
          //已关注 取消关注
          let result = await deleteFollow(this.userId);
          console.log(result);
        } else {
          //未关注 关注
          let result = await addFollow(this.userId);
          console.log(result);
        }
        // this.article.is_followed = !this.article.is_followed;
        // 向父组件发送消息
        this.$emit("update-is_followed", !this.isFollowed);
      } catch (error) {
        let message = "操作失败！";
        if (error.response && error.response.status === 400) {
          message = "自己不能关注自己";
        }
        this.$toast(message);
      }
      this.followLoading = false;
    },
  },
};
</script>

<style>
</style>