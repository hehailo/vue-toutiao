<template>
  <div class="search-suggestion">
    <!-- 
          通过 icon 属性在标题左侧展示图标。
       -->
    <van-cell
      icon="search"
      v-for="(suggestion, index) in suggestions"
      :key="index"
      @click="$emit('search',suggestion)"
    >
      <span slot="title" v-html="highlightKeyWord(suggestion)"></span>
      <span class="active"> </span>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/search";
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  data() {
    return {
      suggestions: [], // 联想建议数据列表
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
      handler: debounce(function (newVal, oldVal) {
        this.loadSearchSuggestions(newVal);
      }, 200),
      // handler(newVal, oldVal) {
      //   this.loadSearchSuggestions(newVal);
      // },
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
    highlightKeyWord(text) {
      if (text) {
        let highlight = `<span class="active">${this.searchText}</span>`;
        let reg = new RegExp(this.searchText, "gi");
        return text.replace(reg, highlight);
      }
    },
  },
};
</script>

<style scoped lang="less">
.search-suggestion {
  /deep/ .active {
 color: #3296fa;
  }
}
</style>
