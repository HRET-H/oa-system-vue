<template>
  <div class="scrollbar-container" data-simplebar>
    <div style="position: relative">
      <div style="position: absolute; top: 25px; right: 350px">
        <el-button
          icon="el-icon-check"
          v-if="tableData.state == '1'"
          type="primary"
          style="height: 36px; width: 88px"
          plain
          @click="open()"
          >同意</el-button
        >
        <el-button
          icon="el-icon-close"
          v-if="tableData.state == '1'"
          type="danger"
          style="height: 36px; width: 88px"
          plain
          @click="openTo()"
          >拒绝</el-button
        >
        <el-dropdown v-if="tableData.state == '1'">
          <el-button
            icon="el-icon-more"
            class="custom-button"
            style="margin-left: 10px"
            type="primary"
          ></el-button>
          <template v-slot:dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="1">选项1</el-dropdown-item>
              <el-dropdown-item command="2">选项2</el-dropdown-item>
              <el-dropdown-item command="3">选项3</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div style="position: absolute; top: 10px; right: 30px">
      审批流程
      <div style="height: 400px">
        <h1></h1>
        <el-steps :space="100" direction="vertical">
          <img
            src="../../../../assets/u2227.svg"
            style="width: 16px; height: 16px; margin-right: 10px"
          />
          <span
            style="
              position: relative;
              top: -20px;
              margin-left: 25px;
              font-size: 14px;
            "
            >提交 &nbsp;&nbsp; &nbsp;&nbsp;<span
              style="color: #989daa; fontsize: '10px'"
              >{{ tableData.reimbursementNumber }}</span
            ></span
          >
          <img
            src="../../../../assets/u6203.png"
            style="
              width: 60px;
              height: 60px;
              margin-top: -10px;
              margin-left: 20px;
            "
          />
          <span style="color: #989daa; margin-left: 30px; font-size: 14px">{{
            tableData.employeeName
          }}</span>
          <h1></h1>

          <img
            src="../../../../assets/u2227.svg"
            style="width: 16px; height: 16px; margin-right: 10px"
          />
          <span
            style="
              position: relative;
              top: -20px;
              margin-left: 25px;
              font-size: 14px;
            "
            >审批人 &nbsp;&nbsp; &nbsp;&nbsp;<span
              style="color: #2ac857; fontsize: '10px'"
              >{{ tableData.state }}</span
            >&nbsp;&nbsp; &nbsp;&nbsp;<span
              style="color: #989daa; fontsize: '10px'"
              >{{ tableData.reimbursementNumber }}</span
            ></span
          >
          <img
            src="../../../../assets/u6301.svg"
            style="
              width: 60px;
              height: 60px;
              margin-top: -10px;
              margin-left: 20px;
            "
          />
          <span style="color: #989daa; margin-left: 30px; font-size: 14px">{{
            tableData.employeeName
          }}</span>
          <h1></h1>

          <img
            src="../../../../assets/u2229.svg"
            style="width: 16px; height: 16px; margin-right: 10px"
          />
          <span
            style="
              position: relative;
              top: -20px;
              margin-left: 25px;
              font-size: 14px;
            "
            >审批人 &nbsp;&nbsp; &nbsp;&nbsp;<span
              style="color: #2ac857; fontsize: '10px'"
              >{{ tableData.state }}</span
            >&nbsp;&nbsp; &nbsp;&nbsp;<span
              style="color: #989daa; fontsize: '10px'"
              >{{ tableData.reimbursementNumber }}</span
            ></span
          >
          <img
            src="../../../../assets/u2217.svg"
            style="
              width: 60px;
              height: 60px;
              margin-top: -10px;
              margin-left: 20px;
            "
          />
          <span style="color: #989daa; margin-left: 30px; font-size: 14px">{{
            tableData.employeeName
          }}</span>
          <h1></h1>

          <img
            src="../../../../assets/u2210.svg"
            style="width: 16px; height: 16px; margin-right: 10px"
          />
          <span
            style="
              position: relative;
              top: -20px;
              margin-left: 25px;
              font-size: 14px;
            "
            >审批人 &nbsp;&nbsp; &nbsp;&nbsp;<span
              style="color: #2ac857; fontsize: '10px'"
              >{{ tableData.state }}</span
            >&nbsp;&nbsp; &nbsp;&nbsp;<span
              style="color: #989daa; fontsize: '10px'"
              >{{ tableData.reimbursementNumber }}</span
            ></span
          >
          <img
            src="../../../../assets/u2223.svg"
            style="
              width: 60px;
              height: 60px;
              margin-top: -10px;
              margin-left: 20px;
            "
          />
          <span style="color: #989daa; margin-left: 30px; font-size: 14px">{{
            tableData.employeeName
          }}</span>
          <h1></h1>
        </el-steps>
      </div>
    </div>
    <div>
      <img
        src="../../../../assets/u6203.png"
        style="width: 116px; height: 116px; margin-top: -15px"
      />
      <el-form :model="seal" label-position="right" class="roleAddForm">
        <span
          style="
            position: relative;
            top: -95px;
            margin-left: 140px;
            font-size: 26px;
          "
          >{{ tableData.returnPerson }}的档案归还申请申请</span
        >
        <div
          v-if="seal.state == '已同意'"
          style="
            position: relative;
            top: -125px;
            margin-left: 360px;
            width: 60px;
            height: 25px;
            background-color: rgba(42, 200, 87, 1);
            border: 1px solid #ccc;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <span style="color: #ffffff; font-size: 12px">
            {{ tableData.state }}
          </span>
        </div>
        <div
          v-if="seal.state == '审批中'"
          style="
            position: relative;
            top: -125px;
            margin-left: 360px;
            width: 60px;
            height: 25px;
            background-color: #409eff;
            border: 1px solid #ccc;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <span style="color: #ffffff; font-size: 12px">
            {{ tableData.state }}
          </span>
        </div>
        <div
          v-if="seal.state == '已拒绝'"
          style="
            position: relative;
            top: -125px;
            margin-left: 360px;
            width: 60px;
            height: 25px;
            background-color: rgba(255, 93, 93, 1);
            border: 1px solid #ccc;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <span style="color: #ffffff; font-size: 12px">
            {{ tableData.state }}
          </span>
        </div>
        <div
          v-if="seal.state == '已撤销'"
          style="
            position: relative;
            top: -125px;
            margin-left: 360px;
            width: 60px;
            height: 25px;
            background-color: rgba(198, 201, 208, 1);
            border: 1px solid #ccc;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <span style="color: #ffffff; font-size: 12px">
            {{ tableData.state }}
          </span>
        </div>
        <div class="divider-wrapper">
          <el-divider class="custom-divider"></el-divider>
        </div>
        <h1></h1>
        <br />
        <br />
        <span
          style="
            position: relative;
            top: -160px;
            margin-left: 140px;
            font-size: 14px;
          "
          >提交于{{ tableData.submitTime }}</span
        >
        <span
          style="
            position: relative;
            top: -160px;
            color: #989daa;
            margin-left: 70px;
            font-size: 14px;
          "
          >审批编号：{{ tableData.sid }}</span
        >
        <div
          style="
            background-color: rgba(24, 144, 255, 1);
            width: 3px;
            height: 20px;
            margin-right: 10px;
            margin-left: 25px;
            margin-top: -70px;
          "
        ></div>
        <el-form-item label="审批详情" style="margin-top: -30px"></el-form-item>
        <el-form-item label="员工信息">
          <template> </template>
        </el-form-item>
        <span style="margin-left: 30px; color: #989daa">申请人:</span>
        <span style="position: relative; margin-left: 20px">{{
          tableData.returnPerson
        }}</span>
        <span style="margin-left: 150px; color: #989daa">工作邮箱:</span>
        <span style="position: relative; margin-left: 20px">{{
          tableData.mail
        }}</span>
        <span style="margin-left: 150px; color: #989daa">手机:</span>
        <span style="position: relative; margin-left: 20px">{{
          tableData.phone
        }}</span>
        <h1></h1>
        <span style="margin-left: 45px; color: #989daa">工号:</span>
        <span style="position: relative; margin-left: 20px">{{
          tableData.sid
        }}</span>

        <el-form-item style="margin-top: 50px" label="归还信息">
          <template> </template>
        </el-form-item>
        <span style="margin-left: 30px; color: #989daa">用章类型:</span>
        <span style="position: relative; margin-left: 20px">{{
          tableData.stype
        }}</span>
        <span style="margin-left: 150px; color: #989daa">印章名称:</span>
        <span style="position: relative; margin-left: 20px">{{
          tableData.sname
        }}</span>
        <h1></h1>
        <span style="margin-left: 27px; color: #989daa">盖章文件:</span>
        <span style="position: relative; margin-left: 20px">{{
          tableData.sfile
        }}</span>

        <span style="margin-left: 135px; color: #989daa">盖章文件份数:</span>
        <span style="position: relative; margin-left: 20px"
          >{{ tableData.stamp }}份</span
        >
        <h1></h1>
        <span style="margin-left: 27px; color: #989daa">用章事由:</span>
        <span style="position: relative; margin-left: 20px">{{
          tableData.sillustrate
        }}</span>
        <span style="margin-left: 128px; color: #989daa">用章时间:</span>
        <span style="position: relative; margin-left: 20px">{{
          tableData.returnTime
        }}</span>
      </el-form>
    </div>
    <el-aside></el-aside>
  </div>
