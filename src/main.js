import './assets/css/main.css'
import 'vue-toast-notification/dist/theme-sugar.css'
import './assets/scss/general.scss'
import './assets/scss/font-icons/index.scss'
import router from './router/index.js'
import { createApp } from 'vue'
import App from './App.vue'
import { pinia } from '@/store/index.js'
import { defaultConfig, plugin } from '@formkit/vue'
import '@formkit/themes/genesis'
import ToastPlugin from 'vue-toast-notification'


const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(ToastPlugin)
app.use(plugin, defaultConfig)

app.mount('#app')
