import './assets/css/main.css'
import './assets/scss/general.scss'
import router from './router/index.js'
import { createApp } from 'vue'
import App from './App.vue'
import { pinia } from '@/store/index.js'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
