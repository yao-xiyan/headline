<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <el-form>
      <el-form-item>
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

        </el-form-item>
        <el-form-item label="时间选择："></el-form-item>
      </el-form-item>
    </el-form>
  </el-card>
  <!-- 表单 -->
</template>

<script>
export default {}
</script>

<style>
</style>