</template>

<script>
import axios from 'axios'
// import 'simplebar/dist/simplebar.min.css' // 引入 simplebar 样式
export default {
  name: 'operIndex',
  mounted() {
    // 初始化 simplebar
    // new SimpleBar(document.querySelector('.scrollbar-container'))
  },
  data() {
    return {
      dialogVisible: false,
      fileList: [],
      up: true,
      de: true,
      tableData: [],

      queryParams: {
        borrowingName: '',
        borrowingType: '',
        startTime: '',
        endTime: ''
      },
      queryParamsTo: {
        startTime: '',
        endTime: ''
      },
      yilist: '',
      formVisible: true, // 默认显示表单
      dateRange: [],
      dateRangeTo: [],
      seal: {
        sId: '',
        speople: '',
        sName: '',
        phone: '',
        start: '',
        stype: '',
        stamp: '',
        sFile: '',
        sIllustrate: '',
        mail: '',
        applicationTime: '',
        submitTime: '',
        returnTime: '',
        returnPerson: ''
      }
    }
  },
  created() {
    this.handleEdit()
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleSelectionChange(e) {
      this.yilist = e.map((item) => item.operId)
      console.log(this.yilist, 777)
      if (this.yilist.length == 1) {
        this.up = false
        this.de = false
      } else if (this.yilist.length > 1) {
        this.up = true
        this.de = false
      } else {
        this.up = true
        this.de = true
      }
    },
    toAddDialog() {
      this.dialogFormVisible = true
      this.title = '添加字典类型'
    },
    toAddDialogTO() {
      this.$router.push('/reimbursementXiangQing')
      // this.dialogFormVisibleTO = true;
      // this.title = "添加字典类型"
    },
    handleEditTO() {
      const id = id
      console.log(id)
    },
    handleEdit() {
      const id = this.$route.query.id
      console.log(id)
      axios.get('/seal/findal?id=' + id).then((res) => {
        this.$nextTick(() => {
          this.tableData = res.data
        })
      })
    },
    handleDeleteTo(index, row) {
      console.log(index, row)
      axios.get('/borrowing/agreeBorrowing?id=' + row.id).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.searchRoleListPagination()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    handleDeleteAo(index, row) {
      console.log(index, row)
      axios.get('/borrowing/refuseBorrowing?id=' + row.id).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.searchRoleListPagination()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    addRole() {
      axios.post('/manager/tyg/addYg', this.seal).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            message: '恭喜你，' + res.data.msg,
            type: 'success'
          })
          this.dialogFormVisibleTO = false
          this.searchRoleListPagination()
        } else {
          this.$message.error('错了哦，' + res.data.msg)
        }
      })
    },

    // handleDeleteTo(index, row) {
    //   console.log(index, row)
    //   axios
    //     .get('/reimbursement/updaReimbursemen?id=' + row.id)
    //     .then((res) => {
    //       if (res.data.code == 200) {
    //         this.$message({
    //           message: res.data.msg,
    //           type: 'success'
    //         })
    //         this.searchRoleListPagination()
    //       } else {
    //         this.$message.error(res.data.msg)
    //       }
    //     })
    // },

    open() {
      this.$confirm('确认同意此审批', '操作确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          axios
            .get('/reimbursement/updaReimbursemen?id=' + this.seal.id)
            .then((res) => {
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
              this.handleEdit()
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    openTo() {
      this.$confirm('确认拒绝此审批', '操作确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          axios
            .get('/reimbursement/delReimbursemen?id=' + this.seal.id)
            .then((res) => {
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
              this.handleEdit()
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },

    handleAvatarSuccess(res, file) {
      console.log(res)
      console.log(URL.createObjectURL(file.raw))
      // this.content.pic = URL.createObjectURL(file.raw);
      this.sysUser.pic = res.msg
    },
    beforeAvatarUpload() {
      // const isJPG = file.type === 'image/jpeg';
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      // this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      // this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      // return isJPG && isLt2M;
    },
    showTree() {
      this.dialogVisible = true
    },

    // 批量删除
    deleteBatchIds() {
      axios.get('/oper/deleteBatchIds?roleIds=' + this.yilist).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            message: '恭喜你，' + res.data.msg,
            type: 'success'
          })
          this.searchRoleListPagination()
        } else {
          this.$message.error('错了哦，' + res.data.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
.block {
  text-align: right;
  margin-top: 10px;
  margin-right: 20px;
}
.hiddenForm {
  text-align: right;
}
.custom-divider {
  width: 75%; /* 设置分割线宽度为50% */
  border-top: 2px solid rgb(146, 146, 146); /* 设置分割线粗细为2px，颜色为黑色 */
}
.divider-wrapper {
  position: relative;
  left: 24px; /* 设置包裹元素向右移动 20px，从而影响分割线位置 */
  top: 10px;
}
.roleAddForm .el-input,
.el-textarea {
  width: 360px;
}
.el-dialog__wrapper.fullscreen {
  width: 100%;
  height: 100%;
}
>>> .el-dialog {
  width: 600px;
}
>>> .el-form-item__label {
  width: 100px;
  font-weight: 700;
}
.right-side-dialog {
  max-height: 100%;
  width: 50%; /* 设置弹框宽度为屏幕的一半 */
  right: 0; /* 将弹框定位到屏幕右侧 */
}
.el-dialog__wrapper.right-side-dialog.fullscreen {
  width: 50%; /* 设置弹框容器的宽度为屏幕的一半 */
  right: 0; /* 将弹框容器定位到屏幕右侧 */
}
>>> .el-dialog.right-side-dialog {
  width: 100%; /* 设置弹框内部内容宽度为100% */
}
.el-dialog__wrapper {
  z-index: 2000; /* 设置 el-dialog 的 z-index 值 */
}
.el-dialog__wrapper {
  z-index: 2000; /* 设置 el-dialog 的 z-index 值 */
}
.custom-button {
  margin-right: 20px; /* 向右移动 20px */
}
.custom-button .el-icon-arrow-down {
  color: #fff; /* 修改箭头图标颜色为白色 */
}
.custom-button {
  color: rgb(44, 44, 44); /* 设置按钮文字颜色为白色 */
  background-color: #fff; /* 设置按钮背景颜色为蓝色 */
  border-color: #ccc; /* 设置按钮边框颜色为灰色 */
  height: 35px;
  width: -5px;
}
.el-dialog__wrapper::after {
  z-index: 999; /* 设置遮罩层的 z-index 值 */
}
.custom-input .el-input__inner {
  border: none !important;
  box-shadow: none !important;
}

.custom-step .el-step__head.is-center {
  width: 16px; /* 调整圆点大小 */
  height: 16px;
  line-height: 16px;
  border-radius: 50%; /* 将方形变成圆形 */
  text-align: center;
}

.custom-step .el-step__head.is-center .el-step__icon.is-text {
  display: none; /* 隐藏数字标识 */
}

.custom-step .el-step__main {
  padding-left: 20px; /* 调整圆点与标题的间距 */
}
/* 使用 hidden 属性隐藏滚动条 */
.sidebar {
  overflow: hidden; /* 隐藏滚动条 */
}

/* 覆盖滚动条 */
.sidebar {
  width: calc(100% + 17px); /* 增加滚动条宽度 */
  margin-right: -17px; /* 负边距覆盖滚动条 */
}

#div-nav::-webkit-scrollbar {
  display: none;
}

/* 这里是你的样式表 */
.scrollbar-container {
  /* 设置容器宽度和高度 */
  width: 100%;
  height: 100%;
}

.vertical-dividerTo {
  width: 12px; /* 设置竖直分割线的宽度 */
  height: 100%; /* 设置竖直分割线的高度 */
  background-color: red; /* 设置竖直分割线的颜色 */
}
</style>
