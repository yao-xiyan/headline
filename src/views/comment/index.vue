<template>
  <el-card>
      <!-- 面包屑组件 -->
      <!-- slot => header 是给el-card的插槽 -->
      <bread-crumb slot="header">
        <!-- solt => 给面包屑的插槽 -->
        <template slot='title'>评论列表</template>
      </bread-crumb>
      <el-table :data="list">
          <el-table-column lable="标题" prop="title"></el-table-column>
          <el-table-column :formatter="stateformatter" align="center" lable="评论状态" prop="comment_status"></el-table-column>
          <el-table-column align="center" lable="总评论数" prop="total_comment_count"></el-table-column>
          <el-table-column align="center" lable="粉丝评论数" prop="fans_comment_count"></el-table-column>
          <el-table-column align="center" lable="操作">
              <el-button size="small" type="text">修改</el-button>
              <el-button size="small" type="text">关闭</el-button>
          </el-table-column>
      </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    getComment () {
    //   获取评论数
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' } // params 是路径参数也就是query
      }).then(result => {
        this.list = result.data.results // 把返回的数据返回给list
      })
    },
    // 返回的数据给list
    stateformatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    created () {
      this.getComment()
    }
  }
}
</script>

<style>

</style>
