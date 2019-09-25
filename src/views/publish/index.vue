<template>
    <el-card>
        <!-- 面包屑 -->
        <bread-crumb slot="header">
            <!-- 具名插槽 -->
            <template slot="title">发布文章</template>
        </bread-crumb>
        <!-- el-form 表单组件 -->
        <el-form label-width="100px">
            <!-- 标题 -->
            <el-form-item label="标题">
                <el-input style="width:400px"></el-input>
            </el-form-item>
            <!-- 内容 -->
            <el-form-item label="内容">
                <el-input row="6" placeholder="请输入内容" type="textarea">

                </el-input>
            </el-form-item>
            <!-- 封面 -->
            <el-form-item label="封面">
                <el-radio-group>
                    <el-radio>单图</el-radio>
                    <el-radio>三图</el-radio>
                    <el-radio>无图</el-radio>
                    <el-radio>自动</el-radio>
                </el-radio-group>
            </el-form-item>
            <!-- 频道 -->
            <el-form-item label="频道">
                <!-- el-select下拉框 value没有会报错 -->
               <el-select value="请选择">
                   <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
               </el-select>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item>
                <el-button type='primary'>发布文章</el-button>
                <el-button>存入草稿</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: []
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
        // method: 'GET'
      }).then(result => {
        this.channels = result.data.channels // 获取文章频道
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style>

</style>
