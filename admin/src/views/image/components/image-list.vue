<template>
  <div class="image-list">
    <div class="action-head">
      <el-button size="mini"
                 type="success"
                 @click="dialogUploadVisible = true">上传数据</el-button>
    </div>
    <!-- 素材列表 -->
    <el-table :data="tableData"
              stripe
              style="width: 100%">
      <el-table-column prop="date"
                       label="日期"
                       width="180">
      </el-table-column>
      <el-table-column prop="name"
                       label="姓名">
      </el-table-column>
      <el-table-column prop="weight"
                       label="体重/kg">
      </el-table-column>
      <el-table-column prop="height"
                       label="身高/cm">
      </el-table-column>
      <el-table-column prop="weather"
                       label="天气">
      </el-table-column>
      <el-table-column prop="temperature"
                       label="温度/°">
      </el-table-column>
      <el-table-column prop="project"
                       label="体测项目">
      </el-table-column>
      <el-table-column prop="data"
                       label="体测数据">
      </el-table-column>
      <el-table-column prop="result"
                       label="体测成绩">
      </el-table-column>
    </el-table>
    <!-- /素材列表 -->

    <!-- 数据分页 -->
    <!--
      分页数据改变以后，页码不会变化
      它需要单独处理高亮的页码
     -->
    <el-pagination background
                   layout="prev, pager, next"
                   :total="totalCount"
                   :page-size="pageSize"
                   :current-page.sync="page">
    </el-pagination>
    <!-- /数据分页 -->

    <el-dialog title="上传文件"
               :visible.sync="dialogUploadVisible"
               :append-to-body="true">
      <!--
        upload 组件本身就支持请求提交上传操作，说白了你使用它不用自己去发请求，它会自己发。
        请求方法：默认就是 POST
        请求路径：action，必须写完整路径
        请求头：headers
       -->
      <el-upload class="upload-demo"
                 drag
                 action
                 name="image"
                 multiple
                 :show-file-list="false"
                 :on-success="onUploadSuccess">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip"
             slot="tip">上传前，请对应格式</div>
      </el-upload>
    </el-dialog>
  </div>
</template>




<script>

export default {
  name: 'ImageList',
  components: {},
  // 使用对象的方式定义 prop，更严谨，功能更丰富，强烈建议在项目中使用
  // 参考文档：https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E9%AA%8C%E8%AF%81

  // 使用数组声明 prop，不建议，不够严谨，而且功能也不够强大，仅适合 demo 演示
  // props: ['dsadsadsa'],
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      dialogUploadVisible: false,
      totalCount: 0, // 总数据条数
      pageSize: 20, // 每页大小
      page: 1, // 当前页码
      selected: null,// 选中的索引
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        weight: '60',
        height: '180',
        weather: '晴',
        temperature: '25',
        project: '1000',
        data: '180',
        result: '100'
      }, {

        date: '2016-05-02',
        name: '王小虎',
        weight: '60',
        height: '180',
        weather: '晴',
        temperature: '25',
        project: '1000',
        data: '180',
        result: '100'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        weight: '60',
        height: '180',
        weather: '晴',
        temperature: '25',
        project: '1000',
        data: '180',
        result: '100'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        weight: '60',
        height: '180',
        weather: '晴',
        temperature: '25',
        project: '1000',
        data: '180',
        result: '100'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        weight: '60',
        height: '180',
        weather: '晴',
        temperature: '25',
        project: '1000',
        data: '180',
        result: '100'
      }]
    }
  },
  computed: {},
  watch: {},
  created () {

  },
  mounted () { },
  methods: {
    onUploadSuccess () {
      // 关闭对话框
      this.dialogUploadVisible = false
    },


  }
}
</script>

<style scoped lang="less">
.action-head {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}

.image-item {
  position: relative;
}

.image-action {
  font-size: 25px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #fff;
  height: 40px;
  background-color: rgba(204, 204, 204, 0.5);
  position: absolute;
  bottom: 4px;
  left: 5px;
  right: 5px;
}

.selected {
  background: url(./selected.png) no-repeat;
  background-size: cover;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
