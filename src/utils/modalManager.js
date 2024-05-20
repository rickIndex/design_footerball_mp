// modalManager.js
import { createApp, h, ref } from 'vue';
import AutoDismissModal from '../components/AutoDismissModal.vue';

const modalVisible = ref(false);
const modalMessage = ref('');
const modalDuration = ref(1);

const showModal = (message, duration = 1) => {
  modalMessage.value = message;
  modalDuration.value = duration;
  modalVisible.value = true;
};

const closeModal = () => {
  modalVisible.value = false;
};

const mountModal = () => {
  const app = createApp({
    render() {
      return h(AutoDismissModal, {
        visible: modalVisible.value,
        message: modalMessage.value,
        duration: modalDuration.value,
        onClose: closeModal
      });
    }
  });

  const div = document.createElement('div');
  document.body.appendChild(div);
  app.mount(div);
};

export { showModal, mountModal };
