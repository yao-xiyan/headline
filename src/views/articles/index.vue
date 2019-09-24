<template>
  <el-card v-loading="loading">
    <!-- 面包屑 -->
    <bread-crumb slot='header'>
      <template slot='title'>内容列表</template>
    </bread-crumb>
    <el-form style="margin-left:50px;">
        <!-- 文章状态 -->
        <el-form-item label="文章状态：">
          <el-radio-group v-model="formData.status">
            <el-radio :label="-1">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 频道列表 -->
        <el-form-item label="频道列表：">
          <el-select v-model="formData.channel_id">
            <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name">

            </el-option>
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
          <!-- 使用过滤器写状态值 -->
          <el-tag :type="item.status | statusType" class="status">{{ item.status | statusText}}</el-tag>
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
      // 不做校验
      formData: {
        status: -1, // 文章状态
        channel_id: '' // 频道列表id
      },
      channels: [], // 定义一个频道对象
      loading: false,
      // 默认图片转码 转为Uid的格式 将图片转为位
      defaultImg: require('../../assets/img/dafault.gif') // 默认图片
    }
  },
  methods: {
    // 获取频道列表
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    // 获取文章列表
    getArticles () {
      this.loading = true
      this.$axios({
        url: '/articles'
      }).then(resulet => {
        this.list = resulet.data.results // 将接口的
        this.loading = false
      })
    }
  },
  filters: {
    // 定义一个过滤器处理显示文本
    // 过滤器得到第一个参数 永远是前面传过来的值
    // 文章状态  0 -草稿  1-待审核 2-审核通过 3-审核失败 4-已删除 status 状态
    statusText (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    statusType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'success'
        case 2:
          return ''
        case 3:
          return 'danger'
        case 4:
          return 'info'
      }
    }
  },
  // 钩子函数
  created () {
    this.getArticles() // 获取调用
    this.getChannels() //
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
