<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddWindow">新增窗口</el-button>

    <el-table :data="windowList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column prop="window_no" align="header-center" label="窗口编号" />
      <el-table-column align="center" label="业务ID">
        <template slot-scope="scope">
          {{ scope.row.businessData.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="业务标题">
        <template slot-scope="scope">
          {{ scope.row.businessData.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.create_time }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="更新时间">
        <template slot-scope="scope">
          {{ scope.row.update_time }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <!-- <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button> -->
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination
        background
        :total="total"
        :current-page.sync="page"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog :visible.sync="dialogVisible" :title="'新增窗口'" @close="onClose">
      <el-form :model="addWindow" label-width="80px" label-position="left">
        <el-form-item label="业务ID">
          <el-input v-model="addWindow.businessId" placeholder="业务ID" />
        </el-form-item>
        <el-form-item label="窗口名称">
          <el-input v-model="addWindow.title" placeholder="窗口名称" />
        </el-form-item>
        <el-form-item label="窗口编号">
          <el-input v-model="addWindow.windowNo" placeholder="窗口编号" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmWindow">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { windowListApi, windowDeleteApi, windowCreateApi } from '@/api/order'

export default {
  data() {
    return {
      page: 1,
      pageSize: 10,
      total: 0,
      addWindow: {
        businessId: '',
        title: '',
        windowNo: ''
      },
      routes: [],
      windowList: [],
      dialogVisible: false,
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getWindowList()
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val
      this.getWindowList()
    },
    onClose() {
      for (const key in this.addWindow) {
        this.addWindow[key] = ''
      }
    },
    async getWindowList() {
      const res = await windowListApi({ page: this.page, pageSize: this.pageSize })
      this.page = res.data.page
      this.total = res.data.count
      this.pageSize = res.data.pageSize
      this.windowList = res.list
    },
    handleAddWindow() {
      this.dialogVisible = true
    },
    confirmWindow() {
      windowCreateApi(this.addWindow).then(res => {
        this.$message.success('添加成功')
        this.dialogVisible = false
        this.getWindowList()
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('确定删除?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          windowDeleteApi({ id: row.id }).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getWindowList()
          })
        })
        .catch(err => { console.error(err) })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
