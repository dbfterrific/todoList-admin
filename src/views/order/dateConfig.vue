<template>
  <div class="app-container">
    <el-row>
      <el-col :span="8" v-for="(item, index) in dateList" :key="index">
        <span class="tag-wrapper">
          <el-tag>{{ `${item.start} ~ ${item.end}` }}</el-tag>
        </span>
        <el-input-number v-model="item.num" size="small"></el-input-number>
      </el-col>
    </el-row>
    <div class="button-wrapper">
      <el-button type="primary" size="small" @click="handleConfirm">提交</el-button>
    </div>
  </div>
</template>

<script>
import { getDateApi, setDataApi } from '@/api/order'
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
      dateList: [],
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
    this.getDateConfigList()
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val
      this.getDateConfigList()
    },
    onClose() {
      for (const key in this.addWindow) {
        this.addWindow[key] = ''
      }
    },
    async getDateConfigList() {
      const res = await getDateApi({ page: this.page, pageSize: this.pageSize })
      this.page = res.data.page
      this.total = res.data.count
      this.pageSize = res.data.pageSize
      this.dateList = res.list
    },
    handleConfirm({ $index, row }) {
      setDataApi({data: this.dateList}).then(res => {
        this.$message({
          type: 'success',
          message: '设置成功!'
        })
      })
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
  .tag-wrapper {
    margin-right: 10px;
  }
  .button-wrapper {
    padding: 10px 0;
  }
}
</style>
