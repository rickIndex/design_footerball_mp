<template>
  <div
    class="bg-[url('assets/imgs/bg.jpg')] bg-cover bg-center h-screen flex text-white p-2 overflow-hidden"
  >
    <div class="out" @click="handleLogout">
      <img src="../assets/imgs/out.png" alt="" />
    </div>
    <ConfirmationModal
      :visible="showConfirmationModal"
      title="确认退出登录"
      @confirm="logout"
      @cancel="cancelLogout"
    />
    <div class="flex-1 mr-2 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
      <!-- 横向柱状图 -->
      <HorizontalBar class="h-1/3 box-border pb-4" :data="regionData" />
      <!-- 雷达图 -->
      <RadarBar class="h-1/3 box-border pb-4" :data="riskData" />
      <!-- 数据传递关系图 -->
      <Relation class="h-1/3" :data="mockData.relationData" />
    </div>
    <div class="w-1/2 mr-2 flex flex-col">
      <!-- 数据展示图 -->
      <TotalData class="bg-opacity-50 bg-slate-800 p-3" :data="orders" />
      <!-- 地图可视化 -->
      <MapChart
        class="bg-opacity-50 bg-slate-800 p-3 mt-2 flex-1"
        :data="mapData"
      />
    </div>
    <div class="flex-1 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
      <!-- 竖向柱状图 -->
      <VerticalBar class="h-1/3 box-border pb-4" :data="mockData.serverData" />
      <!-- 环形资源站比图 -->
      <RadiueBar class="h-1/3 box-border pb-4" :data="mockData.abnormalData" />
      <!-- 文档云图 -->
      <WordCloud class="h-1/3 box-border" :data="mockData.wordCloudData" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HorizontalBar from '../components/HorizontalBar.vue'
import RadarBar from '../components/RadarBar.vue'
import Relation from '../components/Relation.vue'
import TotalData from '../components/TotalData.vue'
import MapChart from '../components/MapChart.vue'
import VerticalBar from '../components/VerticalBar.vue'
import RadiueBar from '../components/RadiueBar.vue'
import WordCloud from '../components/WordCloud.vue'
import ConfirmationModal from '../components/ConfirmationModal.vue'
import api from '../api/index.js'
import getRandomNumber from '../utils/random.js'

const showConfirmationModal = ref(false)
const router = useRouter()
const handleLogout = () => {
  showConfirmationModal.value = true
}

//订单数据
const orders = reactive({
  day: 0,
  week: 0,
  month: 0,
  year: 0,
  total: 0,
  stadium: 0,
  users: 0
})

//文件总数
const fileCount = ref(0)

//雷达图数据
const riskData = reactive({
  risks: [
    {
      id: 1,
      name: '订单数',
      value: 0
    },
    {
      id: 2,
      name: '用户数',
      value: 0
    },
    {
      id: 3,
      name: '场地数',
      value: 0
    },
    {
      id: 4,
      name: '文件数',
      value: 0
    }
  ]
})

//横向柱形图数据
const regionData = reactive([
  {
    id: 1,
    name: '订单量',
    value: 0
  },
  {
    id: 2,
    name: '文件量',
    value: 0
  },
  {
    id: 3,
    name: '用户量',
    value: 0
  },
  {
    id: 4,
    name: '场地量',
    value: 0
  }
])

//模拟数据
const mockData = reactive({
  serverData: {
    servers: []
  },
  abnormalData: {
    abnormals: []
  },
  relationData: {
    relations: []
  },
  wordCloudData: {
    datas: []
  }
})
onMounted(() => {
  getDayOrderList()
  getWeekOrderList()
  getMonthOrderList()
  getYearOrderList()
  getAllOrderList()
  getStadiumList()
  getUserCount()
  getFileCount()
  updateMockData()
})

setInterval(() => {
  getDayOrderList()
  getWeekOrderList()
  getMonthOrderList()
  getYearOrderList()
  getAllOrderList()
  getStadiumList()
  getUserCount()
  getFileCount()
  updateMockData()
}, 30000)

