<template>
  <div class="app-container">
    <div class="chart-container">
      <chart
        v-if="canShow"
        height="100%"
        :xData="xData"
        :legendData="legendData"
        :seriesData="seriesData"
        width="100%" />
    </div>
    <!-- <el-table :data="eventDataList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="业务员">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="日期">
        <template slot-scope="scope">
          {{ scope.row.day }}
        </template>
      </el-table-column>
      <el-table-column prop="finish" align="header-center" label="完成量" />
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
    </div> -->
  </div>
</template>

<script>
import { userDataApi } from '@/api/order'
import chart from './line'

export default {
   components: { chart },
  data() {
    return {
      canShow: false,
      page: 1,
      pageSize: 10,
      total: 0,
      addRole: {},
      routes: [],
      eventDataList: [],
      dialogVisible: false,
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      xData: [],
      legendData: ['每日完成量'],
      seriesData: []
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getUserDataList()
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val
      this.getUserDataList()
    },
    onClose() {
      for (const key in this.addRole) {
        this.addRole[key] = ''
      }
    },
    steamroller4(arr){
      while(arr.some(item=> Array.isArray(item))){
        // arr=[].concat.apply([],arr)
        arr=[].concat(...arr)
      }
      return arr
    },
    async getUserDataList() {
      const res = await userDataApi({ page: this.page, pageSize: this.pageSize })
      this.page = res.data.page
      this.total = res.data.count
      this.pageSize = res.data.pageSize
      this.eventDataList = res.list
      this.xData = this.eventDataList.map(item => {
        return item.day
      })
      this.legendData = this.eventDataList[0].data.map(item => {
        return item.name
      })
      let _data = []
      let _subData = []
      let _filterEventList = []
      _filterEventList = this.eventDataList.map(item => {
        return item.data
      })
      const flatternList = this.steamroller4(_filterEventList)
      this.legendData.forEach((item, index) => {
        _subData = flatternList.map((subItem, subIndex) => {
          if (item === subItem.name) {
            return subItem.finish
          }
        })
        _subData = _subData.filter(item => {
          return item && item
        })
        _data.push(_subData)
      })
      const _seriesData = this.legendData.map((item, index) => {
        return {
          name: item,
          type: 'line',
          // stack: 'total',
          symbolSize: 10,
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: '#' + Math.floor(Math.random()*16777215).toString(16),
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: _data[index]
        }
      })

      this.seriesData = [..._seriesData]

      this.canShow = true
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
  .chart-container {
    position: relative;
    width: 100%;
    height: 80vh;
  }
}
</style>
