<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from '@/components/Charts/mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    xData: {
      type: Array,
      default: []
    },
    legendData: {
      type: Array,
      default: []
    },
    seriesData: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      
      // {
      //     name: this.legendData[0],
      //     type: 'line',
      //     stack: 'total',
      //     symbolSize: 10,
      //     symbol: 'circle',
      //     itemStyle: {
      //       normal: {
      //         color: 'rgba(252,230,48,1)',
      //         barBorderRadius: 0,
      //         label: {
      //           show: true,
      //           position: 'top',
      //           formatter(p) {
      //             return p.value > 0 ? p.value : ''
      //           }
      //         }
      //       }
      //     },
      //     data: this.seriesData
      //   }

      const _seriesData = this.legendData.map((item, index) => {
        return {
          name: item,
          type: 'line',
          stack: 'total',
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
          data: this.seriesData[index]
        }
      })


      this.chart.setOption({
        backgroundColor: '#344b58',
        title: {
          text: '',
          x: '20',
          top: '20',
          textStyle: {
            color: '#fff',
            fontSize: '22'
          },
          subtextStyle: {
            color: '#90979c',
            fontSize: '16'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          borderWidth: 0,
          top: 150,
          bottom: 95,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          x: '5%',
          top: '10%',
          textStyle: {
            color: '#90979c'
          },
          data: this.legendData
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            interval: 0

          },
          data: this.xData
        }],
        yAxis: [{
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          splitArea: {
            show: false
          }
        }],
        series: this.seriesData
        // series: [{
        //   name: this.legendData[0],
        //   type: 'line',
        //   stack: 'total',
        //   symbolSize: 10,
        //   symbol: 'circle',
        //   itemStyle: {
        //     normal: {
        //       color: 'rgba(252,230,48,1)',
        //       barBorderRadius: 0,
        //       label: {
        //         show: true,
        //         position: 'top',
        //         formatter(p) {
        //           return p.value > 0 ? p.value : ''
        //         }
        //       }
        //     }
        //   },
        //   data: this.seriesData
        // }
        // ]
      })
    }
  }
}
</script>
