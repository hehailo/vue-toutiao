<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法【键盘】中显示搜索按钮。 -->
    <form class="search-form" action="/">
      <!-- 
        search 事件在点击键盘上的搜索/回车按钮后触发
        background 属性可以设置搜索框外部的背景色
        show-action 是否在搜索框右侧显示取消按钮
        focus	输入框获得焦点时触发
     -->
      <van-search
        v-model="searchText"
        show-action
        shape="round"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <SearchResult v-if="isResultShow" :searchText="searchText"></SearchResult>

    <!-- 联想记忆 -->
    <SearchSuggestion
      @search="onSearch"
      v-else-if="searchText"
      :searchText="searchText"
    ></SearchSuggestion>

    <!-- 历史记录 -->
    <SearchHistory
      v-else
      :searchHistories="searchHistories"
      @search="onSearch"
      @update-histories="searchHistories = $event"
    ></SearchHistory>
  </div>
</template>

<script>
import SearchHistory from "./components/SearchHistory.vue";
import SearchResult from "./components/SearchResult.vue";
import SearchSuggestion from "./components/SearchSuggestion.vue";
import { setItem, getItem } from "@/utils/storage";
export default {
  name: "Search",
  data() {
    return {
      searchText: "",
      isResultShow: false, // 控制搜索结果的展示
      searchHistories: getItem("TOUTIAO_SEARCH_HISTORIES") || [], // 搜索的历史记录数据
    };
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion,
  },
  watch: {
    searchHistories(val) {
      setItem("TOUTIAO_SEARCH_HISTORIES", val);
    },
  },
  methods: {
    onSearch(val) {
      // 从搜索联想跳转过来 输入框回显
      this.searchText = val;
      console.log("search", val);
      let index = this.searchHistories.indexOf(val);
      if (index != -1) {
        // 存入搜索历史的记录不可以重复，冲去就去掉重新把它加载最前面
        this.searchHistories.splice(index, 1);
      }
      this.searchHistories.unshift(val);
      this.isResultShow = true;
    },
    onCancel() {
      this.$router.back();
    },
  },
};
</script>

<style scoped lang="less">
.search-container {
  padding-top: 108px;
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    .van-search__action {
      //搜索框文字颜色
      color: #fff;
    }
  }
}
</style>