import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'
// 导入 svgIcon
import installIcons from '@/icons'
import * as icons from '@element-plus/icons'

import './permission.js'

const app = createApp(App)

installIcons(app)

Object.keys(icons).forEach((key) => {
  app.component(key, icons[key])
})

app.use(store).use(router).use(ElementPlus).mount('#app')
