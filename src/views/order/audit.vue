<template>
  <div class="app-container">
    <el-table :data="windowList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="昵称">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column prop="businessName" align="header-center" label="业务名称" />
      <el-table-column align="center" label="预约时间">
        <template slot-scope="scope">
          {{ scope.row.bookingDate }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="图片">
        <template slot-scope="scope">
          <div v-for="item in scope.row.image" :key="item" style="padding: 5px">
            <img :src="item" alt="" sizes="" srcset="">
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.create_time }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="审核时间">
        <template slot-scope="scope">
          {{ scope.row.audit_time }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleAudit(scope, '1')">通过</el-button>
          <el-button type="danger" size="small" @click="handleAudit(scope, '0')">拒绝</el-button>
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
  </div>
</template>

<script>
import { auditPassApi, auditListApi, auditRejectApi } from '@/api/order'

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
    this.getAuditList()
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val
      this.getAuditList()
    },
    async getAuditList() {
      const res = await auditListApi({ page: this.page, pageSize: this.pageSize })
      this.page = res.data.page
      this.total = res.data.count
      this.pageSize = res.data.pageSize
      this.windowList = res.list
    },
    handleAudit({ row }, status) {
      const _title = status === '1' ? '通过' : '拒绝'
      this.$confirm(`确定${_title}?`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          status === '1' && auditPassApi({ id: row.id }).then(res => {
            this.$message({
              type: 'success',
              message: '审核通过!'
            })
            this.getAuditList()
          })
          status === '0' && auditRejectApi({ id: row.id }).then(res => {
            this.$message({
              type: 'success',
              message: '已拒绝!'
            })
            this.getAuditList()
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
