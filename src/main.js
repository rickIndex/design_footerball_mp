import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes/index.js'
import { mountModal } from './utils/modalManager';

mountModal();

createApp(App).use(router).mount('#app')
