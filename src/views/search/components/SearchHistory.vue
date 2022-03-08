<template>
  <div class="search-history">
    <!-- 头部 -->
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('update-histories',[])">全部删除</span> &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>

      <!-- slot="default" 不写也是一样的 默认插槽 -->
      <van-icon v-else name="delete" @click="isDeleteShow = true"></van-icon>
    </van-cell>
    <!-- 历史记录-->
    <van-cell
      :title="history"
      v-for="(history, index) in searchHistories"
      :key="index"
      @click="onSearchItemClick(history, index)"
    >
      <van-icon name="close" v-show="isDeleteShow"></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  data() {
    return {
      isDeleteShow: false, // 控制删除显示状态
    };
  },
  props: {
    // Prop 数据
    //  Prop 是受父组件数据影响的
    //    如果是普通数据（数字、字符串、布尔值）绝对不能修改
    //    即便改了也不会传导给父组件
    //
    //    如果是引用类型数据（数组、对象）
    //        可以修改，例如 [].push(xxx)，对象.xxx = xxx
    //        不能重新赋值, xxx = []
    searchHistories: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onSearchItemClick(history, index) {
      if (this.isDeleteShow) {
        //删除状态
        this.searchHistories.splice(index, 1);
        setItem("TOUTIAO_SEARCH_HISTORIES", this.searchHistories);
      } else {
        //搜索 对应
        this.$emit("search", history);
      }
    },
  },
};
</script>

<style scoped>
</style>
