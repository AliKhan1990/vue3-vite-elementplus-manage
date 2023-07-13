import SvgIcon from '@/components/SvgIcon/index.vue'
// https://webpack.docschina.org/guides/dependency-management/#requirecontext
// 通过 import.meta.globEager 函数来创建自己的 context
const svgRequire = import.meta.glob('./svg/*.svg', { eager: true })
// const svgRequire = require.context('./svg/', true, /\.svg$/)
// 此时返回一个 require 的函数，可以接受一个 request 的参数，用于 require 的导入。
// 该函数提供了三个属性，可以通过 require.keys() 获取到所有的 svg 图标
// 遍历图标，把图标作为 request 传入到 require 导入函数中，完成本地 svg 图标的导入

const modules = {}

for (const key in svgRequire) {
  modules[key.split('./svg/')[1].split('.svg')[0]] = svgRequire[key].default
}

// Object.keys(modules).forEach(item => {
//   // 为每个模块添加一个前缀名，保证模块命明不冲突
//   modules[item].namespaced = true
// })

// svgRequire.keys().forEach(svgIcon => svgRequire(svgIcon))
// console.log(svgRequire)

export default app => {
  app.component('svg-icon', SvgIcon)
}
