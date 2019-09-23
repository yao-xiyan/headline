<template>
  <el-card v-loading="loading">
    <!-- header具名是给卡片的 -->
    <bread-crumb slot="header">
      <!-- title具名 是面包屑组件的具名 -->
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!-- http-request 自定义上传 -->
    <el-upload :show-file-list="false" :http-request="uploadImg" action="" class="a-upload">
      <el-button type="primary">上传图片</el-button>
    </el-upload>
    <!-- el-tabs => el-tab-pane -->
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all">
        <!-- 全部素材 -->
        <div class="img-list">
          <el-card class="img-item" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <div class="operate">
              <i :style="{color: item.is_collected ? 'red' : '#000'}" class="el-icon-star-on"></i>
              <i @click="deleteImg(id)" class="el-icon-delete-solid"></i>
            </div>
          </el-card>
        </div>
        <el-row type="flex" justify="center">
          <el-pagination
            @current-change="changePage"
            background
            layout="prev, pager, next"
            :total="page.total"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
        <div class="img-list">
          <el-card class="img-item" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
        <el-row type="flex" justify="center">
          <el-pagination
            @current-change="changePage"
            background
            layout="prev, pager, next"
            :total="page.total"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      activeName: 'all',
      list: [], // 定义一个list接收数据
      // 分页信息
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 12
      }
    }
  },
  methods: {
    // 删除图片
    deleteImg (id) {
      this.$axios({
        url: `user/images/${id}`,
        method: 'delete'
      }).then(

      )
    },
    // 上传方法
    uploadImg (params) {
      const data = new FormData() // 声明一个新的表单
      data.append('image', params.file)
      // 上传文件
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(() => {
        this.getMaterial()
      })
    },
    // 当页码改变时 回传入一个参数
    changePage (newMsg) {
      this.page.currentPage = newMsg // 将最新页码赋值给currentPage
      this.getMaterial() // 获取最新数据
    },
    // 切换页签的方法
    changeTab () {
      // 首先要把页码归1
      this.page.currentPage = 1
      this.getMaterial()
    },
    // 获取素材列表
    getMaterial () {
      this.loading = true
      // this.activeName === 'collect' 相当于去找收藏的数据
      // 如果不等于collect 相等于去找全部的数据
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count // 赋值总数 每次总条数都会重新赋值
        this.loading = false
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.a-upload {
  position: absolute;
  right: 20px;
  margin-top: -10px;
  z-index: 1
}
.img-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .img-item {
    width: 180px;
    height: 180px;
    border-radius: 6px;
    margin: 30px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .operate {
      background-color: #f4f5f6;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-size: cover;
      i {
        font-size: 18px;
      }
    }
  }
}
</style>
