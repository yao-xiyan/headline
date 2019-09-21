<template>
  <el-card>
    <!-- 面包屑组件 -->
    <!-- slot => header 是给el-card的插槽 -->
    <bread-crumb slot="header">
      <!-- solt => 给面包屑的插槽 -->
      <template slot="title">评论列表</template>
    </bread-crumb>
    <!-- data 属性是一个数组 -->
    <el-table :data="list">
      <!-- el-table-column 列 属性 prop => 键名 => 字段名 label => 表头 -->
      <el-table-column width="600px" label="标题" prop="title"></el-table-column>
      <el-table-column
        :formatter="stateFormatter"
        align="center"
        lable="评论状态"
        prop="comment_status"
      ></el-table-column>
      <el-table-column align="center" label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column align="center" label="粉丝评论数" prop="fans_comment_count"></el-table-column>
      <el-table-column align="center" label="操作">
        <!-- 作用域插槽 => 接收 el-table-column row/column/index/  -->
        <template slot-scope="obj">
          <!-- 自定义内容 获取其他列的内容 -->
          <el-button size="small" type="text">修改</el-button>
          <!-- 当成功的时候为 -->
          <el-button
            :style="{color: obj.row.comment_status ? '#F56C6C' : '#409EFF'}"
            @click="btSwitch(obj.row)"
            size="small"
            type="text"
          >{{ obj.row.comment_status ? '关闭评论' : '打开评论' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style="margin-top: 25px;">
      <el-pagination @current-change="getChange" :current-page="page.currentPage" :page-size="page.pageSize" :total="page.total" background layout="prev, pager, next"></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        total: 0, // 总条数
        currentPage: 1, // 默认第一页
        pageSize: 10 // 每页多少条
      }
    }
  },
  methods: {
    // 获取当前页
    getChange (newMsg) {
      this.page.currentPage = newMsg // 更新最新页码给 currernpage
      this.getComment()
    },
    getComment () {
      //   获取评论数
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize } // params 是路径参数也就是query
      }).then(result => {
        this.list = result.data.results // 把返回的数据返回给list
        this.page.total = result.data.total_count // 把总条数给 分页组件的总条数
      })
    },
    // 返回的数据给list
    stateFormatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    // 打开或关闭 row 代表当前行的所有数据 切换
    // 需要两个参数  （id，）
    btSwitch (row) {
      // 使用 弹窗 组件
      let msg = row.comment_status ? '关闭评论' : '打开评论'
      this.$confirm(`您确定要${msg}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确定调用接口
        this.$axios({
          url: 'comments/status',
          method: 'put',
          params: { article_id: row.id.toString() }, // 路径参数 //加.toString 装换成字符串
          data: { allow_comment: !row.comment_status }
        }).then(() => {
          this.getComment() // 重新拉取数据
        })
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
