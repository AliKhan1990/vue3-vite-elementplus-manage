import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'
import 'virtual:svg-icons-register'
// 导入 svgIcon
import installIcons from '@/icons'
import * as icons from '@element-plus/icons'
// filter
import installFilter from '@/filters/index.js'
import installDirective from '@/directives'

// 导入i18n实例
import i18n from '@/i18n'

import './permission.js'

const app = createApp(App)

installDirective(app)
installIcons(app)
installFilter(app)

Object.keys(icons).forEach((key) => {
  app.component(key, icons[key])
})

app.use(store).use(router).use(i18n).use(ElementPlus).mount('#app')
