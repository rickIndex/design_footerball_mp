<template>
  <div v-if="visible" class="loading-overlay">
    <div class="spinner"></div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  }
})
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  z-index: 1000;
}

.spinner {
  margin-top: 20px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-top: 5px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  box-shadow: 0 0 15px rgba(52, 152, 219, 0.5);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
