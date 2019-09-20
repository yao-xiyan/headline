<template>
  <div class="layout-aside">
    <div class="title">
      <img src="../../assets/img/logo_admin.png" alt="" />
    </div>
    <!-- 使用NavMenu 导航菜单 -->
    <!-- :router="true" -->
    <el-menu
      router
      style="width:201px"
      background-color="#353b4e"
      text-color="#adafb5"
      active-text-color="#ffd04b"
    >
      <!-- 首页 -->
      <el-menu-item index="/home">
        <!-- 图标 -->
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- 内容管理 二级菜单 el-submenu => el-menu-item-->
      <el-submenu index="/">
        <!-- el-submenu 插槽 title =>  一级显示内容 -->
        <template slot="title">
          <i class="el-icon-chat-line-round"></i>
          <span>内容管理</span>
        </template>
        <!-- 二级内容 -->
        <el-menu-item index="/home/publish">发布文章</el-menu-item>
        <el-menu-item index="/home/articles">内容列表</el-menu-item>
        <el-menu-item index="/home/comment">评论列表</el-menu-item>
        <el-menu-item index="/home/material">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="/fan">
        <!-- title插槽时submenu 中显示的一级内容 -->
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>粉丝管理</span>
        </template>
        <!-- 二级内容 -->
        <el-menu-item index="/home/gradata">图文数据</el-menu-item>
        <el-menu-item index="/home/fanpro">粉丝概况</el-menu-item>
        <el-menu-item index="/home/fanpic">粉丝画像</el-menu-item>
        <el-menu-item index="/home/fanlist">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="/home/account">
        <i class="el-icon-user"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>
      <el-submenu index="/home/admin">
          <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>管理员信息</span>
          </template>
          <el-menu-item index="/home/adminone">一级管理员</el-menu-item>
          <el-menu-item index="/home/adminsec">二级管理员</el-menu-item>
          <el-menu-item index="/home/adminthird">三级管理员</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.layout-aside {
  // 左侧菜单背景色
  background-color: #323745;
  height: 100vh;
  width: 200px;
  .title {
    text-align: center;
    background-color: #2e2f32;
    padding: 15px 0;
    img {
      height: 30px;
    }
  }
}
</style>
