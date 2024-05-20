<template>
  <div class="p-6">
    <div class="text-slate-300 text-center">
      总订单量：
      <span
        ref="totalCountTarget"
        class="text-7xl ml-2 mr-2 font-bold font-[Electronic] text-gradient"
      >
      </span>
      条记录
    </div>
    <div class="mt-3 flex flex-wrap">
      <div class="w-1/3 text-center text-slate-400 text-sm">
        本日订单：
        <span ref="dayList" class="text-[#5DC5EF] text-3xl font-[Electronic]">
        </span>
      </div>
      <div class="w-1/3 text-center text-slate-400 text-sm">
        本周订单：<span
          ref="weekList"
          class="text-[#5DC5EF] text-3xl font-[Electronic]"
        ></span>
      </div>
      <div class="w-1/3 text-center text-slate-400 text-sm">
        本月订单：<span
          ref="monthList"
          class="text-[#5DC5EF] text-3xl font-[Electronic]"
        ></span>
      </div>
      <div class="w-1/3 text-center text-slate-400 text-sm">
        本年订单：<span
          ref="yearList"
          class="text-[#5DC5EF] text-3xl font-[Electronic]"
        ></span>
      </div>
      <div class="w-1/3 text-center text-slate-400 text-sm">
        用户数：<span
          ref="users"
          class="text-[#5DC5EF] text-3xl font-[Electronic]"
        ></span>
      </div>
      <div class="w-1/3 text-center text-slate-400 text-sm">
        场地数：<span
          ref="stadium"
          class="text-[#5DC5EF] text-3xl font-[Electronic]"
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { CountUp } from 'countup.js'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const totalCountTarget = ref(null)
const dayList = ref(null)
const weekList = ref(null)
const monthList = ref(null)
const yearList = ref(null)
const users = ref(null)
const stadium = ref(null)

onMounted(() => {
  new CountUp(totalCountTarget.value, props.data.total).start()
  new CountUp(dayList.value, props.data.day).start()
  new CountUp(weekList.value, props.data.week).start()
  new CountUp(monthList.value, props.data.month).start()
  new CountUp(yearList.value, props.data.year).start()
  new CountUp(users.value, props.data.users).start()
  new CountUp(stadium.value, props.data.stadium).start()
})

watch(
  () => props.data,
  (newData, oldData) => {
    if (newData) {
      new CountUp(totalCountTarget.value, newData.total).start()
      new CountUp(dayList.value, newData.day).start()
      new CountUp(weekList.value, newData.week).start()
      new CountUp(monthList.value, newData.month).start()
      new CountUp(yearList.value, newData.year).start()
      new CountUp(users.value, newData.users).start()
      new CountUp(stadium.value, newData.stadium).start()
    }
  },
  { immediate: true, deep: true }
)
</script>

<style lang="scss" scoped></style>
