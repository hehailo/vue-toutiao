<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div
        class="article-detail markdown-body"
        ref="articleDetail"
        v-else-if="article.title"
      >
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>

          <!-- 关注和已关注按钮 -->
          <!-- <van-button
            v-if="article.is_followed"
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
          > -->
          <FollowUser
            class="follow-btn"
            :isFollowed="article.is_followed"
            :userId="article.aut_id"
            :test="aas"
            @update-is_followed="article.is_followed = $event"
          ></FollowUser>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content" v-html="article.content"></div>
        <van-divider>正文结束</van-divider>

        <!-- 评论区域 -->
        <CommentList
          :source="article.art_id"
          @onload-success="totalCommentCount = $event.total_count"
        ></CommentList>

        <!-- 底部区域 -->
        <div class="article-bottom">
          <!-- 发布评论 -->
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isReplyShow = true"
            >写评论</van-button
          >

          <!-- 评论总数 -->
          <van-icon name="comment-o" :badge="totalCommentCount" color="#777" />
          <!-- <van-icon color="#777" name="star-o" /> -->

          <!-- 收藏 -->
          <CollectArticle
            v-model="article.is_collected"
            :article-id="article.art_id"
          ></CollectArticle>

          <!-- 点赞 -->
          <LikeArticle
            v-model="article.attitude"
            :article-id="article.art_id"
          ></LikeArticle>
          <!-- <van-icon color="#777" name="good-job-o" /> -->

          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->

        <!-- 评论弹出层/发布评论 -->
        <van-popup
          v-model="isReplyShow"
          position="bottom"
          >
          <CommentPost></CommentPost>
          </van-popup
        >
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
import { getArticleById } from "@/api/article";
import { ImagePreview } from "vant";
import "./github-markdown.css";
import FollowUser from "@/components/FollowUser";
import CollectArticle from "@/components/CollectArticle";
import LikeArticle from "@/components/LikeArticle";
import CommentList from "./components/CommentList.vue";
import CommentPost from './components/CommentPost.vue'
export default {
  name: "Article",
  components: { FollowUser, CollectArticle, LikeArticle, CommentList,CommentPost },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      article: {}, // 文章详情
      loading: true, // 加载中的 loading 状态 默认开启
      errStatus: 0, // 失败的状态码 404和其他
      followLoading: false,
      totalCommentCount: 0, //默认评论数量
      isPostShow: false, // 控制发布评论的显示状态
      commentList: [], // 评论列表
      isReplyShow: false, //发布评论弹出层
      currentComment: {}, // 当前点击回复的评论项
      aas: {
        name: "tom",
      },
    };
  },
  created() {
    this.loadArticle();
  },
  methods: {
    async loadArticle() {
      try {
        let result = await getArticleById(this.articleId);
        // 模拟随机失败的情况
        // if (Math.random() > 0.1) {
        //   JSON.parse("fsfsf");
        // }
        // 请求成功
        this.article = result.data;

        // 初始化图片点击预览
        // 数据驱动视图这件事儿不是立即的
        setTimeout(() => {
          this.previewImage();
        }, 0);
      } catch (error) {
        //两种提示
        //404
        console.log(error.response);
        if (error.response && error.response.status === 404) {
          console.log(error.response);
          this.errStatus = 404;
        }
        console.log("获取数据失败！", error);
      }
      this.loading = false; // 关闭loading
    },
    previewImage() {
      let articlrContent = this.$refs.articleDetail;
      console.log(articlrContent);
      let imgs = articlrContent.querySelectorAll("img");
      const images = [];
      console.log(imgs);
      let d = 34;
      imgs.forEach((img, index) => {
        img.src = `http://toutiao.itheima.net/resources/images/${d++}.jpg`;
        images.push(img.src);
        img.onclick = () => {
          console.log("223");
          //函数体
          ImagePreview({
            images,
            startPosition: index,
            onClose() {
              console.log("关闭");
            },
          });
        };
      });
    },

    // async onFollow() {
    //   this.followLoading = true;
    //   try {
    //     if (this.article.is_followed) {
    //       //已关注 取消关注
    //       let result = await deleteFollow(this.article.aut_id);
    //       console.log(result);
    //     } else {
    //       //未关注 关注
    //       let result = await addFollow(this.article.aut_id);
    //       console.log(result);
    //     }
    //     this.article.is_followed = !this.article.is_followed;
    //   } catch (error) {
    //     let message = "操作失败！";

    //     if (error.response && error.response.status === 400) {
    //       message = "自己不能关注自己";
    //     }
    //     this.$toast(message);
    //   }
    //   this.followLoading = false;
    // },
  },
};
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
