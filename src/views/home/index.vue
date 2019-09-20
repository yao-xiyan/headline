<template>
  <!-- 先定义一个大容器 -->
  <el-container>
    <!-- 放至左侧内容 -->
    <el-aside style="width:200px;overflow:hidden;background-color:#323745">
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 右侧大容器 -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <el-main style="padding:0">
        <!-- 二级路由容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {

}
</script>

<style>
</style>
