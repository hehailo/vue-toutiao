<template>
  <div class="search-suggestion">
    <!-- 
          通过 icon 属性在标题左侧展示图标。
       -->
    <van-cell
      icon="search"
      :title="suggestion"
      v-for="(suggestion, index) in suggestions"
      :key="index"
    ></van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/search";
export default {
  name: "SearchSuggestion",
  data() {
    return {
      suggestions: [],
    };
  },
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  watch: {
    searchText: {
      immediate: true, //该回调将会在侦听开始之后被立即调用
      handler(newVal, oldVal) {
        this.loadSearchSuggestions(newVal);
      },
    },
  },
  methods: {
    async loadSearchSuggestions(value) {
      try {
        let { data } = await getSearchSuggestions(value);
        this.suggestions = data.options;
      } catch (error) {
        this.$toast("数据获取失败，请稍后重试");
      }
    },
  },
};
</script>

<style scoped>
</style>
