<template>
  <div lass="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from "@/api/search";

export default {
  name: "SearchResult",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false,
    };
  },
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  components: {},
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求

      // 1. 请求获取数据
      // 2. 将数据添加到数组列表中
      // 3. 将本次加载中的 loading 关闭
      // 4. 判断是否还有数据
      //   如果有，则更新获取下一个数据的页码
      //  如果没有，则将加载状态 finished 设置为结束
      try {
        let result = await getSearchResult({
          page: this.page, // 页码
          per_page: this.perPage, // 每页大小
          q: this.searchText, // 查询关键词
        });
        // 填入数据
        let { results } = result.data;
        this.list.push(...results);
        
        // 模拟随机失败的情况
        if (Math.random() > 0.9) {
          JSON.parse("fsfsf");
        }

        //关闭转圈
        this.loading = false;
        // 判断是否还有数据
        if (results.length) {
          this.page++;
        } else {
          this.finished = true;
        }
      } catch (error) {
        // 加载失败了 loading 也要关闭
        this.loading = false;
        this.error = true
      }
    },
  },
};
</script>

<style scoped>
</style>
