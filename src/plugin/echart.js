/***
 * @Description:
 * @Author: Harry
 * @Date: 2021-11-03 19:30:20
 * @Url: https://u.mr90.top
 * @github: https://github.com/ryanuo
 * @LastEditTime: 2021-11-03 19:30:21
 * @LastEditors: Harry
 */
import * as echarts from 'echarts/core'
import { TooltipComponent, VisualMapComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { Bar3DChart } from 'echarts-gl/charts'
import { Grid3DComponent } from 'echarts-gl/components'

echarts.use([
  TooltipComponent,
  VisualMapComponent,
  Grid3DComponent,
  Bar3DChart,
  CanvasRenderer
])

export default echarts
