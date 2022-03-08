<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <!-- 
        :border="false" 去掉cell单元格下边距
     -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        size="mini"
        round
        plain
        type="danger"
        class="edit-btn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <!-- 
            icon="clear" 我的频道上方的x
      -->
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        @click="onMyChannelClick(channel, index)"
      >
        <!-- 我的频道上方的x -->
        <!-- 固定项目不展示 x -->
        <van-icon
          v-show="isEdit && !fiexdChannels.includes(channel.id)"
          slot="icon"
          name="clear"
        ></van-icon>
        <span class="text" slot="text" :class="{ active: index == active }">
          {{ channel.name }}</span
        >
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        class="grid-item"
        icon="plus"
        v-for="channel in recommendChannels"
        :key="channel.id"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel,
} from "@/api/channel";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage";
export default {
  name: "ChannelEdit",
  data() {
    return {
      allChannels: [], // 所有频道
      isEdit: false, // 控制编辑状态的显示
      fiexdChannels: [0], // 固定频道，不允许删除
    };
  },
  props: {
    myChannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  created() {
    this.loadAllChannels();
  },
  methods: { 
    async loadAllChannels() {
      try {
        let { data } = await getAllChannels();
        this.allChannels = data.channels;
      } catch (error) {
        this.$toast("数据获取失败");
      }
    },
    // 添加频道
    async onAddChannel(channel) {
      this.myChannels.push(channel);
      // 数据持久化处理
      if (this.loginToken) {
        try {
          // 已登录，把数据请求接口放到线上
          await addUserChannel({
            id: channel.id,
            seq: this.myChannels.length,
          });
        } catch (error) {
          this.$toast("保存失败，请稍后重试");
        }
      } else {
        // 未登录，把数据存储到本地
        setItem("TOUTIAO_CHANNELS", this.myChannels);
      }
    },
    async deleteChannel(channel) {
      // 删除频道

      // 已登录，把数据请求接口放到线上
      try {
        if (this.loginToken) {
          await deleteUserChannel(channel.id);
        } else {
          // 未登录，把数据存储到本地
          setItem("TOUTIAO_CHANNELS", this.myChannels);
        }
      } catch (error) {
        this.$toast("保存失败，请稍后重试");
      }
    },
    onMyChannelClick(channel, index) {
      if (this.isEdit) {
        // 固定项不可删除
        if (this.fiexdChannels.includes(channel.id)) {
          return;
        }
        // 删除
        this.myChannels.splice(index, 1);

        // 如果删除的是前面的频道 因为顺序发生变化 使得当前选中项改变
        if (index <= this.active) {
          this.$emit("update-active", this.active - 1, true);
        }

        // 4. 处理持久化
        this.deleteChannel(channel);
      } else {
        this.$emit("update-active", index, false);
      }
    },
  },
  computed: {
    // 获取用户登录状态
    ...mapState({
      loginToken: (state) => state.user.loginToken,
    }),
    recommendChannels() {
      console.log(this.allChannels);
      let channels = this.allChannels.filter((channel) => {
        //函数体
        return !this.myChannels.find((mychannel) => {
          //函数体
          return mychannel.id == channel.id;
        });
      });
      return channels;
    },
  },
};
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;

  .title-text {
    font-size: 32px;
    color: #333333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      // 文字不能允许折行
      white-space: nowrap;
      background-color: #f4f5f6;
      //去除文字的上边距
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      // 添加v-icon后多了一层容器 需要相对于更上一层容器定位
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  // 我的频道 宫格
  /deep/ .my-grid {
    .grid-item {
      // 我的频道上面的小x
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  // 推荐频道 宫格
  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        //   + 和 文字是flex布局 改变主轴方向
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>