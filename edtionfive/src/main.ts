import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router/router'
import 'amfe-flexible'

createApp(App).use(router).mount('#app')

