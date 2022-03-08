<template>
  <div class="search-history">
    <!-- 头部 -->
    <van-cell title="搜索历史">
      <span>全部删除</span>
      <span>完成</span>
      <!-- slot="default" 不写也是一样的 默认插槽 -->
      <van-icon name="delete" slot="default"></van-icon>
    </van-cell>
    <!-- 历史记录-->
    <van-cell title="hello">
      <van-icon name="close"></van-icon>
    </van-cell>
    <van-cell title="hello">
      <van-icon name="close"></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  data() {
    return {};
  },
  watch: {},
  mounted() {},

  filters: {},
  components: {},
};
</script>

<style scoped>
</style>
