<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-11-03 19:36:24
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-11-04 14:15:00
 * @LastEditors: Harry
-->
<template>
  <div class="container-github">
    <div class="github_w" ref="githubRef"></div>
    <right-top></right-top>
    <theme-change @theme="getTheme"></theme-change>
  </div>
</template>

<script>
import CONFIG from '@/config/index.js'
import RightTop from '../github/RightTop.vue'
import ThemeChange from '../github/ThemeChange.vue'
const { COLORLIST, USERNAME } = CONFIG
export default {
  components: { RightTop, ThemeChange },
  name: 'Github',
  data() {
    return {
      ChartsInstance: null,
      days: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      months: [],
      data: [],
      titleFontSize: 0,
      data_list: [],
      theme: 'theme1'
    }
  },
  created() {
    this.$on('theme', this.getTheme)
  },
  destroyed() {
    window.removeEventListener('resize', this.screenAdapter)
  },
  mounted() {
    // const username = window.location.search.split('=')[1]
    // this.username = username
    this.getData()
    this.initChart()
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
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
          max: 20
        },
        xAxis3D: {
          type: 'category',
          // splitNumber: 6,
          name: '', // 坐标轴名称
          boundaryGap: true, // 坐标轴两边是否留白
          // minInterval: 1,
          // scale: true,
          axisLine: {
            show: true,
            interval: 3 // (此处无效？)坐标轴刻度标签的显示间隔，在类目轴中有效。如果设置为 1，表示『隔一个标签显示一个标签』，如果值为 2，表示隔两个标签显示一个标签，以此类推。
          },
          axisLabel: {
            show: true,
            // margin: 20,
            interval: 3, // 可控制坐标轴刻度标签的显示间隔，在类目轴中有效。
            formatter: '{value}' // 自定义x轴显示数据标签格式
          }
        },
        yAxis3D: {
          type: 'category',
          data: this.days,
          name: '',
          axisLabel: {
            show: true,
            margin: 15
          }
        },
        zAxis3D: {
          type: 'value',
          name: ''
        },
        splitArea: {
          interval: '2'
        },
        grid3D: {
          boxWidth: 400,
          boxDepth: 100,
          // show: false, // 是否显示三维迪卡尔坐标
          width: 'auto',
          viewControl: {
            // projection: 'orthographic'
            projection: 'perspective', // 先设置为这个perspective
            distance: 500 // 默认缩放比例
          },
          light: {
            main: {
              intensity: 1.2,
              shadow: true
            },
            ambient: {
              intensity: 0.3
            }
          },
          axisLine: {
            // show: false  // 是否显示坐标线
          },
          axisTick: {
            // show: false // 是否显示出刻度
          },
          splitLine: {
            // 平面上的分隔线。
            show: false // 立体网格线
          },
          axisPointer: {
            // 坐标轴指示线。
            show: false // 鼠标在chart上的显示线
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
                fontSize: 16,
                color: '#900',
                fontWeight: 500
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
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
      const arr = []
      const m = parseInt(this.data_list[0][0].date.split('-')[1])
      const newstr = str.slice(m - 1).concat(str.slice(0, m - 1))
      newstr.forEach((v) => {
        const a = (v + '-').repeat(4).split('-').slice(0, -1)
        arr.push(a)
      })
      this.months = arr.flat(1)
      this.updataCharts()
    },
    // 对数据进行分隔，获取今日的时间
    async getData() {
      const { data: res } = await this.$http.get(USERNAME)
      const data = []
      this.data_list = res.contributions.slice(5)
      this.data_list.forEach((v, i) => {
        const m = v.map((a, b) => {
          const x = i
          const y = b
          const z = a.count
          return {
            value: [x, y, z],
            date: a
          }
        })
        data.push(m)
      })
      const p = data.flat(1)
      this.data = p
      this.handleMouth()
    },
    updataCharts() {
      const updateOption = {
        series: [
          {
            data: this.data.map(function (item) {
              return {
                value: item.value,
                dateList: item.date
              }
            }),
            label: {
              formatter: (arg) => {
                const { date, count } = arg.data.dateList
                return `${date}\n已提交${count}次`
              },
              textStyle: {
                color: 'green'
              }
            }
          }
        ],
        visualMap: {
          inRange: {
            color: COLORLIST[`${this.theme}`]
          }
        },
        xAxis3D: {
          data: this.months,
          axisLine: {
            lineStyle: {
              color: COLORLIST[`${this.theme}`][5]
            }
          }
        },
        yAxis3D: {
          axisLine: {
            lineStyle: {
              color: COLORLIST[`${this.theme}`][5]
            }
          }
        },
        zAxis3D: {
          axisLine: {
            lineStyle: {
              color: COLORLIST[`${this.theme}`][5]
            }
          }
        }
      }
      this.ChartsInstance.setOption(updateOption)
    },
    // 屏幕的适配
    screenAdapter() {
      this.titleFontSize = (this.$refs.githubRef.offsetWidth / 100) * 3.6
      const adapterOption = {}
      this.ChartsInstance.setOption(adapterOption)
      this.ChartsInstance.resize()
    },
    // 主题的切换
    getTheme(e) {
      this.theme = e
      this.updataCharts()
    }
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
