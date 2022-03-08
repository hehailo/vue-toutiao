<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isreFreshLoading"
      :success-text="refreshSuccessText"
      success-duration="1000"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
        <ArticleItem
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import ArticleItem from "@/components/ArticleItem";
export default {
  name: "ArticleList",
  data() {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null, // 请求获取下一页数据的时间戳
      error: false, // 控制列表加载失败的提示状态
      isreFreshLoading: false, // 控制下拉刷新的 loading 状态
      refreshSuccessText: "刷新成功", // 下拉刷新成功提示文本
    };
  },
  components: { ArticleItem },
  props: {
    channel: {
      type: Object,
      reqiuired: true,
    },
  },
  methods: {
    // 初始化或滚动到底部的时候会触发调用 onLoad
    async onLoad() {
      // 1. 请求获取数据
      try {
        let { data } = await getArticles({
          channel_id: this.channel.id, // 频道ID
          // 你可以把 timestamp 理解为页码
          // 如果请求第1页数据：当前最新时间戳 Date.now
          // 如果请求之后的数据，使用本次接口返回的数据中的 pre_timestamp
          timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1, // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        });

        let { results, pre_timestamp } = data;

        // 模拟随机失败的情况
        if (Math.random() > 0.8) {
          JSON.parse("fsfsf");
        }

        // 2. 把请求结果数据放到 list 数组中
        this.list = this.list.concat(results);

        // 3. 本次数据加载结束之后要把加载状态设置为结束
        this.loading = false;

        // 4. 判断数据是否全部加载完成
        console.log(results.length);
        if (results.length && this.list.length <= 40) {
          // 有数据
          this.timestamp = pre_timestamp;
        } else {
          // 加载完成
          this.finished = true;
        }
      } catch (error) {
        // 展示错误提示状态
        // 请求失败了，loading 也需要关闭
        this.error = true;
        this.loading = false;
      }
    },
    async onRefresh() {
      try {
        // 1. 请求获取数据
        let { data } = await getArticles({
          channel_id: this.channel.id, // 频道ID
          timestamp: Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1, // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        });
        let { results } = data;

        // 模拟随机失败的情况
        if (Math.random() > 0.8) {
          JSON.parse("fsfsf");
        }
        console.log(data.results);

        // 2. 将数据追加到列表的顶部
        this.list.unshift(...results);

        // 3. 关闭下拉刷新的 loading 状态
        this.isreFreshLoading = false;
        // 更新下拉刷新成功提示的文本
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`;
      } catch (error) {
        // 关闭下拉刷新的 loading 状态
        this.isreFreshLoading = false;
        this.refreshSuccessText = "刷新失败";
      }
    },
  },
};
</script>

<style scoped lang="less">
.article-list {
  height: 83vh;
  overflow-y: auto;
}
</style>
