<template>
  <div class="settings-container">
    <el-card class="">
      <div slot="header"
           class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">
            首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置

          </el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑导航 -->
      </div>
      <el-row>
        <el-col :offset="2"
                :span="15">
          <el-form ref="form"
                   :model="form"
                   label-width="80px">
            <el-form-item label="编号">
              {{user.id}}
            </el-form-item>
            <el-form-item label="手机">
              {{user.mobile}}
            </el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         @click="onUpdateUser"
                         :loading="updateUserProfileLoading">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4" class="InFo_Box">

          <label for="file" class="InFo_Box">
            <el-avatar shape="circle"
                       :size="150"
                       fit="cover"
                       :src="user.photo"></el-avatar>
            <!-- <p @click="$refs.file.click()">点击修改头像</p> -->
        <button class="changeInFo"> 点击修改头像</button>
          </label>
          <input id="file"
                 type="file"
                 hidden
                 ref="file"
                 @change="onFileChange">
        </el-col>
      </el-row>

    </el-card>
    <el-dialog title="修改头像"
               :visible.sync="dialogVisible"
               append-to-body
               @opened="onDialogOpened"
               @closed="onDialogClosed">
      <div class="preview-image-wrap">
        <img class="preview-image"
             :src="previewImage"
             ref="preview-image">
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="onUpdatePhoto">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { userInfo, updateUserPhoto, updateUserProfile } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import globalBus from '../../utils/global-bus'

//获取图片 DOM 节点
// const image = this.$refs['preview-image']
//初始化裁切器
// const cropper = new Cropper(image, {
//   aspectRatio: 16 / 9,
//   crop(event) {
//     console.log(event.detail.x);
//     console.log(event.detail.y);
//     console.log(event.detail.width);
//     console.log(event.detail.height);
//     console.log(event.detail.rotate);
//     console.log(event.detail.scaleX);
//     console.log(event.detail.scaleY);
//   },
// });
export default {
  name: 'SettingIndex',
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      user: {//用户资料
        email: '',
        id: null,
        intro: '',
        mobile: '',
        name: '',
        photo: ''
      },
      dialogVisible: false,//控制上传图片裁切预览的显示状态
      previewImage: '',//预览图片
      cropper: null,//裁切器实例
      updateUserProfileLoading: false//更新用户基本信息的
      //loading状态

    }
  },
  created () {
    this.loadUser()
  },
  methods: {
    onUpdateUser () {
      //表单验证
      //loading状态开启
      this.updateUserProfileLoading = true
      //提交表单
      const { name, intro, email } = this.user
      updateUserProfile({
        name,
        intro,
        email
      }).then(res => {
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('保存失败')

      })
      //loading状态关闭
      this.updateUserProfileLoading = false

    },
    loadUser () {
      userInfo().then(res => {
        // console.log(res)
        this.user = res.data.data
      })
    },
    onFileChange () {
      //处理图片预览
      const file = this.$refs.file
      const blobData = window.URL.createObjectURL
        (file.files[0])
      this.previewImage = blobData

      //展示弹出层，预览用户选择的图片
      this.dialogVisible = true


      //解决选择相同文件不触发change事件问题
      //操作dom使其的值每次打开都为空
      this.$refs.file.value = ''
    },
    onDialogOpened () {
      //图片裁切器必须基于img进行初始化
      //注意：img必须是可见状态才能完成初始化 
      //  因为这里要在对话框里面初始化裁切器
      //  所以这个初始化代码要放到对话框完成打开的状态去进行初始化
      // 获取图片 DOM 节点
      const image = this.$refs['preview-image']
      //第一次初始化好以后，如果预览裁切的图片发生了变化，
      //裁切器默认不会更新
      //如果要预览图片发生变化更新裁切器：
      //1.裁切器的replace方法
      //2.销毁裁切器，重新初始化

      //初始化裁切器
      if (this.cropper) {
        this.cropper.replace(this.previewImage)
        return
      }
      this.cropper = new Cropper(image, {
        viewMode: 1,
        dragMode: 'move',
        aspectRatio: 1,
        cropBoxMovable: false,
        cropBoxResizable: false,
        background: false,
        movable: true

        //当移动裁切器的时候会触发调用crop方法
        // crop (event) {
        //   console.log(event.detail.x)
        //   console.log(event.detail.y)
        //   console.log(event.detail.width)
        //   console.log(event.detail.height)
        //   console.log(event.detail.rotate)
        //   console.log(event.detail.scaleX)
        //   console.log(event.detail.scaleY)
        // }
      })
    },
    onDialogClosed () {
      // //对话框关闭，销毁裁切器
      // this.cropper.destroy()

    },
    onUpdatePhoto () {
      //获取裁切的图片对象
      this.cropper.getCroppedCanvas().toBlob(file => {
        const fd = new FormData()
        fd.append('photo', file)
        // 请求更新用户头像提交fd
        updateUserPhoto(fd).then(res => {

          //更新视图展示
          this.user.photo = window.URL.
            createObjectURL(file)
          this.$message.success('头像更新成功')
        }).catch(err => {
          console.log(err)
          this.$message.error('头像更新失败')

        })
        //关闭对话框
        this.dialogVisible = false
        //发布通知，用户信息已修改
        //更新顶部的用户信息
        globalBus.$emit('update-user', this.user)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.preview-image-wrap {
  .preview-image {
    display: block;
    /* This rule is very important, please don't ignore this */
    max-width: 100%;
    height: 200px;
  }
}
.changeInFo{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}
.InFo_Box{
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  width: 150px;
  margin-left: 20px;
}
</style>