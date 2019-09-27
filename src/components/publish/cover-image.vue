<template>
  <div class="cover-image">
      <!-- v-for 生成 封面图片 -->
      <div class="cover-item" v-for="(item,index) in images" :key="index">
          <img :src="item ? item : defaultImg" alt="">
      </div>
  </div>
</template>

<script>
export default {
  // 接收父组件传过来的图片数据
  props: ['images'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png')
    }
  }
}
</script>

<style lang="less" scoped>
.cover-image {
    display: flex;
    margin: 10px 0;
    margin-left: 100px;
    .cover-item {
        border: 1px solid #f2f3f5;
        padding: 10px;
        width: 200px;
        height: 200px;
        img {
            width: 100%;
            height: 100%;
            background-color: cover;
        }
    }
}
</style>
