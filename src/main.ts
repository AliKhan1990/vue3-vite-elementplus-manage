import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import '@/styles/index.css'
// 导入 svgIcon
import installIcons from '@/icons'
import './permission.js'

const app = createApp(App)
installElementPlus(app)
installIcons(app)

app.use(store).use(router).mount('#app')
