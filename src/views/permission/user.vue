<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddUser">新增用户</el-button>

    <el-table :data="userList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="用户id">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户名称">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column prop="regIp" align="header-center" label="用户IP" />
      <el-table-column align="center" label="上次登录时间">
        <template slot-scope="scope">
          {{ scope.row.lastLoginTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="上次登录IP">
        <template slot-scope="scope">
          {{ scope.row.lastLoginIp }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.createdAt }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="更新时间">
        <template slot-scope="scope">
          {{ scope.row.updatedAt }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色名称">
        <template slot-scope="scope">
          {{ scope.row.roleName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="所在窗口">
        <template slot-scope="scope">
          {{ scope.row.windowName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
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

    <el-dialog :visible.sync="dialogVisible" :title="'新增用户'" @close="onClose">
      <el-form :model="addUser" label-width="80px" label-position="left">
        <el-form-item label="用户名">
          <el-input v-model="addUser.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addUser.password" placeholder="密码" />
        </el-form-item>
        <el-form-item label="角色id">
          <el-input v-model="addUser.roleId" placeholder="角色id" />
        </el-form-item>
        <el-form-item label="窗口id">
          <el-input v-model="addUser.windowId" placeholder="窗口id" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmUser">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { userListApi, addUser, deleteUser } from '@/api/user'

export default {
  data() {
    return {
      page: 1,
      pageSize: 10,
      total: 0,
      addUser: {},
      routes: [],
      userList: [],
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
    this.getUserList()
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val
      this.getUserList()
    },
    onClose() {
      for (const key in this.addUser) {
        this.addUser[key] = ''
      }
    },
    async getUserList() {
      const res = await userListApi({ page: this.page, pageSize: this.pageSize })
      this.page = res.data.page
      this.total = res.data.count
      this.pageSize = res.data.pageSize
      this.userList = res.list
    },
    handleAddUser() {
      this.dialogVisible = true
    },
    confirmUser() {
      addUser(this.addUser).then(res => {
        this.$message.success('添加成功')
        this.dialogVisible = false
        this.getUserList()
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('确定删除?', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          deleteUser({ id: row.id }).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getUserList()
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
