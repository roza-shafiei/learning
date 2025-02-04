import './assets/css/main.css'
import './assets/scss/general.scss'
import router from './router/index.js'
import { createApp } from 'vue'
import App from './App.vue'
import { pinia } from '@/store/index.js'
import { defaultConfig, plugin } from '@formkit/vue'
import '@formkit/themes/genesis'


const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(plugin, defaultConfig)

app.mount('#app')
