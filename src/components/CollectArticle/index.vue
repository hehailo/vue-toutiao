<template>
  <van-button
    :icon="value ? 'star' : 'star-o'"
    :class="{
      collected: value,
    }"
    :loading="loading"
    @click="onCollect"
  />
</template>

<script>
import { addCollect, deleteCollect } from "@/api/article";
export default {
  name: "CollectArticle",
  data() {
    return {
      loading: false,
    };
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  methods: {
    async onCollect() {
      this.loading = true;
      //发送请求
      try {
        if (this.value) {
          //取消收藏
          let result = await deleteCollect(this.articleId);
        } else {
          //添加收藏
          let result = await addCollect(this.articleId);
        }
        this.$emit("input",!this.value);
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (error) {
        this.$toast.fail("操作失败，请重试！");
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped lang="less">
.collected {
  color: #ffa500;
}
</style>
