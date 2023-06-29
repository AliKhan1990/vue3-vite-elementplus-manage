/**
 *根据routes数据返回对应的menu规则数据
 */
export const generateMenus = (routes) => {
  const menu = []
  routes.forEach((route) => {
    generateMenue(route, menu)
  })
  return menu
}

/**
 * 递归遍历路由表
 * @param {*} route 当前节点
 * @param {*} parent 父级节点
 */
const generateMenue = (route, parent) => {
  // 递归终止条件, 该路由是最后一级，即没有children
  if (!route.children) {
    // 如果存在meta，也就是符合成为menu的规则，直接挂载给上一级
    if (route.meta && route.meta.title && route.meta.icon) {
      // 首先判断上一级是Array(顶层)还是route，Array代表是顶层数组直接push，否则加入到parent子节点
      // 为了符合视频的写法，此处给route加上一个空childen(也可以不加，后续渲染时判断route没有这个属性即为最后一级)
      route.children = []
      parent instanceof Array ? parent.push(route) : parent.children.push(route)
    }
  } else {
    // 来到这里证明该路由还有children，我们需要去过滤children（过滤掉meta不符合要求的children）
    // 首先判断当前节点是否符合 route.meta && route.meta.title && route.meta.icon 的要求
    const isMenu = route.meta && route.meta.title && route.meta.icon
    if (isMenu) {
      // 如果符合要求需要将当前节点加入到父节点
      parent instanceof Array ? parent.push(route) : parent.children.push(route)
      // 拷贝当前点的children用于遍历(为何要拷贝？因为在下一层会push过滤后的children进去)
      const tmpChildren = [...route.children]
      // 然后清空当前节点的children（为何要清空？上面已经解释了）
      route.children = []
      // 接着遍历子节点
      tmpChildren.forEach((child) => {
        generateMenue(child, route)
      })
    } else {
      // 来到这儿表示当前节点不属于menu，那么就遍历当前节点的子节点，并传入当前节点的父节点
      route.children.forEach((child) => {
        generateMenue(child, parent)
      })
    }
  }
}
