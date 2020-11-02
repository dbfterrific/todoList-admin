<template>
  <div class="app-container">
    <el-button type="primary" size="small" @click="handleOrderCall">叫号</el-button> 您当前所在窗口: {{ windowName }}

    <el-table :data="orderList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="订单id">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单编号">
        <template slot-scope="scope">
          {{ scope.row.orderNo }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单类型">
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column prop="nickname" align="header-center" label="用户昵称" />
      <el-table-column align="center" label="预约时间">
        <template slot-scope="scope">
          {{ scope.row.bookingDate }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="预约状态">
        <template slot-scope="scope">
          {{ scope.row.orderStatusName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="业务">
        <template slot-scope="scope">
          {{ scope.row.businessName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="窗口">
        <template slot-scope="scope">
          {{ scope.row.windowName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="开始时间">
        <template slot-scope="scope">
          {{ scope.row.startTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="完成时间">
        <template slot-scope="scope">
          {{ scope.row.finishTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.orderStatus == 1" type="primary" size="small" @click="handleOrderCall(scope)">叫号</el-button>
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
import { queueApi, orderCallApi } from '@/api/order'
import store from '@/store'

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
      orderList: [],
      windowName: '', // 窗口
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
    this.getOrderList()
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val
      this.getOrderList()
    },
    onClose() {
      for (const key in this.addWindow) {
        this.addWindow[key] = ''
      }
    },
    async getOrderList() {
      const res = await queueApi({ page: this.page, pageSize: this.pageSize })
      this.page = res.data.page
      this.total = res.data.count
      this.pageSize = res.data.pageSize
      this.orderList = res.list
      this.windowName = res.data.windowName
    },
    handleOrderCall({ $index, row }) {
      this.$confirm('确定叫号?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          orderCallApi({ windowId: row ? row.windowId : store.getters.windowId, orderId: row && row.id || '' }).then(res => {
            this.$message({
              type: 'success',
              message: '叫号成功!'
            })
            this.getOrderList()
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
