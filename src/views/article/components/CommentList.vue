<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="已显示全部评论"
    :error="error"
    error-text="加载失败，请点击重试"
    @load="onLoad"
  >
    <!-- 评论项 -->
    <CommentItem
      v-for="(item, index) in list"
      :key="index"
      :comment="item"
    ></CommentItem>
  </van-list>
</template>

<script>
import { getComments } from "@/api/comment";
import CommentItem from "./CommentItem.vue";
export default {
  name: "CommentList",
  components: { CommentItem },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false,
    };
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
  },
  created() {
    this.onLoad(); //初始化加载
  },
  methods: {
    async onLoad() {
      try {
        // 获取文章的评论和获取评论的回复是同一个接口
        // 唯一的区别是接口参数不一样
        //    type
        //      a 文章的评论
        //      c 评论的回复
        //    source
        //      文章的评论，则传递文章的 ID
        //      评论的回复，则传递评论的 ID
        // 1. 请求获取数据
        const result = await getComments({
          type: "a", //  评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source.toString(), // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit, // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        });
        // 2. 将数据添加到列表中
        let { results } = result.data;
        console.log(result.data);
        this.list.push(...results);

        // 把文章评论的总数量传给父组件
        this.$emit("onload-success", result.data);

        //关闭转圈
        this.loading = false;
        //判断是否还有数据
        if (results.legth) {
          // 有就更新获取下一页的数据页码
          this.offset = result.data.last_id;
        } else {
          // 没有就将 finished 设置结束
          this.finished = true;
        }
      } catch (error) {
        this.error = true;
        // 2. 将数据添加到列表中
        //关闭转圈
        this.loading = false;
      }
    },
  },
};
</script>

<style>
</style>