<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal">
      <h3>{{ title }}</h3>
      <div class="buttons">
        <button @click="handleCancel" class="cancel-button">取消</button>
        <button @click="handleConfirm" class="confirm-button">确认</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  visible: Boolean,
  title: String
})

const emit = defineEmits(['confirm', 'cancel'])

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  position: relative;
  top: -5vh;
  font-size: 18px;
  background: rgba(0, 0, 0, 0.5); /* 黑色半透明背景 */
  width: 230px;
  padding: 25px 0;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.3);
  text-align: center;
  color: white;
}

.buttons {
  margin-top: 20px;
}

.buttons button {
  font-size: 14px;
  margin: 0 8px;
  padding: 6px 15px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.confirm-button {
  background-color: #3498db;
}

.confirm-button:hover {
  background-color: #2980b9;
}

.cancel-button {
  background-color: #e74c3c;
}

.cancel-button:hover {
  background-color: #c0392b;
}
</style>
