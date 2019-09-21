<template>
  <el-breadcrumb separator-class="el-icon-right" >
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>
      <!-- 定义一个插槽 -->
      <slot></slot>
  </el-breadcrumb-item>
</el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