//当日订单数
const getDayOrderList = async () => {
  const result = await api.getDayList()
  orders.day = result.length
}

//本周订单数
const getWeekOrderList = async () => {
  const result = await api.getWeekList()
  orders.week = result.length
}

//本月订单数
const getMonthOrderList = async () => {
  const result = await api.getMonthList()
  orders.month = result.length
}

//本年订单数
const getYearOrderList = async () => {
  const result = await api.getYearList()
  orders.year = result.length
}
//总订单数
const getAllOrderList = async () => {
  const result = await api.getAllList()
  orders.total = result.length
  riskData.risks[0].value = result.length
  regionData[0].value = result.length
}

//场地数
const getStadiumList = async () => {
  const result = await api.getStadiumList()
  orders.stadium = result.length
  riskData.risks[2].value = result.length
  regionData[3].value = result.length
}

//用户数
const getUserCount = async () => {
  const result = await api.getUserCount()
  orders.users = result[0].user_count
  riskData.risks[1].value = result[0].user_count
  regionData[2].value = result[0].user_count
}

//文件数
const getFileCount = async () => {
  const result = await api.getFileCount()
  fileCount.value = result[0].file_count
  riskData.risks[3].value = result[0].file_count
  regionData[1].value = result[0].file_count
}

const logout = () => {
  // 执行退出登录逻辑
  localStorage.removeItem('user-token')
  router.push({ name: 'Login' })
  // 关闭模态框
  showConfirmationModal.value = false
}

const cancelLogout = () => {
  // 关闭模态框
  showConfirmationModal.value = false
}

const updateMockData = () => {
  mockData.serverData.servers = generateServerData()
  mockData.abnormalData.abnormals = generateAbnormalData()
  mockData.relationData.relations = generateRelationData()
  mockData.wordCloudData.datas = generateWordCloudData()
}
// 生成模拟服务器数据
const generateServerData = () => {
  const servers = []
  for (let i = 1; i <= 6; i++) {
    servers.push({
      id: i,
      name: `服务${i}`,
      value: getRandomNumber(0, 100)
    })
  }
  return servers
}
// 生成模拟异常数据
const generateAbnormalData = () => {
  const abnormals = []
  const regions = ['北部', '南部', '西部', '东部', '中部']
  for (let i = 1; i <= 5; i++) {
    abnormals.push({
      id: i,
      name: regions[i - 1],
      value: getRandomNumber(300, 700)
    })
  }
  return abnormals
}
// 生成模拟数据传递关系
const generateRelationData = () => {
  return [
    {
      id: 1,
      name: '上级平台1',
      source: '上级平台1',
      target: '数据中心',
      speed: getRandomNumber(200, 500),
      value: [0, 300]
    },
    {
      id: 2,
      name: '上级平台2',
      source: '上级平台2',
      target: '数据中心',
      speed: getRandomNumber(200, 500),
      value: [0, 100]
    },
    {
      id: 3,
      name: '子级平台1',
      source: '数据中心',
      target: '子级平台1',
      speed: getRandomNumber(200, 500),
      value: [100, 100]
    },
    {
      id: 4,
      name: '子级平台2',
      source: '数据中心',
      target: '子级平台2',
      speed: getRandomNumber(200, 500),
      value: [100, 300]
    },
    {
      id: 0,
      name: '数据中心',
      speed: getRandomNumber(200, 500),
      value: [50, 200]
    }
  ]
}
// 生成模拟词云数据
const generateWordCloudData = () => {
  const words = [
    'network',
    'software',
    '软件设计师',
    'Node.js',
    'php',
    'python',
    'koa',
    'uniapp',
    'javascript',
    'HTML',
    'JAVA',
    'Goland',
    'typescript',
    '数据可视化',
    'Vue',
    'React',
    'echarts',
    'Antd',
    'Element-Plus',
    'DataV'
  ]
  const datas = []
  for (const word of words) {
    datas.push({ value: getRandomNumber(10, 60), name: word })
  }
  return datas
}

//模拟数据
</script>


<style scoped>
.out,
.out.img {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 10px;
  right: 20px;
}
</style>

