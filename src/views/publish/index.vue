<template>
    <el-card v-loading="loading">
        <!-- 面包屑 -->
        <bread-crumb slot="header">
            <!-- 具名插槽 -->
            <template slot="title">发布文章</template>
        </bread-crumb>
        <!-- el-form 表单组件 -->
        <el-form ref="publishForm" label-width="100px" :model="formData" :rules="publishRules">
            <!-- 标题 -->
            <el-form-item prop="title" label="标题">
                <el-input v-model="formData.title" style="width:400px"></el-input>
            </el-form-item>
            <!-- 内容 -->
            <el-form-item prop="content" label="内容">
                <el-input v-model="formData.content" row="6" placeholder="请输入内容" type="textarea">

                </el-input>
            </el-form-item>
            <!-- 封面 -->
            <el-form-item prop="cover" label="封面">
                <el-radio-group v-model="formData.cover.type">
                    <el-radio :label="1">单图</el-radio>
                    <el-radio :label="3">三图</el-radio>
                    <el-radio :label="0">无图</el-radio>
                    <el-radio :label="-1">自动</el-radio>
                </el-radio-group>
            </el-form-item>
            <!-- 频道 -->
            <el-form-item prop="channel_id" label="频道">
                <!-- el-select下拉框 value没有会报错 -->
               <el-select v-model="formData.channel_id" value="请选择">
                   <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
               </el-select>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item>
                <el-button @click="publishArtcles(false)" type='primary'>发布文章</el-button>
                <el-button @click="publishArtcles(true)">存入草稿</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      // 定义一个频道对象
      channels: [],
      //   表单数据对象
      formData: {
        title: '', // 标题
        content: '', // 内容
        channel_id: null, // 频道id
        cover: {
          type: 0,
          images: []
        } // 封面类型 -1:自动，0-无图，1-1张，3-3张
      },
      //   发布规则
      publishRules: {
        title: [{ required: true, message: '标题不能为空' },
          { min: 2, max: 10, message: '标题长度控制在2~10位' }],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]
      }
    }
  },
  methods: {
    getChannels () {
      this.loading = true
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels // 获取文章频道
        this.loading = false
      })
    },
    // 根据文章Id 获取文章详情
    getArticleById (Id) {
      this.$axios({
        url: `/articles/${Id}` // 这传过来的Id已经是字符串了
      }).then(result => {
        this.formData = result.data
      })
    },
    // 发布文章和存为草稿
    publishArtcles (draft) {
      this.$refs.publishForm.validate(isOK => {
        if (isOK) {
          let { articleId: Id } = this.$route.params
          //   如果有传过来的Id就是编辑  没有就是新增
          if (Id) {
            // 修改和新增数据接口一样
            this.$axios({
              url: `/articles/${Id}`,
              method: 'put',
              params: { draft }, // draft 为true时是草稿，为false时是正式内容
              data: this.formData
            }).then(result => {
              this.$router.push('/home/articles')
            })
          } else {
            //   新增
            this.$axios({
              url: '/articles',
              method: 'post',
              params: { draft }, // draft 为true时是草稿，为false时是正式内容
              data: this.formData
            }).then(() => {
            // 发布成功了 回到内容列表
              this.$router.push('/home/articles')
            })
          }
        }
      })
    }
  },
  created () {
    this.getChannels() // 获取频道
    // 获取Id
    let { articleId: Id } = this.$route.params // 有articleId就是编辑 没有就是新增
    Id && this.getArticleById(Id) // 如果存在才执行后面逻辑
  }
}
</script>

<style>

</style>
