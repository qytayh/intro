import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './css/reset.css'

const app = createApp(App)

app.use(store)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
