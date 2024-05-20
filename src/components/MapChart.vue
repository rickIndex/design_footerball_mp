<template>
  <div>
    <div ref="target" class="w-full h-full" :style="{ height: auto }"></div>
    <div v-if="tooltipVisible" :style="tooltipStyle" class="tooltip">
      <p><strong>名称:</strong> {{ tooltipData.name }}</p>
      <p><strong>地址:</strong> {{ tooltipData.address }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import * as echarts from 'echarts'
import mapJson from '@/assets/MapData/shenzhen.json' // 导入深圳地图数据
import api from '@/api/index.js' // 导入获取场馆数据的 API

const target = ref(null) // 地图容器的引用
let mChart = null // ECharts 实例
const mapData = ref(null) // 场馆数据
const processedData = ref([]) // 处理后的场馆数据

// 提示框数据
const tooltipData = reactive({
  name: '',
  address: ''
})

// 提示框可见性
const tooltipVisible = ref(false)
// 提示框样式
const tooltipStyle = reactive({
  position: 'absolute',
  left: '0px',
  top: '0px',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: '#fff',
  padding: '10px',
  borderRadius: '4px',
  pointerEvents: 'none'
})

// 组件挂载后执行初始化操作
onMounted(async () => {
  try {
    mapData.value = await api.getStadiumList()

    processedData.value = mapData.value.map((item) => ({
      name: item.name,
      address: item.address, // 假设API返回的数据包含地址字段
      value: [parseFloat(item.longitude), parseFloat(item.latitude)]
    }))

    if (target.value) {
      mChart = echarts.init(target.value)
      renderChart()
    }
  } catch (error) {
    console.error('Error loading data or initializing chart:', error)
  }
})

// 渲染地图图表
const renderChart = () => {
  // 注册深圳地图
  echarts.registerMap('shenzhen', mapJson)

  let options = {
    title: {
      text: '深圳位置分布图',
      left: 'left',
      textStyle: {
        color: '#ccc',
        fontSize: 30
      }
    },
    geo: {
      show: true,
      label: {
        show: true, // 设置标签显示
        color: '#fff', // 标签文字颜色
        fontSize: 12 // 标签文字大小
      },
      emphasis: {
        // 设置鼠标移入时的高亮样式
        label: {
          color: '#fff', // 鼠标移入时标签文字颜色
          fontSize: 15 // 鼠标移入时标签文字大小
        }
      },
      map: 'shenzhen',
      roam: true,
      itemStyle: {
        normal: {
          borderColor: 'rgba(147, 235, 248, 1)',
          borderWidth: 1,
          areaColor: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(147, 235, 248, 0)'
              },
              {
                offset: 1,
                color: 'rgba(147, 235, 248, .2)'
              }
            ],
            globalCoord: false
          }
        },
        emphasis: {
          areaColor: '#389BB7',
          borderWidth: 0
        }
      }
    },
    series: [
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        data: processedData.value,
        symbolSize: 10,
        label: {
          show: false // 默认不显示标签
        },
        emphasis: {
          label: {
            show: false // 鼠标移入时不显示默认标签
          }
        },
        itemStyle: {
          color: '#b7eb8f', // 散点的颜色
          shadowBlur: 10,
          shadowColor: '#333' // 阴影颜色
        }
      }
    ]
  }

  if (mChart) {
    mChart.setOption(options)
    mChart.on('mouseover', (params) => {
      if (params.componentType === 'series') {
        tooltipData.name = params.data.name
        tooltipData.address = params.data.address
        tooltipStyle.left = params.event.event.clientX + 'px'
        tooltipStyle.top = params.event.event.clientY + 'px'
        tooltipVisible.value = true
      }
    })

    mChart.on('mouseout', () => {
      tooltipVisible.value = false
    })
  }
}
</script>

<style scoped>
.tooltip {
  z-index: 1000;
  max-width: 200px;
  word-wrap: break-word;
}
</style>
