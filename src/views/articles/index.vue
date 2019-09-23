<template>
  <el-card>
    <!-- 面包屑 -->
    <bread-crumb slot='header'>
      <template slot='title'>内容列表</template>
    </bread-crumb>
    <el-form style="margin-left:50px;">
        <!-- 文章状态 -->
        <el-form-item label="文章状态：">
          <el-radio-group>
            <el-radio>全部</el-radio>
            <el-radio>草稿</el-radio>
            <el-radio>待审核</el-radio>
            <el-radio>审核通过</el-radio>
            <el-radio>审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 频道列表 -->
        <el-form-item label="频道列表：">
          <el-select>

          </el-select>
        </el-form-item>
        <!-- 时间选择 -->
        <el-form-item label="时间选择：">
          <!-- range-separator="至" -->
          <el-date-picker type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
    </el-form>
    <!-- 主体内容 -->
    <div class="total">共找到55091条符合条件的内容</div>
    <!-- 布局 -->
    <div class="article-item" v-for="(item,index) in list" :key="index">
      <!-- 左侧 -->
      <div class="left">
        <img :src="item.cover.images.length ? item.cover.images[0] : ''" alt="">
        <div class="info">
          <!-- 用插值表达式换成动态值 -->
          <span class="title">{{ item.title }}</span>
          <el-tag class="status">已发表</el-tag>
          <span class="date">{{ item.pubdate }}</span>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="right">
        <span><i class="el-icon-edit"></i>修改</span>
        <span><i class="el-icon-delete"></i>删除</span>
      </div>
    </div>
  </el-card>
  <!-- 表单 -->
</template>

<script>
export default {
  data () {
    return {
      // list: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      list: [],
      // 默认图片转码 转为Uid的格式 将图片转为位
      defaultImg: require('../../assets/img/dafault.gif') // 默认图片
    }
  },
  methods: {
    // 获取文章列表
    getArticles () {
      this.$axios({
        url: '/articles'
      }).then(resulet => {
        this.list = resulet.data.results // 将接口的
      })
    }
  },

  // 钩子函数
  created () {
    this.getArticles() // 获取调用
  }
}
</script>

<style lang="less" scoped>
.total {
    border-bottom: 1px dashed #ccc;
    height:50px;
    line-height: 50px;
}
.article-item {
    display: flex;
    justify-content: space-between;
    padding: 20px 10px;
    border-bottom: 1px solid  #f2f3f5;
    .left {
        display: flex;
        img {
            width: 180px;
            height:100px;
            border-radius: 4px;
        }
        .info {
            height: 100px;
            display: flex;
            flex-direction: column;
            margin-left:10px;
            justify-content: space-around;
            .date {
                color:#999;
                font-size:12px;
            }
            .title {
                font-size:14px;
            }
            .status {
                width: 60px;
                text-align: center
            }
        }
    }
    .right {
        font-size: 12px;
        span {
            margin-right:8px;
        }
    }
}
</style>
