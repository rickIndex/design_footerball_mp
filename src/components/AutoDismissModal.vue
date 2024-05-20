<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal">
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  visible: Boolean,
  message: String,
  duration: {
    type: Number,
    default: 2
  }
})
const emit = defineEmits(['close'])
const countdown = ref(props.duration)
const startCountdown = () => {
  countdown.value = props.duration
  const interval = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(interval)
      close()
    }
  }, 1000)
}

const close = () => {
  emit('close')
}

watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      startCountdown()
    }
  }
)
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.modal {
  background: rgba(0, 0, 0, 0.5); /* 黑色半透明背景 */
  margin: 3vh auto 0 auto;
  width: 200px;
  padding: 10px 0;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.3);
  text-align: center;
  color: white; /* 白色文字 */
}
</style>
