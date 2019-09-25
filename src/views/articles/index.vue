<template>
  <el-card v-loading="loading">
    <!-- 面包屑 -->
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <el-form style="margin-left:50px;">
      <!-- 文章状态 -->
      <el-form-item label="文章状态：">
        <el-radio-group @change="changeCondition" v-model="formData.status">
          <el-radio :label="-1">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 频道列表 -->
      <el-form-item label="频道列表：">
        <el-select @change="changeCondition" v-model="formData.channel_id">
          <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <!-- 时间选择 -->
      <el-form-item label="时间选择：">
        <!-- range-separator="至" -->
        <!-- value-format 绑定的值 -->
        <!-- element-ui 日期组件 -->
        <el-date-picker
          @change="changeCondition"
          v-model="formData.date"
          type="daterange"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <!-- 主体内容 -->
    <div class="total">共找到{{ page.total }}条符合条件的内容</div>
    <div class="article-item" v-for="(item,index) in list" :key="index">
      <!-- 左侧 -->
      <div class="left">
        <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt />
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
        <span>
          <i class="el-icon-edit"></i>修改
        </span>
        <span @click="deleteArticles(item.id)">
          <i class="el-icon-delete"></i>删除
        </span>
      </div>
    </div>
    <!-- 分页组件 -->
    <el-row type="flex" justify="center" style="margin: 15px">
      <el-pagination
        background
        @current-change="changePage"
        :current-page= "page.currentPage"
        :page-size="page.pageSize"
        :pager-count="11"
        layout="prev, pager, next"
        :total="page.total">
      </el-pagination>
    </el-row>
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
        channel_id: null, // 频道列表id 空字符串有值，但是是空字符串  null无值
        date: []
      },
      channels: [], // 定义一个频道数组
      loading: false,
      // 默认图片转码 转为Uid的格式 将图片转为base64位
      defaultImg: require('../../assets/img/dafault.gif'), // 默认图片
      page: {
        total: 0, // 总数
        currentPage: 1, // 当前页码
        pageSize: 10 // 每页条数
      }
    }
  },
  methods: {
    // 切换页码
    changePage (newPage) {
      this.page.currentPage = newPage // 赋值给最新页码
      this.queryArticles()
    },
    // 删除文章
    deleteArticles (id) {
      this.$confirm('您确定要删除文章吗？').then(() => {
        this.$axios({
          url: `/articles/${id.toString()}`,
          method: 'delete'
        }).then(() => {
          this.getArticles()
        })
      })
    },
    // 状态变化事件
    changeCondition () {
      // 因为值改变时 formdata 已经是最新的值 所以直接可以用formdata的值请求
      // alert(this.formData.date)
      // let beginDate = this.formData.date.length ? this.formData.date[0] : null // 开始时间
      // let overDate = this.formData.date.length > 1 ? this.fomData.date[1] : null // 结束时间
      this.page.currentPage = 1
      this.queryArticles()
      // let status = this.formData.status
      // if (this.formData.status === 5) {
      //   status = null
      // } else {
      //   status = this.formData.status
      // }
    },
    // 查询文章
    queryArticles () {
      let params = {
        // 状态 如果为-1时
        // 组装请求
        status: this.formData.status === -1 ? null : this.formData.status,
        channel_id: this.formData.channel_id, // 频道id
        begin_pubdate: this.formData.date.length ? this.formData.date[0] : null,
        end_pubdate:
        this.formData.date.length > 1 ? this.formData.date[1] : null, // 结束时间
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      //
      this.getArticles(params)
    },
    // 获取频道列表
    getChannels () {
      this.$axios({
        url: '/channels' // 频道
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    // 获取文章列表
    getArticles (params) {
      this.loading = true
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        this.list = result.data.results // 将接口的
        this.page.total = result.data.total_count // 获取总页数
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
    this.getChannels() // 获取列表
    this.getArticles() // 获取文章
  }
}
</script>

<style lang="less" scoped>
.total {
  border-bottom: 1px dashed #ccc;
  height: 50px;
  line-height: 50px;
}
.article-item {
  display: flex;
  justify-content: space-between;
  padding: 20px 10px;
  border-bottom: 1px solid #f2f3f5;
  .left {
    display: flex;
    img {
      width: 180px;
      height: 100px;
      border-radius: 4px;
    }
    .info {
      height: 100px;
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      justify-content: space-around;
      .date {
        color: #999;
        font-size: 12px;
      }
      .title {
        font-size: 14px;
      }
      .status {
        width: 60px;
        text-align: center;
      }
    }
  }
  .right {
    font-size: 12px;
    span {
      margin-right: 8px;
    }
  }
}
</style>
