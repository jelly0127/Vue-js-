<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $route.query.id ?
            '修改数据报告' : '发布数据报告'}}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑导航 -->
      </div>

      <div>
        <el-form ref="publish-form"
                 :model="article"
                 label-width="60px"
                 :rules="formRules">
          <el-form-item label="内容"
                        prop="content">
            <!-- <el-input type="textarea"
                      v-model="article.content">
            </el-input> -->
            <el-tiptap v-model="article.content"
                       lang="zh"
                       :extensions="extensions"
                       height="400"
                       placeholder="写点什么...">
            </el-tiptap>
          </el-form-item>
          <el-form-item label="封面">
            <el-radio-group v-model="article.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="0">无图</el-radio>
            </el-radio-group>
            <!-- 需要将选择的封面图片的地址放到
            article.cover.images数组中 
            
            如果想要在事件处理函数自定义传参后还想得到原来的
            时间本身的参数，则手动指定$event，
            它就代表了那个事件本身的参数

           在组件上使用v-model
           当你需要给子组件提供的数据既要使用还要修改。
           这个时候可以使用v-model简化数据绑定
            v-model="article.cover.images[index]"
            给子组件传递了一个名字叫value的数据
            :value="article.cover.images[index]"
            默认监听input事件，当事件发生，它会让数据绑定=事件参数
            @input="article.cover.images[index]=事件参数"

            注意：v-model只是简写，本质还是在父子组件通信
            -->
            <template v-if="article.cover.type > 0">
              <!-- <UploadCover :key="cover"
                           v-for="(cover,index) in article.cover.type"
                           :cover-image="article.cover.images[index]"
                           @update-cover='onUpdateCover(index,$event)' /> -->

              <UploadCover :key="cover"
                           v-for="(cover,index) in article.cover.type"
                           v-model="article.cover.images[index]" />
            </template>

          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="onPublish(false)">立即发布</el-button>
            <el-button @click="onPublish(true)">存入草稿</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  getArticlesChannels, addArticle,
  updateArticle, getArticle
} from "../../api/article"
import { uploadImage } from "../../api/image"
//引入富文本编辑
import 'element-tiptap/lib/index.css'
import UploadCover from "./components/upload-cover.vue"
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Image,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  HorizontalRule,
  Fullscreen,
  Preview,
  CodeBlock
} from 'element-tiptap'

export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap, UploadCover
  },
  data () {
    return {
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 3 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Image({
          // 默认会把图片生成base64字符串和内容
          // 存储在一起，如果需要自定义图片上传，
          uploadRequest (file) {
            const fd = new FormData()
            fd.append('image', file)
            // 这里 return 是返回 Promise 对象
            return uploadImage(fd).then(({ data: res }) => {
              // 这个 return 是返回最后的结果
              return res.data.url
            })//图片的上传方法，返回一个Posmise<url>
          }
        }),
        new Underline(), // 下划线
        new Italic(), // 斜体
        new Strike(), // 删除线
        new HorizontalRule(), // 华丽的分割线
        new ListItem(),
        new BulletList(), // 无序列表
        new OrderedList(), // 有序列表
        new TodoItem(),
        new TodoList(),
        new Fullscreen(),
        new Preview(),
        new CodeBlock()
      ],
      article: {
        content: '',//文章内容
        cover: {//文章封面
          type: 0,//封面类型
          images: [],//封面图片的地址
        }
      },
      channels: [],//文章频道列表
      channel_id: null,//文章频道id
      formRules: {
        title: [
          {
            required: true, message: '请输入文章标题',
            trigger: 'blur'
          },
          {
            main: 5, max: 30, message: '长度在5-30个字符',
            trigger: 'blur'
          }
        ],
        content: [
          // {
          //   required: true, message: '请输入文章内容',
          //   trigger: 'change'
          // }
          {
            validator (rule, value, callback) {
              if (value === '<p></p>') {
                //验证失败
                callback(new Error('请输入文章内容'))
              } else {
                //验证通过
                callback()
              }
            }
          },
          {
            required: true, message: '请选择文章内容',
            trigger: 'blur'
          },
        ],
      }
    }
  },
  created () {
    this.loadChannels()
    //由于发布和修改使用的是同一组件
    //所以这里要判断
    //如果路由路径参数中有id，则请求展示文章内容
    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
  methods: {
    onPublish (draft = false) {
      //手动表单验证
      this.$refs['publish-form'].validate(valid => {
        //验证失败，停止提交表单
        if (!valid) {
          return
        }
        //验证通过，提交表单
        // 找到数据接口
        // 封装请求方法
        // 请求提交表单
        //如果是修改文章，执行修改操作，否则执行添加操作
        const articleId = this.$route.query.id
        if (this.$route.query.id) {
          //执行修改操作
          updateArticle(articleId, this.article, draft).
            then(res => {
              // console.log(res)
              this.$message({
                message: `${draft ? '存入草稿' : '修改'}成功`,
                type: 'success'
              })
              //编辑完成跳转到内容管理页面
              this.$router.push('/article')
            })
        } else {
          addArticle(this.article, draft).then(res => {
            // 处理响应结果
            // console.log(res)
            this.$message({
              message: `${draft ? '存入草稿' : '发布'}成功`,
              type: 'success'
            })
            //编辑完成跳转到内容管理页面
            this.$router.push('/article')
          })
        }
      })

    },
    loadChannels () {
      getArticlesChannels().then(res => {
        // console.log(res);
        this.channels = res.data.data.channels
      })
    },
    //修改文章：加载文章内容
    loadArticle () {
      //找到数据接口
      //封装数据方法
      //请求获取数据
      getArticle(this.$route.query.id).then(res => {
        //模板绑定展示
        // console.log(res);
        this.article = res.data.data
      })
    },
    onUpdateCover (index, url) {
      // console.log(index, url)
      this.article.cover.images[index] = url
    }
  }
}
</script>

<style lang="less" scoped>
</style>