<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddBusiness">添加业务</el-button>

    <el-table :data="businessList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="业务名称">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="业务介绍">
        <template slot-scope="scope">
          {{ scope.row.intro }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="前缀标识">
        <template slot-scope="scope">
          {{ scope.row.flag }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="上传提示">
        <template slot-scope="scope">
          {{ scope.row.uploadIntro }}
        </template>
      </el-table-column>
      <!--       <el-table-column align="center" label="业务背景图">
        <template slot-scope="scope">
          <img :src="scope.row.cover" alt="" srcset="">
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

    <el-dialog :visible.sync="dialogVisible" :title="'新增业务'" @close="onClose">
      <el-form :model="addBusiness" label-width="120px" label-position="left">
        <el-form-item label="业务名称">
          <el-input v-model="addBusiness.title" placeholder="业务名称" />
        </el-form-item>
        <el-form-item label="业务介绍">
          <el-input v-model="addBusiness.intro" placeholder="业务介绍" />
        </el-form-item>
        <!-- <el-form-item label="业务icon">
          <el-input v-model="addBusiness.cover" placeholder="业务icon" />
        </el-form-item> -->
        <el-form-item label="业务前缀">
          <el-input v-model="addBusiness.flag" placeholder="业务前缀" />
        </el-form-item>
        <el-form-item label="上传附件提示语">
          <el-input v-model="addBusiness.uploadIntro" placeholder="上传附件提示语" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmBusiness">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { businessCreateApi, businessListApi, businessDeleteApi } from '@/api/order'

export default {
  data() {
    return {
      page: 1,
      pageSize: 10,
      total: 0,
      addBusiness: {},
      routes: [],
      businessList: [],
      dialogVisible: false
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getBusinessList()
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val
      this.getBusinessList()
    },
    onClose() {
      for (const key in this.addBusiness) {
        this.addBusiness[key] = ''
      }
    },
    async getBusinessList() {
      const res = await businessListApi({ page: this.page, pageSize: this.pageSize })
      this.page = res.data.page
      this.total = res.data.count
      this.pageSize = res.data.pageSize
      this.businessList = res.list
    },
    handleAddBusiness() {
      this.dialogVisible = true
    },
    confirmBusiness() {
      businessCreateApi(this.addBusiness).then(res => {
        this.$message.success('添加成功')
        this.dialogVisible = false
        this.getBusinessList()
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('确定删除?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          businessDeleteApi({ id: row.id }).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getBusinessList()
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
