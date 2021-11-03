<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-11-03 19:36:24
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-11-03 22:43:48
 * @LastEditors: Harry
-->
<template>
  <div>
    <div class="container-github">
      <div class="github_w" ref="githubRef"></div>
    </div>
  </div>
</template>

<script>
import CONFIG from '@/config/index.js'
const { USERNAME, COLORLIST } = CONFIG
export default {
  name: 'Github',
  data() {
    return {
      ChartsInstance: null,
      days: [
        'Saturday',
        'Friday',
        'Thursday',
        'Wednesday',
        'Tuesday',
        'Monday',
        'Sunday'
      ],
      months: [],
      data: []
    }
  },
  created() {},
  destroyed() {},
  mounted() {
    this.handleMouth()
    this.getData()
    this.initChart()
  },
  methods: {
    // 初始化图表
    initChart() {
      this.ChartsInstance = this.$echarts.init(this.$refs.githubRef)
      const initOption = {
        tooltip: {},
        visualMap: {
          itemWidth: 50, // 图形的宽度，即长条的宽度。
          itemHeight: 200, // 图形的高度，即长条的高度。
          max: 20,
          inRange: {
            color: COLORLIST
          }
        },
        xAxis3D: {
          type: 'category',
          // splitNumber: 6,
          data: this.months,
          boundaryGap: true, // 坐标轴两边是否留白
          // minInterval: 1,
          // scale: true,
          axisLine: {
            show: true,
            interval: 3, // (此处无效？)坐标轴刻度标签的显示间隔，在类目轴中有效。如果设置为 1，表示『隔一个标签显示一个标签』，如果值为 2，表示隔两个标签显示一个标签，以此类推。
            lineStyle: {
              color: 'green'
            }
          },
          axisLabel: {
            show: true,
            margin: 15,
            interval: 3, // 可控制坐标轴刻度标签的显示间隔，在类目轴中有效。
            formatter: '{value}' // 自定义x轴显示数据标签格式
          }
        },
        yAxis3D: {
          type: 'category',
          data: this.days
        },
        zAxis3D: {
          type: 'value'
        },
        splitArea: {
          interval: '2'
        },
        grid3D: {
          boxWidth: 400,
          boxDepth: 80,
          width: 'auto',
          viewControl: {
            // projection: 'orthographic'
            projection: 'perspective', // 先设置为这个perspective
            distance: 300 // 默认缩放比例
          },
          light: {
            main: {
              intensity: 1.2,
              shadow: true
            },
            ambient: {
              intensity: 0.3
            }
          }
        },
        series: [
          {
            type: 'bar3D',
            shading: 'lambert',
            label: {
              fontSize: 16,
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 10,
                color: '#900'
              },
              itemStyle: {
                color: '#900'
              }
            }
          }
        ]
      }
      this.ChartsInstance.setOption(initOption)
    },
    // 获取数据
    handleMouth() {
      const str = [
        'Nov',
        'Dec',
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct'
      ]
      const arr = []
      str.forEach((v) => {
        const a = (v + '-').repeat(4).split('-').slice(0, -1)
        arr.push(a)
      })
      this.months = arr.flat(1)
    },
    // 对数据进行分隔，获取今日的时间
    async getData() {
      const { data: res } = await this.$http.get(USERNAME)
      const data = []
      res.contributions.slice(5).forEach((v, i) => {
        const m = v.map((a, b) => {
          const x = b
          const y = i
          const z = a.count
          // if (v.find((k) => k.date.split('-')[0] === '2021')) {
          //   console.log(i)
          // }
          return [x, y, z]
        })
        data.push(m)
      })
      const p = data.flat(1)
      this.data = p
      console.log(this.data.length)
      this.updataCharts()
    },
    updataCharts() {
      const updateOption = {
        series: [
          {
            data: this.data.map(function (item) {
              return {
                value: [item[1], item[0], item[2]]
              }
            })
          }
        ]
      }
      this.ChartsInstance.setOption(updateOption)
    },
    // 屏幕的适配
    screenAdapter() {}
    // 更新数据{}
  }
}
</script>

<style lang="less" scoped>
.container-github {
  width: 100%;
  height: 100vh;
  .github_w {
    width: 100%;
    height: 100%;
  }
}
</style>
