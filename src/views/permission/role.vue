<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddWindow">新增角色</el-button>

    <el-table :data="windowList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="window_no" align="header-center" label="窗口编号" /> -->
      <el-table-column align="center" label="菜单">
        <template slot-scope="scope">
          {{ scope.row.menu }}
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="节点">
        <template slot-scope="scope">
          {{ scope.row.node }}
        </template>
      </el-table-column> -->
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
      <el-form :model="addRole" label-width="80px" label-position="left">
        <el-form-item label="角色名称">
          <el-input v-model="addRole.name" placeholder="角色名称" />
        </el-form-item>
        <el-form-item label="菜单">
          <el-tree
            ref="tree"
            :data="menuData"
            show-checkbox
            default-expand-all
            node-key="id"
            highlight-current
            :props="defaultProps"
          />
        </el-form-item>
        <!-- <el-form-item label="窗口编号">
          <el-input v-model="addRole.windowNo" placeholder="窗口编号" />
        </el-form-item> -->
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmRole">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { roleListApi, addRole, deleteRole } from '@/api/user'
import { getRoutes } from '@/api/role'

export default {
  data() {
    return {
      page: 1,
      pageSize: 10,
      total: 0,
      addRole: {},
      routes: [],
      windowList: [],
      dialogVisible: false,
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      menuData: []
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getRoleList()
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val
      this.getRoleList()
    },
    onClose() {
      for (const key in this.addRole) {
        this.addRole[key] = ''
      }
    },
    async getRoleList() {
      const res = await roleListApi({ page: this.page, pageSize: this.pageSize })
      this.page = res.data.page
      this.total = res.data.count
      this.pageSize = res.data.pageSize
      this.windowList = res.list
    },
    handleAddWindow() {
      getRoutes().then(res => {
        this.menuData = res.data.list
      })
      this.dialogVisible = true
    },
    confirmRole() {
      const selectedKeys = this.$refs.tree.getCheckedKeys()
      console.log(selectedKeys, 'selectedKeys')
      addRole({ ...this.addRole, menu: selectedKeys }).then(res => {
        this.$message.success('添加成功')
        this.dialogVisible = false
        this.getRoleList()
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('确定删除?', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          deleteRole({ id: row.id }).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getRoleList()
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
