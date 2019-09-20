<template>
  <el-row type="flex" class="layout-header" align="middle" justify="space-between">
    <!-- 左侧 -->
    <el-col :span="6">
      <i class="el-icon-s-unfold"></i>
      <span class="title">海贼王终极剧场版</span>
    </el-col>
    <!-- 右侧 -->
    <el-col :span="4">
      <img class='head' :src="userInfo.photo ? userInfo.photo: '../../assets/img/avatar.jpg'" alt='' />
      <!-- 下拉组件 el-dropdown -->
      <el-dropdown trigger="click" @command="publicClick">
        <!-- 匿名插槽  -->
        <span class="el-dropdown-link">
        Super_夕颜
          {{ userInfo.name }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <!-- 具名插槽 dropdown -->
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="account">个人信息</el-dropdown-item>
          <el-dropdown-item command="gitUrl">git地址</el-dropdown-item>
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      // 只有本地地址使用的时候才需要转base64位的字符串
      defaultImg: require('../../assets/img/avatar.jpg') // 将路径转换成base64位的字符串
    }
  },
  methods: {
    // 获取用户个人资料
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.userInfo = result.data
      })
    },
    publicClick (key) {
      // key === 'account' ?
      if (key === 'account') {
        // 跳转到 账户信息
        this.$router.push('/home/account')
      } else if (key === 'git') {
        // 去到git项目
        window.location.href = 'https://github.com/yao-xiyan/headline.git'
      } else {
        // 退出
        window.localStorage.clear() // 只能清除本项目的所有前端项目
        this.$router.push('/login') // 跳转到登录页
      }
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang='less'>
.layout-header {
  height: 50px;
  .el-icon-unfold {
    font-size: 24px;
  }
  .title {
    vertical-align: top;
    margin-left: 6px;
  }
  .head {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
  }
}
</style>
