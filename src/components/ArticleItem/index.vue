<template>
  <!-- 

    default	自定义右侧 value 的内容
    title	自定义左侧 title 的内容
    label	自定义标题下方 label 的内容
 -->
  <van-cell class="article-item">
    <!-- 左侧 title -->
    <!-- 
          van-multi-ellipsis--l2 vant内置样式 文本最多显示两行
       -->
    <div slot="title" class="title van-multi-ellipsis--l2">
      {{ article.title }}
    </div>
    <!--  下方 label -->
    <div slot="label">
      <!-- 图片区域 显示三张图片 -->
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image class="cover-item-img" fit="cover" :src="img" />
        </div>
      </div>
      <!-- 作者信息区域 -->
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <!-- 右侧 value -->
    <!-- 
        fit="cover" 图片填充 短边全显示
     -->
    <van-image
      v-if="article.cover.type === 1"
      slot="default"
      class="right-cover"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: "ArticleItem",
  data() {
    return {};
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="less">
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }

  //   .van-cell__title {
  //     display: flex;
  //     flex-direction: column;
  //     justify-content: space-between;
  //   }

  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }

  // 控制内部图片的大小
  .right-cover {
    width: 100%;
    height: 146px;
  }

  // 控制作者 发布时间等样式
  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }

  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      //控制图片间距
      &:not(:last-child) {
        padding-right: 4px; //最后一个不加
      }
      //控制图片本身样式
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
