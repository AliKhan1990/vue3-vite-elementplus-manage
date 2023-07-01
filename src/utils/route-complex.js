import path from 'path'

/**
 * 返回所有子路由
 */
const getChildrenRoutes = (routes) => {
  const result = []
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

/**
 * 处理脱离层级的路由：某个一级路由为其他子路由，则剔除该一级路由，保留路由层级
 * @param {*} routes router.getRoutes()
 */
export const filterRouters = (routes) => {
  const childrenRoutes = getChildrenRoutes(routes)
  return routes.filter((route) => {
    return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path
    })
  })
}

/**
 * 判断数据是否为空值
 */
function isNull(data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}

/**
 * 该方法的作用：根据 routes 数据，返回对应 menu 规则数组。
 * 方法本质为构建了一个：递归
 * @param {*} routes 需要解析的路由表
 * @param {*} basePath 解析过程中需要处理的基础路径
 * @returns 返回一个数组，该数组会在 SidebarMenu 中被 v-for 循环用于 sidebar-item 的渲染
 */
export function generateMenus(routes, basePath = '') {
  // 最终需要返回的值
  const result = []
  // 遍历路由表
  routes.forEach((item) => {
    // 不存在 children && 不存在 meta 则被认为是 《不需要处理的数据》， 直接 return
    if (isNull(item.meta) && isNull(item.children)) return
    // 存在 children 不存在 meta，则被认为是《父节点》，需要进行解析，所以进入迭代。
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
      return
    }
    // 合并 path 作为跳转路径
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，存在同名父路由（指的是：name 相同的路由对象）的情况，需要单独处理
    // 很多同学比较关注同名父路由，这个其实不需要过于关心的。因为同名的 name 本身就是不符合约定的。
    let route = result.find((item) => item.path === routePath)

    // 查找匹配的 route 对象，如果 route 对象不存在，则表示当前的 route 还没有放入到 result 数组中，所以我们需要构建一个新的 route 对象，并且把它放入到 result 里面
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }

      // icon 与 title 必须全部存在，只有这样，我们才认为它是一个需要在 《menu item》 中展示的数据
      if (route.meta.icon && route.meta.title) {
        // meta 存在生成 route 对象，放入 arr
        result.push(route)
      }
    }

    // 存在 children 进入迭代到children
    if (item.children) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}
